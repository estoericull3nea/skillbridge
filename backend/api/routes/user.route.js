import express from 'express'
import {
  clear,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../controllers/user.controller.js'
import { upload } from '../middlewares/uploadMiddleware.js'
import {
  approveDeleteAccount,
  getAllApprovedDeletionRequests,
  getAllPendingDeletionRequests,
  getAllRejectedDeletionRequests,
  getDeleteAccounts,
  getDeletionRequestsByUserId,
  rejectDeleteAccount,
  requestAccountDeletion,
} from '../controllers/accountDeletion.controller.js'

const router = express.Router()

router.delete('/clear', clear)
router.get('/', getUsers)
router.get('/:userId', getUser)
router.delete('/:userId', deleteUser)
router.patch('/:userId', upload.single('picture'), updateUser)

router.delete('/:userId/request-deletion', requestAccountDeletion)
router.get('/deletion/requests', getDeleteAccounts)
router.get('/:userId/deletion-requests', getDeletionRequestsByUserId)
router.get('/deletion-requests/pending', getAllPendingDeletionRequests)
router.get('/deletion-requests/approved', getAllApprovedDeletionRequests)
router.get('/deletion-requests/rejected', getAllRejectedDeletionRequests)
router.patch('/deletion-requests/:requestId/approve', approveDeleteAccount)
router.patch('/deletion-requests/:requestId/reject', rejectDeleteAccount)

export default router
