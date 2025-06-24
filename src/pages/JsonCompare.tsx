import { useEffect, useRef, useState } from 'react'

interface JsonDiffResult {
  added: string[]
  removed: string[]
  modified: string[]
  unchanged: string[]
}

export default function JsonCompare() {
  const [_showTooltip, _setShowTooltip] = useState(false)
  const _outputRef = useRef<HTMLTextAreaElement>(null)
  const [_json1, _setJson1] = useState('')
  const [_json2, _setJson2] = useState('')
  const [_output, _setOutput] = useState('')
  const [_error, _setError] = useState('')

  const copyToClipboard = () => {
    if (_output && _outputRef.current) {
      navigator.clipboard.writeText(_output)
      _setShowTooltip(true)
      setTimeout(() => _setShowTooltip(false), 2000)
    }
  }

  const isValidJSON = (str: string): boolean => {
    try {
      JSON.parse(str)
      return true
    } catch {
      return false
    }
  }

  const formatJSON = (json: any): string => {
    return JSON.stringify(json, null, 2)
  }

  const compareJSON = (obj1: any, obj2: any, path: string = ''): JsonDiffResult => {
    const result: JsonDiffResult = {
      added: [],
      removed: [],
      modified: [],
      unchanged: [],
    }

    const keys1 = Object.keys(obj1 || {})
    const keys2 = Object.keys(obj2 || {})

    // Check for added keys
    keys2.forEach((key) => {
      if (!keys1.includes(key)) {
        result.added.push(path ? `${path}.${key}` : key)
      }
    })

    // Check for removed keys
    keys1.forEach((key) => {
      if (!keys2.includes(key)) {
        result.removed.push(path ? `${path}.${key}` : key)
      }
    })

    // Check for modified and unchanged keys
    keys1.forEach((key) => {
      if (keys2.includes(key)) {
        const currentPath = path ? `${path}.${key}` : key
        const val1 = obj1[key]
        const val2 = obj2[key]

        if (typeof val1 === 'object' && val1 !== null && typeof val2 === 'object' && val2 !== null) {
          // Recursively compare nested objects
          const nestedResult = compareJSON(val1, val2, currentPath)
          result.added.push(...nestedResult.added)
          result.removed.push(...nestedResult.removed)
          result.modified.push(...nestedResult.modified)
          result.unchanged.push(...nestedResult.unchanged)
        } else if (val1 !== val2) {
          result.modified.push(currentPath)
        } else {
          result.unchanged.push(currentPath)
        }
      }
    })

    return result
  }

  const processComparison = () => {
    _setError('')
    _setOutput('')

    if (!_json1.trim() && !_json2.trim()) {
      return
    }

    if (!_json1.trim()) {
      _setError('First JSON cannot be empty')
      return
    }

    if (!_json2.trim()) {
      _setError('Second JSON cannot be empty')
      return
    }

    if (!isValidJSON(_json1)) {
      _setError('First JSON is not valid')
      return
    }

    if (!isValidJSON(_json2)) {
      _setError('Second JSON is not valid')
      return
    }

    try {
      const obj1 = JSON.parse(_json1)
      const obj2 = JSON.parse(_json2)

      const diffResult = compareJSON(obj1, obj2)

      let output = '=== JSON COMPARISON RESULT ===\n\n'

      if (diffResult.added.length > 0) {
        output += '✅ ADDED:\n'
        diffResult.added.forEach((key) => {
          output += `  + ${key}\n`
        })
        output += '\n'
      }

      if (diffResult.removed.length > 0) {
        output += '❌ REMOVED:\n'
        diffResult.removed.forEach((key) => {
          output += `  - ${key}\n`
        })
        output += '\n'
      }

      if (diffResult.modified.length > 0) {
        output += '🔄 MODIFIED:\n'
        diffResult.modified.forEach((key) => {
          output += `  ~ ${key}\n`
        })
        output += '\n'
      }

      if (diffResult.unchanged.length > 0) {
        output += '✅ UNCHANGED:\n'
        diffResult.unchanged.forEach((key) => {
          output += `  = ${key}\n`
        })
        output += '\n'
      }

      if (diffResult.added.length === 0 && diffResult.removed.length === 0 && diffResult.modified.length === 0) {
        output += '🎉 Both JSONs are identical! No differences found.\n'
      }

      _setOutput(output)
    } catch (error) {
      _setError('An error occurred while comparing JSONs')
    }
  }

  useEffect(() => {
    processComparison()
  }, [_json1, _json2])

  return (
    <div className="crypto-section">
      <div className="input-group">
        <label htmlFor="json1">First JSON</label>
        <textarea
          id="json1"
          className="text-input"
          placeholder="Enter first JSON..."
          rows={8}
          value={_json1}
          onChange={(e) => _setJson1(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </div>

      <div className="input-group">
        <label htmlFor="json2">Second JSON</label>
        <textarea
          id="json2"
          className="text-input"
          placeholder="Enter second JSON..."
          rows={8}
          value={_json2}
          onChange={(e) => _setJson2(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </div>

      {_error && (
        <div className="error-message">
          <span>⚠️ {_error}</span>
        </div>
      )}

      <div className="input-group">
        <label htmlFor="output-text">Comparison Result</label>
        <textarea
          id="output-text"
          ref={_outputRef}
          className="text-output"
          readOnly
          rows={12}
          value={_output}
          placeholder="Comparison result will appear here..."
        />
      </div>

      <div className="copy-container">
        <button className="action-button copy-button" onClick={copyToClipboard} disabled={!_output}>
          Copy Result
        </button>
        {_showTooltip && <span className={`tooltip ${_showTooltip ? 'show' : ''}`}>Copied!</span>}
      </div>
    </div>
  )
}
