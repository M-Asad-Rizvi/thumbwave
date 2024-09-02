import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { toast } from "react-toastify";
import DiscoverThumbnailCard from "../components/DiscoverThumbnailCard";
import DiscoverCardSkelton from "../components/DiscoverCardSkelton";

const Discover = () => {
   const [search, setSearch] = useState("");
   const [searchResults, setSearchResults] = useState([]);
   const [effect, setEffect] = useState("");
   const [isVoted, setIsVoted] = useState([{}]);
   const [votes, setVotes] = useState([{}]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      if (search == "") {
         const res = fetch("/api/v1/project/all", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
         })
            .then((res) => res.json())
            .then((res) => {
               setSearchResults(res);
               setLoading(false);
               console.log(res);
            });
      }
   }, [search]);

   useEffect(() => {
      console.log(search);

      if (search.length > 2) {
         setLoading(true);
         fetch("/api/v1/project/discover-find", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               q: search,
            }),
         })
            .then((res) => res.json())
            .then((res) => {
               setLoading(true);
               setSearchResults(res.projects);
               console.log(res.projects);
            });
      }
   }, [search]);

   const handleVote = async (projectId, thumbnailId) => {
      try {
         const res = await fetch("/api/v1/vote/vote", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               projectId,
               thumbnailId,
            }),
         });
         const data = await res.json();

         if (!res.ok) {
            toast.error(data.message);
         } else {
            console.log(data);
            toast.success(data.message);
         }
      } catch (error) {
         toast.error(error.message);
         console.log(error);
      }
   };

   return (
      <div>
         <div>
            <h1 className="text-3xl font-bold text-heading-text">Discover</h1>
            <p>
               Awesome <b className="text-heading-text">Thumbnails</b> by Awesome{" "}
               <b className="text-heading-text">Creators</b>
            </p>
         </div>
         <div className="mt-10">
            <div className="flex items-center border-light-border border px-3">
               <Search />
               <input
                  type="text"
                  className="w-full p-3 border-none bg-transparent outline-none px-4"
                  placeholder="Search..."
                  spellCheck="false"
                  autoComplete="off"
                  name="search"
                  id="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
               />
            </div>
            <div className="flex gap-4 mt-4" title="Coming Soon...">
               <button onClick={() => setEffect("trending")}>Trending</button>
               <button onClick={() => setEffect("recent")}>Recent</button>
               <button onClick={() => setEffect("following")}>Following</button>
            </div>
         </div>
         <div className="flex justify-between gap-10 mt-20 ">
            <div className="grid grid-cols-1 gap-10 w-full">
               {loading && <DiscoverCardSkelton />}
               {loading && <DiscoverCardSkelton />}
               {loading && <DiscoverCardSkelton />}
               {!loading && searchResults.length === 0 && <p>No results found.</p>}

               {searchResults.length > 0 &&
                  !loading &&
                  searchResults
                     .reverse()
                     .map((project) => (
                        <DiscoverThumbnailCard
                           key={project._id}
                           {...project}
                           projectData={project}
                           handleVote={handleVote}
                           {...isVoted}
                           {...setIsVoted}
                        />
                     ))
                     .reverse()}
            </div>
            {/* sidebar component */}
            {/* <div className="min-w-[200px] max-w-[350px] w-full max-h-[600px] bg-gray-800 rounded-lg shadow-lg p-6">
               <h2 className="text-2xl font-bold text-white mb-4">Sidebar</h2>
            </div> */}
         </div>
      </div>
   );
};

export default Discover;
