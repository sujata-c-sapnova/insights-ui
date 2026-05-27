import React from 'react'

function Header({ connectionState, qStatus }) {
  return (
    <header className="page-header">
      <div>
        <p className="eyebrow">GenBI Dashboard</p>
        <h1>AI Business Insights powered by AI</h1>
      </div>
      
      <div className="status-badge">
        <span className={`status-dot ${connectionState === 'connected' ? 'connected' : ''}`}></span>
        {/* Render "Preparing Q" or "Question sent to Q" dynamically */}
        <span>{qStatus || 'Preparing Q'}</span>
      </div>
    </header>
  )
}

export default Header