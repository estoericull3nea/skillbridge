import express from 'express'
import {
  getUserInfo,
  authorize,
  createMeeting,
  getAllMeetings,
  oAuthCallback,
  getAllMeetingsNotZoom,
  getToken,
  clearToken,
} from '../controllers/meeting.controller.js'

const router = express.Router()

router.get('/authorize', authorize)
router.get('/oauth/callback', oAuthCallback)
router.post('/create-meeting', createMeeting)
router.get('/', getAllMeetings)
router.get('/user-info', getUserInfo)
router.get('/get-all-meetings-not-zoom', getAllMeetingsNotZoom)
router.get('/get-token', getToken)
router.delete('/clear-token', clearToken)

export default router
