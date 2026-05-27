import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import Header from './components/Header'

import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

import { getRecentQuestions, saveRecentQuestion, clearRecentQuestions } from './utils/storage'

function App({ signOut, user }) {
  const navigate = useNavigate()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  
  const [activeKpi, setActiveKpi] = useState(null)
  const [recentQuestions, setRecentQuestions] = useState(getRecentQuestions)
  const [connectionState, setConnectionState] = useState('loading')
  
  // Core search sync states
  const [qStatus, setQStatus] = useState('Preparing Q')
  const [qMode, setQMode] = useState('loading') // 'loading' | 'success' | 'error'
  const [activeQuestionText, setActiveQuestionText] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  function handleQuestion(question, kpiId = null) {
    setActiveKpi(kpiId)
    
    setQStatus('Question sent to Q')
    setQMode('success')
    setActiveQuestionText(question)
    
    const updated = saveRecentQuestion(question)
    setRecentQuestions(updated)
    navigate('/insights') 
  }

  function handleReloadQ() {
    setQStatus('Preparing Q')
    setQMode('loading')
    setActiveQuestionText('')
    setRefreshKey(prev => prev + 1)
  }

  function handleClear() {
    clearRecentQuestions()
    setRecentQuestions([])
  }

  const pageContextProps = {
    activeKpi,
    recentQuestions,
    activeQuestionText,
    refreshKey,
    handleQuestion,
    handleClear,
    setConnectionState,
    setQStatus,
    setQMode
  }

  return (
    <div className={`app-layout ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      
      {/* PERSISTENT SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header-row">
          <div className="sidebar-menu-title">INSIGHTS</div>
          <button 
            className="sidebar-toggle-btn" 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {/* Collapse/Expand Dynamic Vector Arrow Icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {isSidebarCollapsed ? (
                <path d="M5 12h14M12 5l7 7-7 7"/>
              ) : (
                <path d="M19 12h14M12 19l-7-7 7-7"/>
              )}
            </svg>
          </button>
        </div>

        <ul className="sidebar-links">
          <li>
            <NavLink to="/insights" end className={({ isActive }) => isActive ? "active-link" : ""}>
              <span className="link-icon">
                {/* Sparkles / AI Assistant Vector Icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v3M12 18v3M4.22 4.22l2.12 2.12l11.32 11.32l2.12 2.12M21 12h-3M6 12H3M19.78 4.22l-2.12 2.12L6.34 17.66l-2.12 2.12"/>
                </svg>
              </span> 
              <span className="link-text">AI Insights</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/insights/hyeles" className={({ isActive }) => isActive ? "active-link" : ""}>
              <span className="link-icon">
                {/* Layout Grid / Dashboard Vector Icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="9" rx="1"/>
                  <rect x="14" y="3" width="7" height="5" rx="1"/>
                  <rect x="14" y="12" width="7" height="9" rx="1"/>
                  <rect x="3" y="16" width="7" height="5" rx="1"/>
                </svg>
              </span> 
              <span className="link-text">KPI's Dashboard</span>
            </NavLink>
          </li>
        </ul>
        
        <div className="sidebar-footer">
          <div className="user-info">
            <span className="username-text">{user.username || user.signInDetails?.loginId}</span>
          </div>
          <button onClick={signOut} className="logout-btn" title="Sign Out">
            <span className="logout-icon">
              {/* Log Out Vector Icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
              </svg>
            </span>
            <span className="logout-text">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* RENDER VIEWPORT */}
      <main className="main-content">
        <Header 
          connectionState={connectionState} 
          qStatus={qStatus} 
          qMode={qMode}
          onReload={handleReloadQ}
        />
        
        <div className="dashboard-scroll-view" key={refreshKey}>
          <Outlet context={pageContextProps} />
        </div>
      </main>
    </div>
  )
}

export default withAuthenticator(App)