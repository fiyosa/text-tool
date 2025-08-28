import { useState } from 'react'
import Encrypt from './pages/Encrypt'
import Decrypt from './pages/Decrypt'
import DecryptID from './pages/DecryptID'
import EncryptID from './pages/EncryptID'
import JsonFormatter from './pages/JsonFormatter'
import JsonCompare from './pages/JsonCompare'
import Bcrypt from './pages/Bcrypt'
import BasicAuth from './pages/BasicAuth'
import Htpasswd from './pages/Htpasswd'

export default function App() {
  const [activeTab, setActiveTab] = useState<
    | 'encrypt'
    | 'decrypt'
    | 'encryptID'
    | 'decryptID'
    | 'bcrypt'
    | 'basic-auth'
    | 'htpasswd'
    // ================================
    | 'JsonFormatter'
    | 'JsonCompare'
  >('encrypt')

  return (
    <div className="crypto-app">
      <h1 className="app-title">Text Tool</h1>

      <div className="tab-container">
        <button
          className={`tab-button ${activeTab === 'encrypt' ? 'active' : ''}`}
          onClick={() => setActiveTab('encrypt')}
        >
          Encryption
        </button>
        <button
          className={`tab-button ${activeTab === 'encryptID' ? 'active' : ''}`}
          onClick={() => setActiveTab('encryptID')}
        >
          Hash ID
        </button>
        <button
          className={`tab-button ${activeTab === 'bcrypt' ? 'active' : ''}`}
          onClick={() => setActiveTab('bcrypt')}
        >
          Bcrypt
        </button>
        <button
          className={`tab-button ${activeTab === 'basic-auth' ? 'active' : ''}`}
          onClick={() => setActiveTab('basic-auth')}
        >
          Basic Auth
        </button>
        <button
          className={`tab-button ${activeTab === 'htpasswd' ? 'active' : ''}`}
          onClick={() => setActiveTab('htpasswd')}
        >
          Htpasswd
        </button>

        {/* =================================================== */}

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
      </div>

      <div style={{ display: activeTab === 'encrypt' ? 'block' : 'none' }}>
        <Encrypt />
      </div>

      <div style={{ display: activeTab === 'encryptID' ? 'block' : 'none' }}>
        <EncryptID />
      </div>

      <div style={{ display: activeTab === 'JsonFormatter' ? 'block' : 'none' }}>
        <JsonFormatter />
      </div>

      <div style={{ display: activeTab === 'JsonCompare' ? 'block' : 'none' }}>
        <JsonCompare />
      </div>

      <div style={{ display: activeTab === 'bcrypt' ? 'block' : 'none' }}>
        <Bcrypt />
      </div>

      <div style={{ display: activeTab === 'basic-auth' ? 'block' : 'none' }}>
        <BasicAuth />
      </div>

      <div style={{ display: activeTab === 'htpasswd' ? 'block' : 'none' }}>
        <Htpasswd />
      </div>
    </div>
  )
}
