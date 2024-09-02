import React, { useState, useEffect } from "react";
import { ThumbsUp, Eye, Calendar, User } from "lucide-react";
import { useParams } from "react-router-dom";
import ProjectPageSkelton from "./ProjectPageSkelton";

const ProjectPage = () => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);
   const { projectSlug } = useParams();

   useEffect(() => {
      fetch(`/api/v1/project`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ projectSlug: projectSlug }),
      })
         .then((response) => response.json())
         .then((data) => {
            setData(data);
            setLoading(false);
         });
   }, [projectSlug]);

   if (loading) {
      return <ProjectPageSkelton />;
   }

   const { projectTitle, description, thumbnails, votes, projectViews, createdAt } = data;
   const name = data.createdBy.name;

   console.log(data);

   return (
      <div className="text-gray-900">
         <div className="bg-gradient-to-r from-button-dark-bg bg-opacity-10 to-dark-bg-variant text-white p-10 rounded-lg mb-12 shadow-md">
            <h1 className="text-4xl font-extrabold mb-4">{projectTitle}</h1>
            <p className="text-lg mb-6">{description}</p>
            <div className="flex gap-6">
               <div className="flex items-center gap-1">
                  <User />
                  <span>{name}</span>
               </div>
               <div className="flex items-center gap-1">
                  <Calendar />
                  <span>
                     {new Intl.DateTimeFormat("en-PK", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                     }).format(new Date(createdAt))}
                  </span>
               </div>
               <div className="flex items-center gap-1">
                  <Eye />
                  <span>{projectViews}</span>
               </div>
               <div className="flex items-center gap-1">
                  <ThumbsUp />
                  <span>{votes.length}</span>
               </div>
            </div>
         </div>
         <div>
            <div>
               <h2 className="text-3xl mb-4 text-button-dark-bg">
                  Thumbnails ( {thumbnails.length} )
               </h2>
            </div>
            <div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {thumbnails.map((thumbnail) => (
                     <div
                        key={thumbnail._id}
                        className="bg-gray-700 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl flex flex-col"
                     >
                        <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                           <img
                              src={thumbnail.imageUrl}
                              className="w-full h-full object-cover"
                              alt={`Thumbnail ${thumbnail._id}`}
                           />
                        </div>
                        <div className="p-4 mt-auto">
                           <p className="flex items-center gap-2 text-green-400">
                              <ThumbsUp size={20} />
                              {thumbnail.votes.length}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProjectPage;
