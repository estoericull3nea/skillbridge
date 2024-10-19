import express from 'express'
const router = express.Router()

import {
  createContact,
  deleteAllContacts,
  getAllContacts,
  getAllContactsUsingEmail,
} from '../controllers/contact.controller.js'

router.get('/', getAllContacts)
router.post('/create', createContact)
router.delete('/', deleteAllContacts)
router.get('/:email', getAllContactsUsingEmail)

export default router
