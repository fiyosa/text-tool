import { useState, useEffect } from 'react'
import { hashUtil } from '../utils'

export default function Hash() {
  const [_input, _setInput] = useState('')
  const [_saltRounds, _setSaltRounds] = useState(10)
  const [_showSecret, _setShowSecret] = useState(false)
  const [_output, _setOutput] = useState('')
  const [_showTooltip, _setShowTooltip] = useState(false)

  useEffect(() => {
    if (_input.trim()) {
      ;(async () => {
        _setOutput(await hashUtil.hashCreate(_input.trim(), _saltRounds))
      })()
    } else {
      _setOutput('')
    }
  }, [_input, _saltRounds]) //

  const copyToClipboard = () => {
    if (_output) {
      navigator.clipboard.writeText(_output)
      _setShowTooltip(true)
      setTimeout(() => _setShowTooltip(false), 2000)
    }
  }

  return (
    <div className="crypto-section">
      <div className="input-group">
        <label htmlFor="input-text">Text to Hash</label>
        <textarea
          id="input-text"
          className="text-input"
          placeholder="Enter text to hash"
          rows={2}
          value={_input}
          onChange={(e) => _setInput(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </div>

      <div className="input-group">
        <label htmlFor="min-length">Salt Rounds</label>
        <input
          type="number"
          id="min-length"
          className="key-input"
          placeholder="Enter your salt rounds"
          defaultValue={10}
          onChange={(e) => {
            // Remove any non-digit characters that might sneak through
            const numbersOnly = e.target.value.replace(/[^\d]/g, '')
            const number = parseInt(numbersOnly)
            _setSaltRounds(number < 0 ? 0 : number)
          }}
          onKeyDown={(e) => {
            // Prevent negative numbers, decimals, etc.
            if (['-', '+', 'e', 'E', '.'].includes(e.key)) {
              e.preventDefault()
            }
          }}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </div>

      <div className="input-group">
        <label htmlFor="output-text">Hashed Result</label>
        <textarea id="output-text" className="text-output" readOnly rows={2} value={_output} />
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
