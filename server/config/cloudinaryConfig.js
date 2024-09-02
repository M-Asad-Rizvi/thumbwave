// src/config/cloudinaryConfig.js
import cloudinary from "cloudinary";
import { config } from "dotenv";

config(); // Load environment variables from .env file

cloudinary.v2.config({
   cloud_name: process.env.CLOUDINARY_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary.v2;
