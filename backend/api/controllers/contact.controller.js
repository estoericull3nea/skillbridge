import Contact from '../models/contact.model.js'

export const createContact = async (req, res) => {
  const { fullName, email, subject, message } = req.body

  try {
    const newContact = new Contact({
      fullName,
      email,
      subject,
      message,
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
    const contacts = await Contact.find()
    res.status(200).json(contacts)
  } catch (error) {
    console.error('Error fetching contacts:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
