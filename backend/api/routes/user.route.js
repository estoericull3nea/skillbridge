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
  getDeleteAccounts,
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

export default router
