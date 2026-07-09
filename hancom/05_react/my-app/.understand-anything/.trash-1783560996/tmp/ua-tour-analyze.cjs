const fs = require('fs');

const inputPath = process.argv[2];
const outputPath = process.argv[3];

if (!inputPath || !outputPath) {
  console.error('Usage: node ua-tour-analyze.js <input.json> <output.json>');
  process.exit(1);
}

let data;
try {
  data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
} catch (e) {
  console.error('Failed to read input:', e.message);
  process.exit(1);
}

const { nodes, edges, layers } = data;

// Build lookup maps
const nodeMap = {};
for (const n of nodes) {
  nodeMap[n.id] = n;
}

// A. Fan-In: count edges pointing TO each node
const fanIn = {};
const fanOut = {};
for (const n of nodes) {
  fanIn[n.id] = 0;
  fanOut[n.id] = 0;
}
for (const e of edges) {
  if (fanIn[e.target] !== undefined) fanIn[e.target]++;
  if (fanOut[e.source] !== undefined) fanOut[e.source]++;
}

const fanInRanking = Object.entries(fanIn)
  .map(([id, count]) => ({ id, fanIn: count, name: nodeMap[id]?.name || id }))
  .sort((a, b) => b.fanIn - a.fanIn)
  .slice(0, 20);

const fanOutRanking = Object.entries(fanOut)
  .map(([id, count]) => ({ id, fanOut: count, name: nodeMap[id]?.name || id }))
  .sort((a, b) => b.fanOut - a.fanOut)
  .slice(0, 20);

// C. Entry Point Candidates
const codeEntryNames = [
  'index.ts','index.js','main.ts','main.js','app.ts','app.js',
  'server.ts','server.js','mod.rs','main.go','main.py','main.rs',
  'manage.py','app.py','wsgi.py','asgi.py','run.py','__main__.py',
  'Application.java','Main.java','Program.cs','config.ru','index.php',
  'App.swift','Application.kt','main.cpp','main.c',
  // JSX variants
  'main.jsx','index.jsx','app.jsx','App.jsx'
];

const totalNodes = nodes.length;
const fanOutValues = Object.values(fanOut).sort((a, b) => a - b);
const fanInValues = Object.values(fanIn).sort((a, b) => a - b);
const top10FanOutThreshold = fanOutValues[Math.floor(totalNodes * 0.9)] || 0;
const bottom25FanInThreshold = fanInValues[Math.floor(totalNodes * 0.25)] || 0;

const entryScores = [];

for (const n of nodes) {
  let score = 0;

  if (n.type === 'document') {
    if (n.name === 'README.md' && (!n.filePath || !n.filePath.includes('/'))) {
      score += 5;
    } else if (n.name.endsWith('.md') && (!n.filePath || !n.filePath.includes('/'))) {
      score += 2;
    }
  } else {
    // Code files
    const baseName = n.name;
    if (codeEntryNames.includes(baseName)) score += 3;

    // Depth check: root or one level deep
    const parts = (n.filePath || '').split('/').filter(Boolean);
    if (parts.length <= 2) score += 1;

    // High fan-out
    if ((fanOut[n.id] || 0) >= top10FanOutThreshold && top10FanOutThreshold > 0) score += 1;

    // Low fan-in
    if ((fanIn[n.id] || 0) <= bottom25FanInThreshold) score += 1;
  }

  if (score > 0) {
    entryScores.push({ id: n.id, score, name: n.name, type: n.type, summary: n.summary || '' });
  }
}

entryScores.sort((a, b) => b.score - a.score);
const entryPointCandidates = entryScores.slice(0, 5);

// D. BFS from top CODE entry point
const codeEntry = entryPointCandidates.find(e => e.type !== 'document');
const bfsStart = codeEntry ? codeEntry.id : null;

const bfsResult = {
  startNode: bfsStart,
  order: [],
  depthMap: {},
  byDepth: {}
};

if (bfsStart) {
  // Build adjacency: imports and calls edges
  const adj = {};
  for (const n of nodes) adj[n.id] = [];
  for (const e of edges) {
    if ((e.type === 'imports' || e.type === 'calls') && adj[e.source]) {
      adj[e.source].push(e.target);
    }
  }

  const visited = new Set();
  const queue = [{ id: bfsStart, depth: 0 }];
  visited.add(bfsStart);

  while (queue.length > 0) {
    const { id, depth } = queue.shift();
    bfsResult.order.push(id);
    bfsResult.depthMap[id] = depth;
    if (!bfsResult.byDepth[depth]) bfsResult.byDepth[depth] = [];
    bfsResult.byDepth[depth].push(id);

    for (const neighbor of (adj[id] || [])) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push({ id: neighbor, depth: depth + 1 });
      }
    }
  }
}

// E. Non-Code File Inventory
const nonCodeFiles = {
  documentation: [],
  infrastructure: [],
  data: [],
  config: []
};

const infraTypes = new Set(['service', 'pipeline', 'resource']);
const dataTypes = new Set(['table', 'schema', 'endpoint']);

for (const n of nodes) {
  const entry = { id: n.id, name: n.name, type: n.type, summary: n.summary || '' };
  if (n.type === 'document') {
    nonCodeFiles.documentation.push(entry);
  } else if (infraTypes.has(n.type)) {
    nonCodeFiles.infrastructure.push(entry);
  } else if (dataTypes.has(n.type)) {
    nonCodeFiles.data.push(entry);
  } else if (n.type === 'config') {
    nonCodeFiles.config.push(entry);
  }
}

// F. Tightly Coupled Clusters
const edgeSet = new Set();
const biDir = [];
for (const e of edges) {
  edgeSet.add(`${e.source}|||${e.target}`);
}
for (const e of edges) {
  if (edgeSet.has(`${e.target}|||${e.source}`)) {
    const pair = [e.source, e.target].sort();
    const key = pair.join('|||');
    if (!biDir.find(b => b.key === key)) {
      biDir.push({ key, nodes: pair });
    }
  }
}

// Expand clusters
const clusters = biDir.map(b => {
  const clusterNodes = new Set(b.nodes);
  for (const n of nodes) {
    if (clusterNodes.has(n.id)) continue;
    let connections = 0;
    for (const e of edges) {
      if ((e.source === n.id && clusterNodes.has(e.target)) ||
          (e.target === n.id && clusterNodes.has(e.source))) {
        connections++;
      }
    }
    if (connections >= 2) clusterNodes.add(n.id);
  }
  // Count edges within cluster
  let edgeCount = 0;
  const cArr = Array.from(clusterNodes);
  for (const e of edges) {
    if (clusterNodes.has(e.source) && clusterNodes.has(e.target)) edgeCount++;
  }
  return { nodes: cArr, edgeCount };
});

clusters.sort((a, b) => b.edgeCount - a.edgeCount);
const topClusters = clusters.slice(0, 10);

// G. Layer List
const layerList = {
  count: layers.length,
  list: layers.map(l => ({ id: l.id, name: l.name, description: l.description }))
};

// H. Node Summary Index
const nodeSummaryIndex = {};
for (const n of nodes) {
  nodeSummaryIndex[n.id] = { name: n.name, type: n.type, summary: n.summary || '' };
}

// Output
const result = {
  scriptCompleted: true,
  entryPointCandidates,
  fanInRanking,
  fanOutRanking,
  bfsTraversal: bfsResult,
  nonCodeFiles,
  clusters: topClusters,
  layers: layerList,
  nodeSummaryIndex,
  totalNodes: nodes.length,
  totalEdges: edges.length
};

try {
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');
  console.log('Analysis complete. Results written to:', outputPath);
  process.exit(0);
} catch (e) {
  console.error('Failed to write output:', e.message);
  process.exit(1);
}
