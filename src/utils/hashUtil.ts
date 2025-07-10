import CryptoJS from 'crypto-js'
import Hashids from 'hashids'
import * as bcrypt from 'bcryptjs'

export function encrypt(plainText: string, secret: string): string {
  try {
    return CryptoJS.AES.encrypt(plainText, secret).toString()
  } catch (err: any) {
    return 'Error: ' + err?.message
  }
}

export function decrypt(cipherText: string, secret: string): string {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, secret)
    const plainText = bytes.toString(CryptoJS.enc.Utf8)

    if (!plainText) return 'Error: ' + 'Invalid decryption key or corrupted data.'

    return plainText
  } catch (err: any) {
    return 'Error: ' + err?.message
  }
}

// ===============================================================

export function encryptAdvance(plainText: string, secret: string): string {
  try {
    if (plainText === '') return ''

    let key: any = secret
    let iv: any = CryptoJS.lib.WordArray.random(16)
    key = CryptoJS.enc.Base64.parse(key)
    let options = {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
    let encrypted: any = CryptoJS.AES.encrypt(plainText, key, options)
    encrypted = encrypted.toString()
    iv = CryptoJS.enc.Base64.stringify(iv)
    let result = {
      iv: iv,
      value: encrypted,
      mac: CryptoJS.HmacSHA256(iv + encrypted, key).toString(),
    }
    let result_final: any = JSON.stringify(result)
    result_final = CryptoJS.enc.Utf8.parse(result_final)
    return CryptoJS.enc.Base64.stringify(result_final)
  } catch (err) {
    return ''
  }
}

export function decryptAdvance(cipherText: string, secret: string): string {
  try {
    const key: string = secret
    const encrypted_json = JSON.parse(window.atob(cipherText))
    const encrypted = CryptoJS.AES.decrypt(encrypted_json.value, CryptoJS.enc.Base64.parse(key), {
      iv: CryptoJS.enc.Base64.parse(encrypted_json.iv),
    })
    let decryptData = encrypted.toString(CryptoJS.enc.Utf8)
    return decryptData
  } catch (err) {
    return ''
  }
}

// ===============================================================

export function encryptID(plainText: string | number, secret: string, minLength: number): string {
  try {
    const hashids = new Hashids(secret, minLength)
    const number = parseInt(`${plainText}`)
    if (!isNaN(number)) {
      return hashids.encode(number)
    }
    return 'Error: Invalid input.'
  } catch (err: any) {
    return 'Error: ' + err?.message
  }
}

export function decryptID(cipherText: string, secret: string, minLength: number): any {
  try {
    const hashids = new Hashids(secret, minLength)
    return hashids.decode(cipherText)
  } catch (err: any) {
    return 'Error: ' + err?.message
  }
}

// ===============================================================

export async function hashCreate(plainText: string, saltRounds: number): Promise<string> {
  return await bcrypt.hash(plainText, saltRounds)
}

export async function hashCheck(plainText: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(plainText, hash)
}

// ===============================================================

export function bash64Enrypt(username: string, password: string): string {
  const credentials = `${username}:${password}`
  const encoded = btoa(credentials)
  return `Basic ${encoded}`
}

export function base64Decrypt(authHeader: string): string {
  try {
    const base64Str = authHeader.startsWith('Basic ') ? authHeader.slice(6) : authHeader

    return atob(base64Str.trim())
  } catch (err) {
    return `Decode failed: ${err instanceof Error ? err.message : String(err)}`
  }
}
