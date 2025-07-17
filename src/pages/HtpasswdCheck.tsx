import { useEffect, useRef, useState } from 'react'
import { hashUtil } from '../utils'

export default function HtpasswdCheck() {
  const [_showTooltip, _setShowTooltip] = useState(false)
  const [_showSecret, _setShowSecret] = useState(false)

  const [_input, _setInput] = useState('')
  const [_password, _setPassword] = useState('')

  const [_result, _setResult] = useState<boolean | null>(null)

  const checkHtpasswd = () => {
    if (!_input || !_password) {
      _setResult(null)
      return
    }

    _setResult(hashUtil.htpasswdCheck(_input.trim(), _password.trim()))
  }

  useEffect(() => {
    checkHtpasswd()
  }, [_input, _password])

  return (
    <div className="crypto-section">
      <div className="input-group">
        <label htmlFor="input-text">Htpasswd Entry</label>
        <input
          id="input-text"
          className="text-input"
          placeholder="Masukkan htpasswd entry"
          value={_input}
          onChange={(e) => _setInput(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </div>
      <div className="input-group">
        <label htmlFor="secret">Password</label>
        <div className="secret-container">
          <input
            type={_showSecret ? 'text' : 'password'}
            className="key-input"
            placeholder="Enter your salt key"
            value={_password}
            onChange={(e) => _setPassword(e.target.value)}
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

      {_result !== null && (
        <div className="result-message">{_result ? '✅ Hash is valid' : '❌ Hash does not match'}</div>
      )}
    </div>
  )
}
