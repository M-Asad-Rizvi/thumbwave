import React from "react";

const DiscoverCardSkelton = () => {
   return (
      <div className="w-full mx-auto animate-pulse" title="Loading...">
         <div className="bg-gray-800 rounded-xl shadow-2xl p-8">
            <div className="mb-8">
               <div className="h-10 bg-gray-700 rounded w-3/4 mb-4"></div>
               <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
               <div className="h-4 bg-gray-700 rounded w-5/6 mb-6"></div>
               <div className="flex flex-wrap gap-6">
                  {[1, 2, 3, 4].map((item) => (
                     <div key={item} className="h-6 bg-gray-700 rounded w-24"></div>
                  ))}
               </div>
            </div>
            <div className="flex flex-wrap gap-10">
               {[1, 2, 3, 4].map((item) => (
                  <div
                     key={item}
                     className="bg-gray-700 rounded-lg overflow-hidden shadow-lg flex flex-col w-72 h-80"
                  >
                     <div className="h-48 bg-gray-600 w-full"></div>
                     <div className="p-4 mt-auto">
                        <div className="h-6 bg-gray-600 rounded w-24"></div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default DiscoverCardSkelton;
