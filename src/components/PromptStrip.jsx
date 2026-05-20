import {
  searchSuggestions,
} from '../constants/data'

export default function PromptStrip({
  recentQuestions,
  onQuestion,
  onClear,
}) {
  return (
    <section className="prompt-strip">
      <article className="prompt-card">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">
              Suggestions
            </p>
            <h2>Try next</h2>
          </div>
        </div>

        <div className="chip-list">
          {searchSuggestions.map(
            (question, index) => (
              <button
                key={index}
                className="prompt-chip"
                onClick={() =>
                  onQuestion(question)
                }
              >
                {question}
              </button>
            )
          )}
        </div>
      </article>

      <article className="prompt-card">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">
              History
            </p>

            <h2>
              Recent questions
            </h2>
          </div>

          <button
            className="text-button"
            onClick={onClear}
          >
            Clear
          </button>
        </div>

        <div className="recent-list">
          {recentQuestions.map(
            (question, index) => (
              <button
                key={index}
                className="recent-chip"
                onClick={() =>
                  onQuestion(question)
                }
              >
                {question}
              </button>
            )
          )}
        </div>
      </article>
    </section>
  )
}