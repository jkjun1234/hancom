const fs = require('fs');

const inputPath = process.argv[2];
const outputPath = process.argv[3];

if (!inputPath || !outputPath) {
  console.error('Usage: node ua-arch-analyze.js <input.json> <output.json>');
  process.exit(1);
}

let data;
try {
  data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
} catch (e) {
  console.error('Failed to read/parse input:', e.message);
  process.exit(1);
}

const { fileNodes, importEdges, allEdges } = data;

// ---- A. Directory Grouping ----
// Compute all file paths
const filePaths = fileNodes.map(n => n.filePath);

// Find common prefix
function commonPrefix(paths) {
  if (!paths.length) return '';
  const parts = paths.map(p => p.replace(/\\/g, '/').split('/'));
  const minLen = Math.min(...parts.map(p => p.length));
  const common = [];
  for (let i = 0; i < minLen - 1; i++) {
    const seg = parts[0][i];
    if (parts.every(p => p[i] === seg)) common.push(seg);
    else break;
  }
  return common.length ? common.join('/') + '/' : '';
}

const prefix = commonPrefix(filePaths);

function getGroupKey(filePath) {
  const normalized = filePath.replace(/\\/g, '/');
  const stripped = normalized.startsWith(prefix) ? normalized.slice(prefix.length) : normalized;
  const segments = stripped.split('/');
  if (segments.length <= 1) return 'root';
  // Use first directory segment after prefix
  return segments[0];
}

const directoryGroups = {};
for (const node of fileNodes) {
  const group = getGroupKey(node.filePath);
  if (!directoryGroups[group]) directoryGroups[group] = [];
  directoryGroups[group].push(node.id);
}

// ---- B. Node Type Grouping ----
const nodeTypeGroups = {};
for (const node of fileNodes) {
  const t = node.type || 'file';
  if (!nodeTypeGroups[t]) nodeTypeGroups[t] = [];
  nodeTypeGroups[t].push(node.id);
}

// ---- C. Import Adjacency ----
// Only file-level import edges
const importOnly = (importEdges || []).filter(e => e.type === 'imports');
const fanOut = {};
const fanIn = {};
for (const node of fileNodes) {
  fanOut[node.id] = 0;
  fanIn[node.id] = 0;
}
for (const edge of importOnly) {
  if (fanOut[edge.source] !== undefined) fanOut[edge.source]++;
  if (fanIn[edge.target] !== undefined) fanIn[edge.target]++;
}

// ---- D. Cross-Category Dependency Analysis ----
const idToType = {};
for (const node of fileNodes) idToType[node.id] = node.type || 'file';

const crossCategoryMap = {};
for (const edge of (allEdges || [])) {
  const srcType = idToType[edge.source] || 'unknown';
  const tgtType = idToType[edge.target] || 'unknown';
  if (srcType === tgtType && srcType === 'file') continue; // skip file-file in this section
  const key = `${srcType}->${tgtType}:${edge.type}`;
  if (!crossCategoryMap[key]) crossCategoryMap[key] = { fromType: srcType, toType: tgtType, edgeType: edge.type, count: 0 };
  crossCategoryMap[key].count++;
}
const crossCategoryEdges = Object.values(crossCategoryMap);

// ---- E. Inter-Group Import Frequency ----
const idToGroup = {};
for (const node of fileNodes) idToGroup[node.id] = getGroupKey(node.filePath);

const interGroupMap = {};
for (const edge of importOnly) {
  const fromGroup = idToGroup[edge.source];
  const toGroup = idToGroup[edge.target];
  if (!fromGroup || !toGroup || fromGroup === toGroup) continue;
  const key = `${fromGroup}->${toGroup}`;
  if (!interGroupMap[key]) interGroupMap[key] = { from: fromGroup, to: toGroup, count: 0 };
  interGroupMap[key].count++;
}
const interGroupImports = Object.values(interGroupMap);

// ---- F. Intra-Group Import Density ----
const intraGroupDensity = {};
for (const group of Object.keys(directoryGroups)) {
  const members = new Set(directoryGroups[group]);
  let internalEdges = 0;
  let totalEdges = 0;
  for (const edge of importOnly) {
    const srcInGroup = members.has(edge.source);
    const tgtInGroup = members.has(edge.target);
    if (srcInGroup || tgtInGroup) totalEdges++;
    if (srcInGroup && tgtInGroup) internalEdges++;
  }
  intraGroupDensity[group] = {
    internalEdges,
    totalEdges,
    density: totalEdges > 0 ? internalEdges / totalEdges : 0
  };
}

// ---- G. Directory Pattern Matching ----
const dirPatterns = {
  routes: 'api', api: 'api', controllers: 'api', endpoints: 'api', handlers: 'api',
  services: 'service', core: 'service', lib: 'service', domain: 'service', logic: 'service',
  models: 'data', db: 'data', data: 'data', persistence: 'data', repository: 'data',
  entities: 'data', entity: 'data', migrations: 'data', sql: 'data', database: 'data', schema: 'data',
  components: 'ui', views: 'ui', pages: 'ui', ui: 'ui', layouts: 'ui', screens: 'ui',
  middleware: 'middleware', plugins: 'middleware', interceptors: 'middleware', guards: 'middleware',
  utils: 'utility', helpers: 'utility', common: 'utility', shared: 'utility', tools: 'utility',
  pkg: 'utility', templatetags: 'utility',
  config: 'config', constants: 'config', env: 'config', settings: 'config',
  management: 'config', commands: 'config',
  __tests__: 'test', test: 'test', tests: 'test', spec: 'test', specs: 'test',
  types: 'types', interfaces: 'types', schemas: 'types', contracts: 'types', dtos: 'types',
  dto: 'types', request: 'types', response: 'types',
  hooks: 'hooks',
  store: 'state', state: 'state', reducers: 'state', actions: 'state', slices: 'state',
  assets: 'assets', static: 'assets', public: 'assets',
  signals: 'service', serializers: 'api', composables: 'service', blueprints: 'api',
  mailers: 'service', jobs: 'service', channels: 'service',
  cmd: 'entry', bin: 'entry', internal: 'service',
  docs: 'documentation', documentation: 'documentation', wiki: 'documentation',
  deploy: 'infrastructure', deployment: 'infrastructure', infra: 'infrastructure',
  infrastructure: 'infrastructure', k8s: 'infrastructure', kubernetes: 'infrastructure',
  helm: 'infrastructure', charts: 'infrastructure', terraform: 'infrastructure', tf: 'infrastructure',
  docker: 'infrastructure',
  '.github': 'ci-cd', '.gitlab': 'ci-cd', '.circleci': 'ci-cd',
  src: 'service', // fallback for src group
  root: 'entry'
};

// File-level pattern matching
function getFilePattern(node) {
  const fp = node.filePath.replace(/\\/g, '/');
  const name = node.name;
  if (/\.(test|spec)\.[^.]+$/.test(name) || /^test_/.test(name) || /_test\.[^.]+$/.test(name) || /Test\.[^.]+$/.test(name) || /_spec\.[^.]+$/.test(name)) return 'test';
  if (/\.d\.ts$/.test(name)) return 'types';
  if (name === 'Dockerfile' || /^docker-compose/.test(name)) return 'infrastructure';
  if (/\.(tf|tfvars)$/.test(name)) return 'infrastructure';
  if (/\.(yml|yaml)$/.test(name) && (fp.includes('.github/workflows') || fp.includes('.gitlab-ci') || name === 'Jenkinsfile')) return 'ci-cd';
  if (/\.(sql)$/.test(name)) return 'data';
  if (/\.(graphql|gql|proto)$/.test(name)) return 'types';
  if (/\.(md|rst)$/.test(name)) return 'documentation';
  if (name === 'Makefile') return 'infrastructure';
  if (['Cargo.toml','go.mod','Gemfile','pom.xml','build.gradle','composer.json'].includes(name)) return 'config';
  if (name === 'package.json' || name === 'tsconfig.json' || name === 'vite.config.js' || name === 'eslint.config.js') return 'config';
  if (name === 'index.html') return 'entry';
  if (name === 'main.jsx' || name === 'main.js' || name === 'main.ts' || name === 'main.tsx') return 'entry';
  if (name === 'App.jsx' || name === 'App.tsx') return 'ui';
  if (/\.(css|scss|sass|less)$/.test(name)) return 'ui';
  return null;
}

const patternMatches = {};
for (const group of Object.keys(directoryGroups)) {
  patternMatches[group] = dirPatterns[group.toLowerCase()] || 'unknown';
}

// ---- H. Deployment Topology Detection ----
const infraFiles = fileNodes
  .filter(n => ['service','resource','pipeline'].includes(n.type) ||
    /Dockerfile/.test(n.name) || /docker-compose/.test(n.name) ||
    /\.(tf|tfvars)$/.test(n.name) || n.filePath.includes('.github/workflows') ||
    n.filePath.includes('.gitlab-ci') || n.name === 'Makefile')
  .map(n => n.filePath);

const deploymentTopology = {
  hasDockerfile: fileNodes.some(n => n.name === 'Dockerfile'),
  hasCompose: fileNodes.some(n => /docker-compose/.test(n.name)),
  hasK8s: fileNodes.some(n => /k8s|kubernetes|\.ya?ml$/.test(n.filePath) && n.type === 'service'),
  hasTerraform: fileNodes.some(n => /\.(tf|tfvars)$/.test(n.name)),
  hasCI: fileNodes.some(n => n.type === 'pipeline' || n.filePath.includes('.github/workflows')),
  infraFiles
};

// ---- I. Data Pipeline Detection ----
const dataPipeline = {
  schemaFiles: fileNodes.filter(n => /\.(graphql|gql|proto|prisma)$/.test(n.name) || n.type === 'schema').map(n => n.filePath),
  migrationFiles: fileNodes.filter(n => n.filePath.includes('migration') || /\.sql$/.test(n.name)).map(n => n.filePath),
  dataModelFiles: fileNodes.filter(n => n.filePath.includes('model') || n.filePath.includes('entity')).map(n => n.filePath),
  apiHandlerFiles: fileNodes.filter(n => n.filePath.includes('route') || n.filePath.includes('controller') || n.filePath.includes('handler')).map(n => n.filePath)
};

// ---- J. Documentation Coverage ----
const allGroups = Object.keys(directoryGroups);
const groupsWithDocs = allGroups.filter(g => {
  const members = directoryGroups[g];
  return members.some(id => {
    const node = fileNodes.find(n => n.id === id);
    return node && (node.type === 'document' || /\.(md|rst)$/.test(node.name));
  });
});
const docCoverage = {
  groupsWithDocs: groupsWithDocs.length,
  totalGroups: allGroups.length,
  coverageRatio: allGroups.length > 0 ? groupsWithDocs.length / allGroups.length : 0,
  undocumentedGroups: allGroups.filter(g => !groupsWithDocs.includes(g))
};

// ---- K. Dependency Direction ----
const dependencyDirection = interGroupImports.map(({ from, to, count }) => ({
  dependent: from,
  dependsOn: to
}));

// ---- Stats ----
const filesPerGroup = {};
for (const [group, ids] of Object.entries(directoryGroups)) filesPerGroup[group] = ids.length;
const nodeTypeCounts = {};
for (const [type, ids] of Object.entries(nodeTypeGroups)) nodeTypeCounts[type] = ids.length;

const result = {
  scriptCompleted: true,
  directoryGroups,
  nodeTypeGroups,
  crossCategoryEdges,
  interGroupImports,
  intraGroupDensity,
  patternMatches,
  deploymentTopology,
  dataPipeline,
  docCoverage,
  dependencyDirection,
  fileStats: {
    totalFileNodes: fileNodes.length,
    filesPerGroup,
    nodeTypeCounts
  },
  fileFanIn: fanIn,
  fileFanOut: fanOut
};

try {
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');
  console.log('Analysis complete. Output written to', outputPath);
  process.exit(0);
} catch (e) {
  console.error('Failed to write output:', e.message);
  process.exit(1);
}
