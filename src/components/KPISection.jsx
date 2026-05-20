import {
  kpiQuestions,
} from '../constants/data'

export default function KPISection({
  onQuestion,
  activeKpi,
}) {
  return (
    <section className="kpi-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            KPI hints
          </p>

          <h2>
            Start with a business
            question
          </h2>
        </div>
      </div>

      <div className="kpi-grid">
        {kpiQuestions.map((item) => (
          <button
            key={item.id}
            className={`kpi-card ${
              activeKpi === item.id
                ? 'active'
                : ''
            }`}
            onClick={() =>
              onQuestion(
                item.question,
                item.id
              )
            }
          >
            <span className="metric-icon">
              {item.shortLabel}
            </span>

            <h3>{item.title}</h3>

            <p>{item.description}</p>
          </button>
        ))}
      </div>
    </section>
  )
}