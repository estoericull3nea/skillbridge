import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import fs from 'fs'

export const clear = async (req, res) => {
  try {
    await User.deleteMany()
    return res.status(200).json({ message: 'All users have been cleared.' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    if (!users.length) {
      return res.status(404).json({ message: 'No Users Found' })
    }
    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getUser = async (req, res) => {
  const { userId } = req.params

  try {
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const deleteUser = async (req, res) => {
  const { userId } = req.params

  try {
    const user = await User.findByIdAndDelete(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const updateUser = async (req, res) => {
  const { userId } = req.params

  const { firstName, lastName, password, active, isVerified } = req.body

  try {
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (firstName) user.firstName = firstName
    if (lastName) user.lastName = lastName
    if (password) user.password = await bcrypt.hash(password, 10)
    if (active !== undefined) user.active = active
    if (isVerified !== undefined) user.isVerified = isVerified

    if (req.file) {
      user.picture = req.file.path
    }

    const updatedUser = await user.save()

    return res.status(200).json({
      message: 'User updated successfully',
      updatedUser,
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const createUser = async (req, res) => {
  const { firstName, lastName, email, password, active, isVerified } = req.body

  if (!firstName || !email) {
    return res
      .status(400)
      .json({ message: 'First name and email are required' })
  }

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    let hashedPassword
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10)
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      active: active !== undefined ? active : true,
      isVerified: isVerified !== undefined ? isVerified : false,
    })

    const savedUser = await newUser.save()

    return res.status(201).json({
      message: 'User created successfully',
      user: {
        id: savedUser._id,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email,
        active: savedUser.active,
        isVerified: savedUser.isVerified,
        role: savedUser.role,
      },
    })
  } catch (error) {
    console.error('Error creating user:', error.message)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const searchUser = async (req, res) => {
  const { q } = req.query

  try {
    const user = await User.findOne({
      $or: [
        { firstName: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
      ],
    })

    if (!user) {
      return res.status(404).json([])
    }

    return res.status(200).json([user])
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const promoteUserToAdmin = async (req, res) => {
  const userId = req.params.userId

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { isAdmin: true, role: 'admin' },
      { new: true }
    )

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const demoteUserFromAdmin = async (req, res) => {
  const userId = req.params.userId

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { isAdmin: false, role: 'user' },
      { new: true }
    )

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
