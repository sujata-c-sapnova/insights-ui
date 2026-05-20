export default function Header({
  connectionState,
}) {
  return (
    <header className="hero-header">
      <div>
        <p className="eyebrow">
          Amazon QuickSight Q
        </p>

        <h1>
          Analytics Assistant Dashboard
        </h1>

        <p className="subtitle">
          Ask business questions,
          explore KPI ideas, and turn
          common analytics prompts
          into instant Q searches.
        </p>
      </div>

      <div className="status-panel">
        <span
          className={`status-dot ${connectionState}`}
        ></span>

        <span>
          {connectionState === 'ready'
            ? 'Q Ready'
            : connectionState === 'error'
            ? 'Q Error'
            : 'Preparing Q'}
        </span>
      </div>
    </header>
  )
}