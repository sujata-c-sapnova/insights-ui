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
  
  // 1. New states to track Q's verbal status and the raw active query text
  const [qStatus, setQStatus] = useState('Preparing Q')
  const [activeQuestionText, setActiveQuestionText] = useState('')

  function handleQuestion(question, kpiId = null) {
    setActiveKpi(kpiId)
    
    // 2. Flip status and preserve the exact question string globally
    setQStatus('Question sent to Q')
    setActiveQuestionText(question)
    
    const updated = saveRecentQuestion(question)
    setRecentQuestions(updated)
    navigate('/insights') 
  }

  function handleClear() {
    clearRecentQuestions()
    setRecentQuestions([])
  }

  // Pass these properties down through the router portal context
  const pageContextProps = {
    activeKpi,
    recentQuestions,
    activeQuestionText, // Shared down to Dashboard/Insights pages
    handleQuestion,
    handleClear,
    setConnectionState,
    setQStatus          // Allows sub-pages to reset the status if needed
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
            {isSidebarCollapsed ? '→' : '←'}
          </button>
        </div>

        <ul className="sidebar-links">
          <li>
            <NavLink to="/insights" end className={({ isActive }) => isActive ? "active-link" : ""}>
              <span className="link-icon">▪</span> 
              <span className="link-text">Assistant</span>
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/insights/history" className={({ isActive }) => isActive ? "active-link" : ""}>
              <span className="link-icon">⏱</span> 
              <span className="link-text">History</span>
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/insights/hyeles" className={({ isActive }) => isActive ? "active-link" : ""}>
              <span className="link-icon">📊</span> 
              <span className="link-text">Hyeles</span>
            </NavLink>
          </li>
        </ul>
        
        <div className="sidebar-footer">
          <div className="user-info">
            <span>{user.username || user.signInDetails?.loginId}</span>
          </div>
          <button onClick={signOut} className="logout-btn">
            <span className="logout-text">Sign Out</span>
            <span className="logout-icon-fallback">⎋</span>
          </button>
        </div>
      </aside>

      {/* RENDER VIEWPORT */}
      <main className="main-content">
        {/* 3. Pass the dynamic qStatus string directly to the Header */}
        <Header connectionState={connectionState} qStatus={qStatus} />
        
        <div className="dashboard-scroll-view">
          <Outlet context={pageContextProps} />
        </div>
      </main>
    </div>
  )
}

export default withAuthenticator(App)