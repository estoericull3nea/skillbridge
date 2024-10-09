import express from 'express'
import {
  getUserInfo,
  authorize,
  createMeeting,
  getAllMeetings,
  oAuthCallback,
} from '../controllers/meeting.controller.js'

const router = express.Router()

router.get('/authorize', authorize)
router.get('/oauth/callback', oAuthCallback)
router.post('/create-meeting', createMeeting)
router.get('/', getAllMeetings)
router.get('/user-info', getUserInfo)

export default router
