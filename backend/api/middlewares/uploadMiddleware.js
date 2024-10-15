import multer from 'multer'
import path from 'path'

// Set up storage for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Directory where files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + '-' + file.originalname) // Ensure unique filenames
  },
})

// Only accept certain file types (jpeg, jpg, png)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  )
  const mimetype = allowedTypes.test(file.mimetype)

  if (extname && mimetype) {
    cb(null, true)
  } else {
    cb(new Error('Only images are allowed'))
  }
}

// Multer instance with storage, file size limit, and file filter
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
  fileFilter,
})
