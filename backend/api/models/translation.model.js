import axios from 'axios'

const LIBRETRANSLATE_API_URL = 'https://libretranslate.com'

export const getAvailableLanguages = async () => {
  try {
    const response = await axios.get(`${LIBRETRANSLATE_API_URL}/languages`)
    return response.data
  } catch (error) {
    throw new Error('Error fetching languages')
  }
}

export const translateText = async (text, targetLanguage) => {
  try {
    const response = await axios.post(`${LIBRETRANSLATE_API_URL}/translate`, {
      q: text,
      target: targetLanguage,
    })
    return response.data.translatedText
  } catch (error) {
    console.log(error.message)
  }
}
