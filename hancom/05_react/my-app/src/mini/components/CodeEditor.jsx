import Editor from '@monaco-editor/react'

const CodeEditor = ({ value, onChange, language = 'javascript', height = '160px' }) => {
  return (
    <Editor
      height={height}
      language={language}
      value={value}
      onChange={(nextValue) => onChange(nextValue ?? '')}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  )
}

export default CodeEditor
