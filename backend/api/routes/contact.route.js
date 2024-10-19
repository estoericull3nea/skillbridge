import express from 'express'
const router = express.Router()

import { createContact } from '../controllers/contact.controller.js'

router.post('/create', createContact)

export default router
