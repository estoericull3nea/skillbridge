import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      // required: [true, 'Last name is required'],
      // trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
    password: {
      type: String,
      // required: [true, 'Password is required'],
      // minLength: [8, 'Password must be at least 8 characters long'],
      required: false,
    },

    picture: {
      type: String,
      default: '',
    },

    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    verificationTokenExpires: Date,
    lastVerificationRequest: Date,
    verificationRequestCount: {
      type: Number,
      default: 0,
    },
    failedLoginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },

    active: {
      type: Boolean,
      default: true,
    },
    googleId: { type: String, required: false },
  },

  {
    timestamps: true,
  }
)

export default mongoose.model('User', userSchema)
