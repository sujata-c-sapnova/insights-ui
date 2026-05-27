import React from 'react'

export default function HistoryPage({ recentQuestions, handleClear, handleQuestion }) {
  return (
    <div className="dedicated-history-view">
      <div className="history-view-header">
        <h2>Your Search Logs</h2>
        {recentQuestions.length > 0 && (
          <button className="text-button" onClick={handleClear}>
            Wipe History Logs
          </button>
        )}
      </div>
      
      <div className="history-timeline-list">
        {recentQuestions.length > 0 ? (
          recentQuestions.map((question, idx) => (
            <div key={`history-page-${idx}`} className="history-timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <p className="timeline-query">"{question}"</p>
                <button 
                  className="timeline-action-btn"
                  onClick={() => handleQuestion(question)}
                >
                  Re-run Query →
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-history-text">
            You haven't run any custom BI helper prompts in this session yet.
          </p>
        )}
      </div>
    </div>
  )
}