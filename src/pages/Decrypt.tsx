import { useEffect, useRef, useState } from 'react'
import { hashUtil } from '../utils'
import secret from '../config/secret'

export default function Decrypt() {
  const [_showTooltip, _setShowTooltip] = useState(false)
  const _outputRef = useRef<HTMLTextAreaElement>(null)

  const [_showSecret, _setShowSecret] = useState(false)
  const [_advanced, _setAdvanced] = useState(false)
  const [_input, _setInput] = useState('')
  const [_secret, _setSecret] = useState(secret.VITE_HASH_KEY)
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

    if (_advanced) {
      _setOutput(hashUtil.decryptAdvance(_input.trim(), _secret.trim()))
      return
    }

    _setOutput(hashUtil.decrypt(_input.trim(), _secret.trim()))
  }

  useEffect(() => {
    processText()
  }, [_input, _secret, _advanced])

  return (
    <div className="crypto-section">
      <div className="input-group">
        <label>Encryption Mode</label>
        <div className="radio-group">
          <label className="radio-option">
            <input type="radio" checked={!_advanced} onChange={() => _setAdvanced(false)} />
            <span>Basic</span>
          </label>
          <label className="radio-option">
            <input type="radio" checked={_advanced} onChange={() => _setAdvanced(true)} />
            <span>Advanced (more secure)</span>
          </label>
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="input-text">{'Encrypted Text'}</label>
        <textarea
          id="input-text"
          className="text-input"
          placeholder={'Enter text to decrypt...'}
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
        <label htmlFor="secret">Secret Key</label>
        <div className="secret-container">
          <input
            type={_showSecret ? 'text' : 'password'}
            className="key-input"
            placeholder="Enter your secret key"
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
        <label htmlFor="output-text">{'Decrypted  Result'}</label>
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
