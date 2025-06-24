import { useEffect, useRef, useState } from 'react'

export default function JsonFormatter() {
  const [_showTooltip, _setShowTooltip] = useState(false)
  const _outputRef = useRef<HTMLTextAreaElement>(null)
  const [_input, _setInput] = useState('')
  const [_output, _setOutput] = useState('')
  const [_error, _setError] = useState('')
  const [_indentSize, _setIndentSize] = useState(2)
  const [_sortKeys, _setSortKeys] = useState(false)
  const [_formatMode, _setFormatMode] = useState<'format' | 'minify'>('format')

  const copyToClipboard = () => {
    if (_output && _outputRef.current) {
      navigator.clipboard.writeText(_output)
      _setShowTooltip(true)
      setTimeout(() => _setShowTooltip(false), 2000)
    }
  }

  const sortObjectKeys = (obj: any): any => {
    if (obj === null || typeof obj !== 'object') {
      return obj
    }

    if (Array.isArray(obj)) {
      return obj.map(sortObjectKeys)
    }

    const sortedObj: any = {}
    const keys = Object.keys(obj).sort()

    for (const key of keys) {
      sortedObj[key] = sortObjectKeys(obj[key])
    }

    return sortedObj
  }

  const processJson = () => {
    if (!_input.trim()) {
      _setOutput('')
      _setError('')
      return
    }

    try {
      let parsed = JSON.parse(_input.trim())

      if (_sortKeys) {
        parsed = sortObjectKeys(parsed)
      }

      if (_formatMode === 'minify') {
        const minified = JSON.stringify(parsed)
        _setOutput(minified)
      } else {
        const formatted = JSON.stringify(parsed, null, _indentSize)
        _setOutput(formatted)
      }

      _setError('')
    } catch (err) {
      _setError('Invalid JSON format. Please check your input.')
      _setOutput('')
    }
  }

  useEffect(() => {
    processJson()
  }, [_input, _indentSize, _sortKeys, _formatMode])

  return (
    <div className="crypto-section">
      <div className="input-group">
        <label>Format Options</label>
        <div className="radio-group">
          <label className="radio-option">
            <input
              type="radio"
              name="formatMode"
              checked={_formatMode === 'format'}
              onChange={() => _setFormatMode('format')}
            />
            <span>Format (Pretty Print)</span>
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="formatMode"
              checked={_formatMode === 'minify'}
              onChange={() => _setFormatMode('minify')}
            />
            <span>Minify</span>
          </label>
        </div>
      </div>

      <div className="input-group">
        <label>Indent Size</label>
        <div className="radio-group">
          <label className="radio-option">
            <input type="radio" name="indentSize" checked={_indentSize === 2} onChange={() => _setIndentSize(2)} />
            <span>2 spaces</span>
          </label>
          <label className="radio-option">
            <input type="radio" name="indentSize" checked={_indentSize === 4} onChange={() => _setIndentSize(4)} />
            <span>4 spaces</span>
          </label>
          <label className="radio-option">
            <input type="radio" name="indentSize" checked={_indentSize === 8} onChange={() => _setIndentSize(8)} />
            <span>8 spaces</span>
          </label>
        </div>
      </div>

      <div className="input-group">
        <label>Additional Options</label>
        <div>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input type="checkbox" checked={_sortKeys} onChange={(e) => _setSortKeys(e.target.checked)} />
            <span style={{ marginLeft: '4px' }}>Sort keys alphabetically</span>
          </label>
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="input-text">JSON Input</label>
        <textarea
          id="input-text"
          className="text-input"
          placeholder="Enter JSON to format..."
          rows={8}
          value={_input}
          onChange={(e) => _setInput(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </div>

      {_error && (
        <div className="error-message">
          <span>{_error}</span>
        </div>
      )}

      <div className="input-group">
        <label htmlFor="output-text">Formatted JSON</label>
        <textarea
          id="output-text"
          ref={_outputRef}
          className="text-output"
          readOnly
          rows={8}
          value={_output}
          placeholder="Formatted JSON will appear here..."
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
