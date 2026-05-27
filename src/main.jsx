import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import DashboardPage from './pages/DashboardPage'
import HistoryPage from './pages/HistoryPage'
import HyelesDashboardPage from './pages/HyelesDashboardPage'
import './index.css'

import { Amplify } from 'aws-amplify'
import cognitoConfig from './cognitoConfig'

Amplify.configure(cognitoConfig)

import { useOutletContext } from 'react-router-dom'
function RouteContainer({ pageView: PageViewComponent }) {
  const context = useOutletContext()
  return <PageViewComponent {...context} />
}

// We check if Cognito is passing code verification metrics back to the base URL window.
// If it is, we let Amplify complete the login before forcing Route redirections.
const isProcessingAuthHandshake = window.location.search.includes('code=')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={isProcessingAuthHandshake ? <App /> : <Navigate to="/insights" replace />} 
        />
        
        <Route path="/insights" element={<App />}>
          <Route index element={<RouteContainer pageView={DashboardPage} />} />
          <Route path="history" element={<RouteContainer pageView={HistoryPage} />} />
          <Route path="hyeles" element={<HyelesDashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)