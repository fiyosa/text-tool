const secret = {
  VITE_HASH_SALT: `${import.meta.env.VITE_HASH_SALT || ''}`,
  VITE_HASH_Length: parseInt(import.meta.env.VITE_HASH_Length || 0),

  VITE_HASH_KEY: `${import.meta.env.VITE_HASH_KEY || ''}`,
}

export default secret
