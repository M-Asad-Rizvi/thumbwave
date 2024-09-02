import React from "react";

const ProjectCardSkeleton = () => (
   <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-sm w-full">
      <div className="h-48 bg-gray-700 animate-pulse"></div>
      <div className="p-6 space-y-4 flex flex-col items-start justify-start">
         <span className="inline-block px-3 py-1 text-sm font-semibold bg-gray-700 rounded-full animate-pulse w-20 h-6"></span>
         <div className="w-3/4 h-6 bg-gray-700 rounded-md animate-pulse"></div>
         <div className="w-full h-4 bg-gray-700 rounded-md animate-pulse"></div>
         <div className="w-full h-4 bg-gray-700 rounded-md animate-pulse"></div>
         <div className="w-5/6 h-4 bg-gray-700 rounded-md animate-pulse"></div>
      </div>
   </div>
);

export default ProjectCardSkeleton;
