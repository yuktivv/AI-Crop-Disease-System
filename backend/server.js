

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const uploadFolder = path.join(process.cwd(), 'uploads')

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder)
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    cb(null, uniqueName)
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Only JPG, PNG and WEBP images are allowed'))
    }
  }
})

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174']
}))

app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to AGROVISION AI Backend',
    status: 'Server is running'
  })
})

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'AGROVISION AI API is working!',
    status: 'online'
  })
})

app.post('/api/upload', (req, res) => {
  upload.single('image')(req, res, (error) => {
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      })
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image'
      })
    }

    res.json({
      success: true,
      message: 'Image uploaded successfully!',
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size
    })
  })
})

app.listen(PORT, () => {
  console.log(`AGROVISION AI Backend running at http://localhost:${PORT}`)
})

