import DeleteAccount from '../models/deletionRequest.model.js'
import User from '../models/user.model.js'

// Handle user deletion request
export const requestAccountDeletion = async (req, res) => {
  const { userId } = req.params

  try {
    // Check if there's an existing pending request
    const existingRequest = await DeleteAccount.findOne({
      user: userId,
      status: 'pending',
    })
    if (existingRequest) {
      return res
        .status(400)
        .json({ message: 'A pending deletion request already exists.' })
    }

    // Create a new deletion request
    const newRequest = new DeleteAccount({ user: userId })
    await newRequest.save()
    res
      .status(200)
      .json({ message: 'Deletion request submitted, pending admin approval.' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// Admin fetches all deletion requests
export const getDeleteAccounts = async (req, res) => {
  try {
    const requests = await DeleteAccount.find({ status: 'pending' }).populate(
      'user'
    )
    res.status(200).json(requests)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// Admin approves the deletion request and deletes the user
export const approveDeleteAccount = async (req, res) => {
  const { requestId } = req.params

  try {
    const request = await DeleteAccount.findById(requestId).populate('user')
    if (!request || request.status !== 'pending') {
      return res
        .status(400)
        .json({ message: 'Invalid or already processed request.' })
    }

    // Delete the user
    await User.findByIdAndDelete(request.user._id)
    request.status = 'approved'
    await request.save()

    res.status(200).json({ message: 'Account deleted successfully.' })
  } catch (error) {
    console.error('Error approving deletion request:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Admin rejects the deletion request
export const rejectDeleteAccount = async (req, res) => {
  const { requestId } = req.params

  try {
    const request = await DeleteAccount.findById(requestId)
    if (!request || request.status !== 'pending') {
      return res
        .status(400)
        .json({ message: 'Invalid or already processed request.' })
    }

    // Mark the request as rejected
    request.status = 'rejected'
    await request.save()

    res.status(200).json({ message: 'Deletion request rejected.' })
  } catch (error) {
    console.error('Error rejecting deletion request:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getDeletionRequestsByUserId = async (req, res) => {
  const { userId } = req.params // Get the userId from the request parameters

  try {
    // Fetch all deletion requests for the specific userId
    const requests = await DeleteAccount.find({ user: userId }).populate('user')

    if (!requests || requests.length === 0) {
      return res
        .status(404)
        .json({ message: 'No deletion requests found for this user.' })
    }

    res.status(200).json(requests)
  } catch (error) {
    console.error('Error fetching deletion requests by userId:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
