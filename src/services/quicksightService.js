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
// your existing fetchEmbedUrl function above untouched...

export async function fetchHyelesEmbedUrl() {
  try {
    const response = await fetch('https://gc4rjvc6cgckweiuzfu5trfmvq0bmpgk.lambda-url.ap-south-1.on.aws/')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const payload = await response.json()
    
    // Fallback extraction matching your exact format logic
    const url = payload?.EmbedUrl || payload?.embedUrl || payload?.url || payload
    
    if (!url) {
      throw new Error('No valid embedding URL found in the Hyeles payload.')
    }
    
    return url
  } catch (error) {
    console.error('Failed to retrieve Hyeles Embed URL:', error.message)
    throw error
  }
}