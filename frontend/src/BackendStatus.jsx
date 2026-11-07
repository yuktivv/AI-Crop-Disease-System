import { useEffect, useState } from 'react'
import { checkBackend } from './api'

function BackendStatus() {
  const [status, setStatus] = useState('checking')

  useEffect(() => {
    checkBackend()
      .then(() => setStatus('online'))
      .catch(() => setStatus('offline'))
  }, [])

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: status === 'online' ? '#a6f477' :
             status === 'offline' ? '#ff7777' : '#cccccc',
      fontSize: '13px',
      marginTop: '15px'
    }}>
      <span>●</span>
      {status === 'checking' && 'Checking backend...'}
      {status === 'online' && 'Backend Connected'}
      {status === 'offline' && 'Backend Disconnected'}
    </div>
  )
}

export default BackendStatus