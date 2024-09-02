import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash } from "lucide-react";
import { toast } from "react-toastify";

const truncateText = (text, maxLength) => {
   if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
   }
   return text;
};

const ProjectCard = ({
   thumbnails,
   projectTitle,
   description,
   category,
   titleMaxLength = 50,
   descriptionMaxLength = 150,
   projectSlug,
   _id,
   handleDelete,
}) => {
   return (
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-sm w-full">
         <div className="h-48 overflow-hidden">
            <Link to={"../project/" + projectSlug}>
               <img
                  src={thumbnails[0].imageUrl}
                  alt={projectTitle}
                  title="View Project"
                  className="w-full h-full object-cover"
               />
            </Link>
         </div>
         <div className="p-6 space-y-4 flex flex-col items-start justify-start group">
            <div className="flex items-center justify-between w-full">
               <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full">
                  {category}
               </span>
               <button
                  onClick={() => handleDelete(_id)}
                  className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
               >
                  <Trash className="text-red-500 h-5 w-5" />
               </button>
            </div>

            <Link to={`../project/${projectSlug}`} className="block">
               <h2 className="text-xl font-bold text-white leading-tight hover:text-blue-400 transition-colors">
                  {truncateText(projectTitle, titleMaxLength)}
               </h2>
            </Link>
            <p className="text-gray-300 text-sm line-clamp-3">
               {truncateText(description, descriptionMaxLength)}
            </p>
         </div>
      </div>
   );
};

export default ProjectCard;
