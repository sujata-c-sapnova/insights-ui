import axios from 'axios'
import {
  LAMBDA_FUNCTION_URL,
} from '../constants/data'

export async function fetchEmbedUrl() {
  const response = await axios.get(
    LAMBDA_FUNCTION_URL
  )

  const payload = response.data

  return (
    payload?.EmbedUrl ||
    payload?.embedUrl ||
    payload?.url ||
    payload
  )
}