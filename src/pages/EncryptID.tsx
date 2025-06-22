import { useEffect, useRef, useState } from 'react'
import { hash } from '../utils'

export default function EncryptID() {
  const [_showTooltip, _setShowTooltip] = useState(false)
  const _outputRef = useRef<HTMLTextAreaElement>(null)

  const [_input, _setInput] = useState('')
  const [_secret, _setSecret] = useState('')
  const [_minLength, _setMinLength] = useState(0)
  const [_output, _setOutput] = useState('')

  const copyToClipboard = () => {
    if (_output && _outputRef.current) {
      navigator.clipboard.writeText(_output)
      _setShowTooltip(true)
      setTimeout(() => _setShowTooltip(false), 2000)
    }
  }

  const processText = () => {
    if (!_input) {
      _setOutput('')
      return
    }

    _setOutput(hash.encryptID(_input.trim(), _secret.trim(), _minLength))
  }

  useEffect(() => {
    processText()
  }, [_input, _secret, _minLength])

  return (
    <div className="crypto-section">
      <div className="input-group">
        <label htmlFor="input-text">Original ID</label>
        <input
          type="number"
          id="input-text"
          className="key-input" // Use same style as your other inputs
          placeholder="Enter numbers to encrypt..."
          value={_input}
          onChange={(e) => {
            // Remove any non-digit characters that might sneak through
            const numbersOnly = e.target.value.replace(/[^\d]/g, '')
            _setInput(numbersOnly)
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
        <label htmlFor="min-length">Minimum Hash Length</label>
        <input
          type="number"
          id="min-length"
          className="key-input"
          placeholder="Enter your padding length"
          onChange={(e) => {
            // Remove any non-digit characters that might sneak through
            const numbersOnly = e.target.value.replace(/[^\d]/g, '')
            const number = parseInt(numbersOnly)
            _setMinLength(number < 2 ? 2 : number)
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
        <label htmlFor="secret">Salt</label>
        <input
          type="text"
          id="secret"
          className="key-input"
          placeholder="Enter your salt"
          value={_secret}
          onChange={(e) => _setSecret(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </div>

      <div className="input-group">
        <label htmlFor="output-text">{'Encrypted Result'}</label>
        <textarea id="output-text" ref={_outputRef} className="text-output" readOnly rows={2} value={_output} />
      </div>

      <div className="copy-container">
        <button className="action-button copy-button" onClick={copyToClipboard} disabled={!_output}>
          Copy Result
        </button>
        {_showTooltip && <span className="tooltip">Copied!</span>}
      </div>
    </div>
  )
}
