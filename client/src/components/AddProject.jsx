import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Upload from "./Upload";

const AddProject = () => {
   const [thumbnails, setThumbnails] = useState([]);
   const [data, setData] = useState({
      title: "",
      description: "",
      category: "",
   });
   const [filteredCategories, setFilteredCategories] = useState([]);
   const [showDropdown, setShowDropdown] = useState(false);
   const dropdownRef = useRef(null);

   const handleUploadThumbnails = (response) => {
      if (response && response.files) {
         setThumbnails((prev) => [...prev, ...response.files]);
         console.log(thumbnails);
      } else {
         console.error("Invalid response format:", response);
      }
   };
   const navigate = useNavigate();

   const handleCreateProject = async () => {
      try {
         setData({ ...data, thumbnails: thumbnails });
         console.log(data);

         const response = await fetch("http://localhost:3000/api/v1/project/create", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               projectTitle: data.title,
               description: data.description,
               category: data.category,
               thumbnails: thumbnails,
            }),
         });
         const res = await response.json();
         if (response.ok) {
            const { projectSlug } = res.data;
            navigate(`/app/project/${projectSlug}`);

            toast.success(res.message);
         } else {
            toast.error(res.message);
         }
      } catch (error) {
         console.log(error);
      }
   };
   const categories = [
      "animation",
      "art",
      "beauty",
      "business",
      "comedy",
      "cooking",
      "documentary",
      "education",
      "entertainment",
      "fashion",
      "fitness",
      "food",
      "gaming",
      "health",
      "how-to",
      "lifestyle",
      "marketing",
      "music",
      "news",
      "podcast",
      "product reviews",
      "science",
      "sports",
      "technology",
      "travel",
      "vlog",
      "wildlife",
      "other",
   ];

   const handleCategoryChange = (e) => {
      const value = e.target.value;
      setData({ ...data, category: value });
      if (value) {
         const filtered = categories.filter((cat) =>
            cat.toLowerCase().includes(value.toLowerCase())
         );
         setFilteredCategories(filtered.length > 0 ? filtered : ["other"]);
      } else {
         setFilteredCategories(categories);
      }
      setShowDropdown(true);
   };

   const handleCategorySelect = (category) => {
      setData({ ...data, category });
      setShowDropdown(false);
   };

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   return (
      <div>
         <div className="flex flex-col items-start w-full h-full gap-5">
            <h1 className="text-3xl">Add Project</h1>
            <div className="w-full flex flex-col gap-2">
               <div className="flex flex-col w-full">
                  <label htmlFor="title">Title</label>
                  <input
                     type="text"
                     name="title"
                     placeholder="Enter title"
                     className="min-w-[600px] p-3 border border-light-border bg-transparent outline-none px-4 focus:border-button-dark-bg"
                     value={data.title}
                     onChange={(e) => setData({ ...data, title: e.target.value })}
                  />
               </div>
               <div className="flex flex-col w-full">
                  <label htmlFor="description">Description</label>
                  <textarea
                     name="description"
                     placeholder="Enter description"
                     className="p-3 border border-light-border bg-transparent outline-none px-4 focus:border-button-dark-bg resize-none"
                     value={data.description}
                     onChange={(e) => setData({ ...data, description: e.target.value })}
                  >
                     {data.description}
                  </textarea>
               </div>
               <div className="relative" ref={dropdownRef}>
                  <label htmlFor="category" className="block text-sm font-medium mb-1">
                     Category
                  </label>
                  <input
                     type="text"
                     id="category"
                     name="category"
                     value={data.category}
                     onChange={handleCategoryChange}
                     onFocus={() => setShowDropdown(true)}
                     className="min-w-[600px] p-3 border border-light-border bg-transparent outline-none px-4 focus:border-button-dark-bg"
                     placeholder="Enter or select category"
                  />
                  {showDropdown && (
                     <div className="absolute z-10 w-full mt-1 bg-button-dark-bg  border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {filteredCategories.map((cat) => (
                           <div
                              key={cat}
                              className="px-4 py-2 cursor-pointer hover:bg-button-bg hover:text-white"
                              onClick={() => handleCategorySelect(cat)}
                           >
                              {cat}
                           </div>
                        ))}
                     </div>
                  )}
               </div>
               <div className="flex flex-col w-full gap-5 mt-5">
                  <h2 className="text-2xl">Upload Thumbnails</h2>
                  <Upload onUpload={handleUploadThumbnails} />
               </div>
               <div>
                  <button
                     className="bg-button-bg px-6 py-2 shadow-lg text-white mt-10 disabled:opacity-50 disabled:hover:cursor-not-allowed"
                     onClick={handleCreateProject}
                  >
                     Add Project
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AddProject;
