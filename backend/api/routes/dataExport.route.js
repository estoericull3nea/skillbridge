import express from 'express'
import { exportUsersData } from '../controllers/dataExport.controller.js'

const router = express.Router()

router.get('/:userId', exportUsersData)

export default router
