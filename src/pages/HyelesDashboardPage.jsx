import React, { useEffect, useState } from 'react'
import { fetchHyelesEmbedUrl } from '../services/quicksightService'

export default function HyelesDashboardPage() {
  const [url, setUrl] = useState('')
  const [loadingState, setLoadingState] = useState('loading') // loading, ready, error

  useEffect(() => {
    async function loadHyelesDashboard() {
      try {
        setLoadingState('loading')
        const embedUrl = await fetchHyelesEmbedUrl()
        setUrl(embedUrl)
        setLoadingState('ready')
      } catch (err) {
        console.error(err)
        setLoadingState('error')
      }
    }
    loadHyelesDashboard()
  }, [])

  return (
    <div className="q-workspace">
      <div className="q-toolbar">
        <div>
          {/* <p className="eyebrow">Embedded experience</p> */}
          <h2>Operations Dashboard</h2>
        </div>
      </div>

      <div className="q-stage">
        {loadingState === 'loading' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1, color: 'var(--text-muted)', fontSize: '14px' }}>
            <span>Initializing Hyeles Dashboard Workspace...</span>
          </div>
        )}

        {loadingState === 'error' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1, color: 'var(--text-dark)', fontSize: '14px', fontWeight: '600' }}>
            <span>⚠️ Failed to load dashboard secure session. Please try again.</span>
          </div>
        )}

        {loadingState === 'ready' && url && (
          <iframe
            src={url}
            title="Hyeles Dashboard Component"
            style={{ width: '100%', height: '100%', border: 'none', flexGrow: 1, minHeight: '600px' }}
          />
        )}
      </div>
    </div>
  )
}