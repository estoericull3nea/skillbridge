import {
  getAvailableLanguages,
  translateText,
} from '../models/translation.model.js'

export const getLanguages = async (req, res) => {
  try {
    const languages = await getAvailableLanguages()
    res.json(languages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const translate = async (req, res) => {
  const { text, targetLanguage } = req.body
  try {
    const translatedText = await translateText(text, targetLanguage)
    res.json({ translatedText })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
