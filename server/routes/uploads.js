import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import upload from '../utils/multer-config.js'; // Adjust path as per your folder structure
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define upload route
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'mern_uploads' }, // Adjust folder name as needed
      (error, result) => {
        if (error) {
          return res.status(500).json({ error: 'Failed to upload image', details: error.message });
        }
        res.json({ imageUrl: result.secure_url });
      }
    );

    // Use the buffer since the image is stored in memory by Multer
    uploadStream.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during the upload process', details: error.message });
  }
});

export default router;
