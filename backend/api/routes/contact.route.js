import express from 'express'
const router = express.Router()

import {
  createContact,
  getAllContacts,
} from '../controllers/contact.controller.js'

router.get('/', getAllContacts)
router.post('/create', createContact)

export default router
