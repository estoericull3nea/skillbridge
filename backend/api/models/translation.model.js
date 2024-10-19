import axios from 'axios'

const LIBRETRANSLATE_API_URL = 'https://libretranslate.com'

// Function to get available languages
export const getAvailableLanguages = async () => {
  try {
    const response = await axios.get(`${LIBRETRANSLATE_API_URL}/languages`)
    return response.data // Returns list of available languages
  } catch (error) {
    throw new Error('Error fetching languages')
  }
}

// Function to translate text
export const translateText = async (text, targetLanguage) => {
  try {
    const response = await axios.post(`${LIBRETRANSLATE_API_URL}/translate`, {
      q: text, // The text to translate
      target: targetLanguage, // The target language code (e.g., 'es' for Spanish)
    })
    return response.data.translatedText // Returns translated text
  } catch (error) {
    // throw new Error('Error translating text')
    console.log(error.message)
  }
}
