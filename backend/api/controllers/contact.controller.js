import Contact from '../models/contact.model.js'

export const createContact = async (req, res) => {
  const { fullName, email, subject, message, userId } = req.body

  try {
    const newContact = new Contact({
      fullName,
      email,
      subject,
      message,
      user: userId,
    })

    await newContact.save()
    res.status(201).json({ message: 'Contact form submitted successfully' })
  } catch (error) {
    console.error('Error saving contact:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().populate('user')

    if (contacts.length === 0) {
      return res.status(404).json({ message: 'No contacts found' })
    }

    res.status(200).json(contacts)
  } catch (error) {
    console.error('Error fetching contacts:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const deleteAllContacts = async (req, res) => {
  try {
    await Contact.deleteMany({})
    res.status(200).json({ message: 'All contacts deleted successfully' })
  } catch (error) {
    console.error('Error deleting contacts:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getAllContactsUsingEmail = async (req, res) => {
  const { email } = req.params
  try {
    const contacts = await Contact.find({ email })

    if (contacts.length === 0) {
      return res
        .status(404)
        .json({ message: 'No contacts found for this user' })
    }

    res.status(200).json(contacts)
  } catch (error) {
    console.error('Error fetching contacts:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
