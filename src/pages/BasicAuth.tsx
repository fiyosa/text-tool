import { useEffect, useRef, useState } from 'react'
import { hashUtil } from '../utils'

export default function BasicAuth() {
  const [_showTooltip, _setShowTooltip] = useState(false)
  const _outputRef = useRef<HTMLTextAreaElement>(null)
  const [_showSecret, _setShowSecret] = useState(false)

  const [_username, _setUsername] = useState('')
  const [_password, _setPassword] = useState('')
  const [_output, _setOutput] = useState('')

  const [_showTooltipDecrypted, _setShowTooltipDecrypted] = useState(false)
  const _outputDecryptedRef = useRef<HTMLTextAreaElement>(null)
  const [_inputDecrypted, _setInputDecrypted] = useState('')
  const [_outputDecrypted, _setOutputDecrypted] = useState('')

  const copyToClipboard = () => {
    if (_output && _outputRef.current) {
      navigator.clipboard.writeText(_output)
      _setShowTooltip(true)
      setTimeout(() => _setShowTooltip(false), 2000)
    }
  }

  const copyToClipboardDecrypted = () => {
    if (_outputDecrypted && _outputDecryptedRef.current) {
      navigator.clipboard.writeText(_outputDecrypted)
      _setShowTooltipDecrypted(true)
      setTimeout(() => _setShowTooltipDecrypted(false), 2000)
    }
  }

  const generateHtpasswd = () => {
    if (!_username.trim() || !_password.trim()) {
      _setOutput('')
      return
    }
    _setOutput(hashUtil.bash64Enrypt(_username.trim(), _password.trim()))
  }

  useEffect(() => {
    generateHtpasswd()
  }, [_username, _password])

  useEffect(() => {
    if (!_inputDecrypted.trim()) {
      _setOutputDecrypted('')
      return
    }
    _setOutputDecrypted(hashUtil.base64Decrypt(_inputDecrypted.trim()))
  }, [_inputDecrypted])

  return (
    <>
      <div className="crypto-section">
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            id="BasicAuth-username"
            className="text-input"
            placeholder="Enter username"
            value={_username}
            onChange={(e) => _setUsername(e.target.value)}
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

        <div className="input-group">
          <label htmlFor="output-text">Base64</label>
          <textarea
            id="BasicAuth-output-text"
            ref={_outputRef}
            className="text-output"
            readOnly
            rows={2}
            value={_output}
          />
        </div>

        <div className="copy-container">
          <button className="action-button copy-button" onClick={copyToClipboard} disabled={!_output}>
            Copy Result
          </button>
          {_showTooltip && <span className={`tooltip ${_showTooltip ? 'show' : ''}`}>Copied!</span>}
        </div>
      </div>

      <div className="crypto-section">
        <div className="input-group">
          <label htmlFor="username">Hash bas64</label>
          <input
            id="aBasicAuth-username"
            className="text-input"
            placeholder="Enter username"
            value={_inputDecrypted}
            onChange={(e) => _setInputDecrypted(e.target.value)}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </div>

        <div className="input-group">
          <label htmlFor="output-text">Result</label>
          <textarea
            id="BasicAuth-output-text-decrypted"
            ref={_outputDecryptedRef}
            className="text-output"
            readOnly
            rows={2}
            value={_outputDecrypted}
          />
        </div>

        <div className="copy-container">
          <button className="action-button copy-button" onClick={copyToClipboardDecrypted} disabled={!_outputDecrypted}>
            Copy Result
          </button>
          {_showTooltipDecrypted && <span className={`tooltip ${_showTooltipDecrypted ? 'show' : ''}`}>Copied!</span>}
        </div>
      </div>
    </>
  )
}
