import React from 'react'
import KPISection from '../components/KPISection'
import PromptStrip from '../components/PromptStrip'
import QWorkspace from '../components/QWorkspace'

export default function DashboardPage({ 
  activeKpi, 
  recentQuestions, 
  handleQuestion, 
  handleClear, 
  setConnectionState 
}) {
  return (
    <>
      {/* KPI Interactive Tiles */}
      <KPISection onQuestion={handleQuestion} activeKpi={activeKpi} />

      {/* History pill chips & recommendations */}
      <PromptStrip
        recentQuestions={recentQuestions}
        onQuestion={handleQuestion}
        onClear={handleClear}
      />

      {/* Amazon Q / QuickSight iframe Stage */}
      <QWorkspace setConnectionState={setConnectionState} />
    </>
  )
}