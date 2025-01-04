import DeleteAccount from '../models/deletionRequest.model.js'
import User from '../models/user.model.js'

export const requestAccountDeletion = async (req, res) => {
  const { userId } = req.params

  try {
    const existingRequest = await DeleteAccount.findOne({
      user: userId,
      status: 'pending',
    })
    if (existingRequest) {
      return res
        .status(400)
        .json({ message: 'A pending deletion request already exists.' })
    }

    const newRequest = new DeleteAccount({ user: userId })
    await newRequest.save()
    res
      .status(200)
      .json({ message: 'Deletion request submitted, pending admin approval.' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

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

export const approveDeleteAccount = async (req, res) => {
  const { requestId } = req.params

  try {
    const request = await DeleteAccount.findById(requestId).populate('user')

    if (!request || request.status !== 'pending') {
      return res
        .status(400)
        .json({ message: 'Invalid or already processed request.' })
    }

    const userId = request.user._id

    await User.findByIdAndDelete(userId)

    request.status = 'approved'
    await request.save()

    res.status(200).json({
      message: 'Account deleted successfully.',
    })
  } catch (error) {
    console.error('Error approving deletion request:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const rejectDeleteAccount = async (req, res) => {
  const { requestId } = req.params

  try {
    const request = await DeleteAccount.findById(requestId)
    if (!request || request.status !== 'pending') {
      return res
        .status(400)
        .json({ message: 'Invalid or already processed request.' })
    }

    request.status = 'rejected'
    await request.save()

    res.status(200).json({ message: 'Deletion request rejected.' })
  } catch (error) {
    console.error('Error rejecting deletion request:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getDeletionRequestsByUserId = async (req, res) => {
  const { userId } = req.params

  try {
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

export const getAllPendingDeletionRequests = async (req, res) => {
  try {
    const pendingRequests = await DeleteAccount.find({
      status: 'pending',
    })
      .populate('user')
      .sort({ createdAt: -1 })

    if (!pendingRequests || pendingRequests.length === 0) {
      return res
        .status(404)
        .json({ message: 'No pending deletion requests found.' })
    }

    res.status(200).json({
      count: pendingRequests.length,
      pendingRequests,
    })
  } catch (error) {
    console.error('Error fetching pending deletion requests:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getAllApprovedDeletionRequests = async (req, res) => {
  try {
    const approvedRequests = await DeleteAccount.find({
      status: 'approved',
    }).populate('user')

    if (!approvedRequests || approvedRequests.length === 0) {
      return res
        .status(404)
        .json({ message: 'No approved deletion requests found.' })
    }

    res.status(200).json({
      count: approvedRequests.length,
      approvedRequests,
    })
  } catch (error) {
    console.error('Error fetching approved deletion requests:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getAllRejectedDeletionRequests = async (req, res) => {
  try {
    const rejectedRequests = await DeleteAccount.find({
      status: 'rejected',
    }).populate('user')

    if (!rejectedRequests || rejectedRequests.length === 0) {
      return res
        .status(404)
        .json({ message: 'No rejected deletion requests found.' })
    }

    res.status(200).json(rejectedRequests)
  } catch (error) {
    console.error('Error fetching rejected deletion requests:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
