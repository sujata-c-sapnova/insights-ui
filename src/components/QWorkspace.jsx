import { useEffect } from 'react'
import {
  fetchEmbedUrl,
} from '../services/quicksightService'

export default function QWorkspace({
  setConnectionState,
}) {
  useEffect(() => {
    loadQ()
  }, [])

  async function loadQ() {
    try {
      setConnectionState('loading')

      const embedUrl =
        await fetchEmbedUrl()

      const {
        createEmbeddingContext,
      } =
        window.QuickSightEmbedding

      const embeddingContext =
        await createEmbeddingContext()

      await embeddingContext.embedQSearchBar(
        {
          url: embedUrl,
          container:
            '#experience-container',
          width: '100%',
          height: '100%',
        },
        {}
      )

      setConnectionState('ready')
    } catch (error) {
      console.error(error)
      setConnectionState('error')
    }
  }

  return (
    <section className="q-workspace">
      <div className="q-toolbar">
        <div>
          <p className="eyebrow">
            Embedded experience
          </p>

          <h2>
            Amazon Q Search Bar
          </h2>
        </div>
      </div>

      <div className="q-stage">
        <div
          id="experience-container"
          className="q-container"
        ></div>
      </div>
    </section>
  )
}