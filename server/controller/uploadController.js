import fs from "fs";

import cloudinary from "../config/cloudinaryConfig.js";

export const uploadFiles = async (req, res) => {
   try {
      const uploadPromises = req.files.map(
         (file) =>
            new Promise((resolve, reject) => {
               cloudinary.uploader.upload(file.path, { folder: "uploads" }, (error, result) => {
                  if (error) reject(error);
                  else
                     resolve({
                        name: file.originalname,
                        url: result.secure_url,
                     });
               });
            })
      );

      const files = await Promise.all(uploadPromises);

      // Optionally, delete local files after uploading
      req.files.forEach((file) => fs.unlinkSync(file.path));

      res.json({ files });
   } catch (error) {
      console.error("Upload failed:", error);
      res.status(500).json({ error: "Upload failed" });
   }
};
