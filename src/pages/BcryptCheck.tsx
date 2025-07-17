import { useState, useEffect } from 'react'
import { hashUtil } from '../utils'

export default function BcryptCheck() {
  const [_hashString, _setHashString] = useState('')
  const [_testString, _setTestString] = useState('')
  const [_result, _setResult] = useState<boolean | null>(null)

  useEffect(() => {
    if (_hashString.trim() && _testString.trim()) {
      ;(async () => {
        _setResult(await hashUtil.hashCheck(_testString, _hashString))
      })()
    } else {
      _setResult(null)
    }
  }, [_hashString, _testString])

  return (
    <div className="crypto-section">
      <div className="input-group">
        <label htmlFor="hash-string">Hash String</label>
        <input
          id="hash-string"
          type="text"
          className="text-input"
          value={_hashString}
          onChange={(e) => _setHashString(e.target.value)}
          placeholder="Enter hash string to verify"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </div>

      <div className="input-group">
        <label htmlFor="test-string">Test String</label>
        <input
          id="test-string"
          type="text"
          className="text-input"
          value={_testString}
          onChange={(e) => _setTestString(e.target.value)}
          placeholder="Enter string to test against hash"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </div>

      {_result !== null && (
        <div className="result-message">{_result ? '✅ Hash is valid' : '❌ Hash does not match'}</div>
      )}
    </div>
  )
}
