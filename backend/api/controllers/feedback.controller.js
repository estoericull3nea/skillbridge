import Feedback from '../models/feedback.model.js'

export const submitFeedback = async (req, res) => {
  try {
    const {
      name,
      email,
      bookingExperience,
      serviceQuality,
      overallSatisfaction,
      feedbackType,
      suggestions,
    } = req.body

    const feedback = new Feedback({
      name,
      email,
      bookingExperience,
      serviceQuality,
      overallSatisfaction,
      feedbackType,
      suggestions,
    })

    await feedback.save()

    res.status(201).json({ message: 'Feedback submitted successfully!' })
  } catch (error) {
    console.error('Error submitting feedback:', error)
    res
      .status(500)
      .json({ message: 'There was an error submitting your feedback.' })
  }
}

export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 })
    return res.status(200).json(feedbacks)
  } catch (error) {
    console.error('Error fetching feedbacks:', error)
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    })
  }
}

export const getFeedbacksByEmail = async (req, res) => {
  const { email } = req.params

  try {
    const feedbacks = await Feedback.find({ email: email })
    if (feedbacks.length === 0) {
      return res.status(404).json({
        message: 'No feedback found for this email.',
      })
    }

    return res.status(200).json(feedbacks)
  } catch (error) {
    console.error('Error fetching feedbacks by email:', error)
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    })
  }
}

export const deleteAllFeedbacks = async (req, res) => {
  try {
    await Feedback.deleteMany({})
    return res.status(200).json({
      message: 'All feedbacks deleted successfully.',
    })
  } catch (error) {
    console.error('Error deleting feedbacks:', error)
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    })
  }
}
