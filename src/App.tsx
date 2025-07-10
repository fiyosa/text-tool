import { useState } from 'react'
import Encrypt from './pages/Encrypt'
import Decrypt from './pages/Decrypt'
import DecryptID from './pages/DecryptID'
import EncryptID from './pages/EncryptID'
import JsonFormatter from './pages/JsonFormatter'
import JsonCompare from './pages/JsonCompare'
import HashCheck from './pages/HashCheck'
import Hash from './pages/Hash'
import BasicAuth from './pages/BasicAuth'

export default function App() {
  const [activeTab, setActiveTab] = useState<
    | 'encrypt'
    | 'decrypt'
    | 'encryptID'
    | 'decryptID'
    | 'JsonFormatter'
    | 'JsonCompare'
    | 'hashCheck'
    | 'hash'
    | 'basic-auth'
  >('encrypt')

  return (
    <div className="crypto-app">
      <h1 className="app-title">Text Tool</h1>

      <div className="tab-container">
        <button
          className={`tab-button ${activeTab === 'encrypt' ? 'active' : ''}`}
          onClick={() => setActiveTab('encrypt')}
        >
          Encrypt
        </button>
        <button
          className={`tab-button ${activeTab === 'decrypt' ? 'active' : ''}`}
          onClick={() => setActiveTab('decrypt')}
        >
          Decrypt
        </button>
        <button
          className={`tab-button ${activeTab === 'encryptID' ? 'active' : ''}`}
          onClick={() => setActiveTab('encryptID')}
        >
          Encrypt ID
        </button>
        <button
          className={`tab-button ${activeTab === 'decryptID' ? 'active' : ''}`}
          onClick={() => setActiveTab('decryptID')}
        >
          Decrypt ID
        </button>
        <button className={`tab-button ${activeTab === 'hash' ? 'active' : ''}`} onClick={() => setActiveTab('hash')}>
          Hash
        </button>
        <button
          className={`tab-button ${activeTab === 'hashCheck' ? 'active' : ''}`}
          onClick={() => setActiveTab('hashCheck')}
        >
          Hash Check
        </button>
        <button
          className={`tab-button ${activeTab === 'JsonFormatter' ? 'active' : ''}`}
          onClick={() => setActiveTab('JsonFormatter')}
        >
          Json Formatter
        </button>
        <button
          className={`tab-button ${activeTab === 'JsonCompare' ? 'active' : ''}`}
          onClick={() => setActiveTab('JsonCompare')}
        >
          Json Compare
        </button>
        <button
          className={`tab-button ${activeTab === 'basic-auth' ? 'active' : ''}`}
          onClick={() => setActiveTab('basic-auth')}
        >
          Basic Auth
        </button>
      </div>

      <div style={{ display: activeTab === 'encrypt' ? 'block' : 'none' }}>
        <Encrypt />
      </div>

      <div style={{ display: activeTab === 'decrypt' ? 'block' : 'none' }}>
        <Decrypt />
      </div>

      <div style={{ display: activeTab === 'encryptID' ? 'block' : 'none' }}>
        <EncryptID />
      </div>

      <div style={{ display: activeTab === 'decryptID' ? 'block' : 'none' }}>
        <DecryptID />
      </div>

      <div style={{ display: activeTab === 'JsonFormatter' ? 'block' : 'none' }}>
        <JsonFormatter />
      </div>

      <div style={{ display: activeTab === 'JsonCompare' ? 'block' : 'none' }}>
        <JsonCompare />
      </div>

      <div style={{ display: activeTab === 'hashCheck' ? 'block' : 'none' }}>
        <HashCheck />
      </div>

      <div style={{ display: activeTab === 'hash' ? 'block' : 'none' }}>
        <Hash />
      </div>

      <div style={{ display: activeTab === 'basic-auth' ? 'block' : 'none' }}>
        <BasicAuth />
      </div>
    </div>
  )
}
