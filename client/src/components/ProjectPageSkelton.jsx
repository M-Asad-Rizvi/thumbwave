import React from "react";

const Skeleton = ({ className }) => (
   <div className={`animate-pulse bg-gray-300 ${className}`}></div>
);

const ProjectPageSkelton = () => {
   return (
      <div className="text-gray-900">
         {/* Project Header */}
         <div className="bg-gradient-to-r from-button-dark-bg bg-opacity-10 to-dark-bg-variant text-white p-10 rounded-lg mb-12 shadow-md">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-full mb-6" />
            <div className="flex gap-6">
               {[...Array(4)].map((_, index) => (
                  <div key={index} className="flex items-center gap-1">
                     <Skeleton className="h-6 w-6 rounded-full" />
                     <Skeleton className="h-6 w-20" />
                  </div>
               ))}
            </div>
         </div>

         {/* Thumbnails Section */}
         <div>
            <h2 className="text-3xl mb-4 text-button-dark-bg">Thumbnails</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {[...Array(6)].map((_, index) => (
                  <div
                     key={index}
                     className="bg-gray-700 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl flex flex-col"
                  >
                     <Skeleton className="aspect-w-16 aspect-h-9" />
                     <div className="p-4 mt-auto">
                        <div className="flex items-center gap-2">
                           <Skeleton className="h-5 w-5 rounded-full" />
                           <Skeleton className="h-5 w-16" />
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default ProjectPageSkelton;
