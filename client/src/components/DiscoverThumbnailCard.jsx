import React, { useState } from "react";
import { ThumbsUp, User, EyeIcon, Calendar } from "lucide-react";
import { useUser } from "../context/UserContext";

const DiscoverThumbnailCard = ({
   projectTitle,
   description,
   thumbnails,
   createdBy,
   createdAt,
   views,
   votes,
   handleVote,
   _id,
   projectData,
}) => {
   const { user } = useUser();
   const userId = user?._id;

   function checkVotingStatus(projectData, userId, thumbnail) {
      if (!userId) return { isUserVoted: false, isCreator: false };

      let isCreator = projectData.createdBy._id === userId;
      let isUserVoted =
         projectData.votes.some((vote) => vote.votedBy === userId) ||
         thumbnail.votes.some((vote) => vote.votedBy === userId);

      return { isUserVoted, isCreator };
   }

   return (
      <div className="w-full mx-auto">
         <div className="bg-gray-800 rounded-xl shadow-2xl p-8 transition-all duration-300 hover:shadow-3xl">
            <div className="mb-8">
               <h2 className="text-4xl font-bold text-white mb-4">{projectTitle}</h2>
               <p className="text-gray-300 text-xl leading-relaxed mb-6">{description}</p>
               <div className="flex flex-wrap gap-6 items-center text-gray-400">
                  <p className="flex items-center gap-2">
                     <User className="text-blue-400" />
                     <span className="font-medium">{createdBy.name}</span>
                  </p>
                  <p className="flex items-center gap-2">
                     <Calendar className="text-green-400" />
                     <span>{new Date(createdAt).toLocaleDateString()}</span>
                  </p>
                  <p className="flex items-center gap-2">
                     <ThumbsUp className="text-red-400" />
                     <span>{votes.length}</span>
                  </p>
               </div>
            </div>
            <div className="flex items-start justify-start flex-wrap gap-10">
               {Array.isArray(thumbnails) &&
                  thumbnails.map((thumbnail) => {
                     const { isUserVoted, isCreator } = checkVotingStatus(
                        projectData,
                        userId,
                        thumbnail
                     );
                     return (
                        <div
                           key={thumbnail._id}
                           className="bg-gray-700 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl flex flex-col"
                        >
                           <div className="max-w-[19.5rem] max-h-[20rem] w-full h-full overflow-hidden">
                              <img
                                 src={thumbnail.imageUrl}
                                 alt={`Thumbnail ${thumbnail._id}`}
                                 className="w-full h-full object-cover"
                              />
                           </div>
                           <div className="p-4 mt-auto">
                              <button
                                 onClick={() => handleVote(_id, thumbnail._id)}
                                 disabled={isUserVoted || isCreator}
                                 title={
                                    isUserVoted
                                       ? "Already voted"
                                       : isCreator
                                       ? "You are the creator"
                                       : null
                                 }
                                 className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                 <ThumbsUp size={20} />
                                 <span className="font-semibold">
                                    {thumbnail.votes.length} votes
                                 </span>
                              </button>
                           </div>
                        </div>
                     );
                  })}
            </div>
         </div>
      </div>
   );
};

export default DiscoverThumbnailCard;
