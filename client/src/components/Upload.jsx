import React, { useState, useCallback } from "react";
import { Upload as UploadIcon, X } from "lucide-react";

const Upload = ({ onUpload }) => {
   const [files, setFiles] = useState([]);
   const [uploading, setUploading] = useState(false);

   const handleFiles = useCallback(
      async (acceptedFiles) => {
         setUploading(true);

         const formData = new FormData();
         Array.from(acceptedFiles).forEach((file) => {
            formData.append("files", file);
         });

         try {
            const response = await fetch("/api/v1/upload", {
               method: "POST",
               body: formData,
            });

            if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setFiles((prevFiles) => [...prevFiles, ...data.files]);

            if (onUpload) onUpload(data);
         } catch (error) {
            console.error("Upload failed:", error);
            alert("File upload failed. Please try again.");
         } finally {
            setUploading(false);
         }
      },
      [onUpload]
   );

   const handleFileChange = useCallback(
      (event) => {
         handleFiles(event.target.files);
      },
      [handleFiles]
   );

   const removeFile = (indexToRemove) => {
      const fileToRemove = files[indexToRemove];
      setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
      if (onUpload) onUpload(files.filter((_, index) => index !== indexToRemove));
   };

   return (
      <div className="flex flex-col items-center justify-center w-full">
         <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
         >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
               <UploadIcon className="w-8 h-8 mb-4 text-gray-500" />
               <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
               </p>
               <p className="text-xs text-gray-500">
                  Multiple JPG, JPEG, PNG or WebP up to <b>10MB</b> each
               </p>
            </div>
            <input
               id="dropzone-file"
               type="file"
               className="hidden"
               onChange={handleFileChange}
               accept=".jpg,.jpeg,.png,.webp"
               multiple
               disabled={uploading}
            />
         </label>
         {uploading && <p className="mt-2">Uploading...</p>}
         {files.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
               {files.map((file, index) => (
                  <div key={index} className="relative group min-w-52 w-full">
                     <img
                        src={file.url}
                        alt={file.name}
                        className="w-full h-32 object-cover rounded"
                     />
                     <button
                        onClick={() => removeFile(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                     >
                        <X size={16} />
                     </button>
                     <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-1 text-xs">
                        <p className="truncate">{file.name}</p>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default Upload;
