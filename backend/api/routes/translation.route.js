import express from 'express'
import {
  getLanguages,
  translate,
} from '../controllers/translation.controller.js'

const router = express.Router()

router.get('/languages', getLanguages)
router.post('/', translate)

export default router
