import { useEffect, useRef, useState } from 'react'
import { hashUtil } from '../utils'
import secret from '../config/secret'

export default function EncryptID() {
  const [_showTooltip, _setShowTooltip] = useState(false)
  const _outputRef = useRef<HTMLTextAreaElement>(null)

  const [_showSecret, _setShowSecret] = useState(false)
  const [_input, _setInput] = useState('')
  const [_secret, _setSecret] = useState(secret.VITE_HASH_SALT)
  const [_minLength, _setMinLength] = useState(secret.VITE_HASH_Length)
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

    _setOutput(hashUtil.encryptID(_input.trim(), _secret.trim(), _minLength))
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
          defaultValue={secret.VITE_HASH_Length}
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
        <div className="secret-container">
          <input
            type={_showSecret ? 'text' : 'password'}
            className="key-input"
            placeholder="Enter your salt key"
            value={_secret}
            onChange={(e) => _setSecret(e.target.value)}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          <button
            type="button"
            className="toggle-secret"
            onClick={() => _setShowSecret(!_showSecret)}
            aria-label={_showSecret ? 'Hide secret' : 'Show secret'}
          >
            {_showSecret ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="output-text">{'Encrypted Result'}</label>
        <textarea id="output-text" ref={_outputRef} className="text-output" readOnly rows={2} value={_output} />
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
