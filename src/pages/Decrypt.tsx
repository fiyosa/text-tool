import { useEffect, useRef, useState } from 'react'
import { hash } from '../utils'

export default function Decrypt() {
  const [_showTooltip, _setShowTooltip] = useState(false)
  const _outputRef = useRef<HTMLTextAreaElement>(null)

  const [_advanced, _setAdvanced] = useState(false)
  const [_input, _setInput] = useState('')
  const [_secret, _setSecret] = useState('')
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
      _setOutput(hash.decryptAdvance(_input.trim(), _secret.trim()))
      return
    }

    _setOutput(hash.decrypt(_input.trim(), _secret.trim()))
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
          placeholder={'Enter text to encrypt...'}
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
        <label htmlFor="secret">Secret</label>
        <input
          type="text"
          id="secret"
          className="key-input"
          placeholder="Enter your secret key"
          value={_secret}
          onChange={(e) => _setSecret(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </div>

      <div className="input-group">
        <label htmlFor="output-text">{'Decrypted  Result'}</label>
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
