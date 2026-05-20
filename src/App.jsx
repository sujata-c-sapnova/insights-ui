import { useState } from 'react'
import Header from './components/Header'
import KPISection from './components/KPISection'
import PromptStrip from './components/PromptStrip'
import QWorkspace from './components/QWorkspace'

// 1. Import the Authenticator package and styles
import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

import {
  getRecentQuestions,
  saveRecentQuestion,
  clearRecentQuestions,
} from './utils/storage'

// 2. The authenticator injects 'signOut' and 'user' directly via props
function App({ signOut, user }) {
  const [activeKpi, setActiveKpi] = useState(null)
  const [recentQuestions, setRecentQuestions] = useState(getRecentQuestions())
  
  // We can hardcode 'connected' because this component won't even mount 
  // until the user is successfully authenticated by Cognito.
  const connectionState = 'connected'

  function handleQuestion(question, kpiId = null) {
    setActiveKpi(kpiId)
    const updated = saveRecentQuestion(question)
    setRecentQuestions(updated)
  }

  function handleClear() {
    clearRecentQuestions()
    setRecentQuestions([])
  }

  return (
    <div className="app-shell">
      {/* Passing signOut down to your Header so users can log out */}
      <Header connectionState={connectionState} user={user} onSignOut={signOut} />

      <main>
        <KPISection onQuestion={handleQuestion} activeKpi={activeKpi} />

        <PromptStrip
          recentQuestions={recentQuestions}
          onQuestion={handleQuestion}
          onClear={handleClear}
        />

        <QWorkspace setConnectionState={() => {}} />
      </main>
    </div>
  )
}

// 3. Export wrapped with the Authenticator guard
export default withAuthenticator(App)