import React, { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import ProjectCardSkeleton from "../components/ProjectCardSkeleton";
import { toast } from "react-toastify";

const Dashboard = () => {
   const [projects, setProjects] = useState([]);
   const [loading, setLoading] = useState(true);

   const handleProjects = async () => {
      try {
         const response = await fetch("http://localhost:3000/api/v1/project/find-all", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
         });
         const data = await response.json();
         setProjects(data);
         setLoading(false);
         console.log(data);
      } catch (error) {
         toast.error("An error occurred!");
         console.error(error);
      }
   };

   const handleDelete = async (projectId) => {
      try {
         const confirmation = window.confirm("Are you sure you want to delete this project?");

         if (!confirmation) {
            return;
         }

         // Send a POST request to the server
         const response = await fetch(`/api/v1/project/delete`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: projectId }),
         });
         if (response.ok) {
            setProjects(projects.filter((project) => project._id !== projectId));
            toast.success("Project deleted successfully");
         } else {
            toast.error("Failed to delete project");
         }
      } catch (error) {
         toast.error("An error occurred. Please try again later.");
         console.error(error);
      }
   };

   useEffect(() => {
      handleProjects();
   }, []);
   return (
      <div>
         <div>
            <h2 className="font-bold text-4xl text-button-dark-bg mb-10">Welcome Back!</h2>
         </div>
         {projects.length >= 1 && !loading && (
            <div className="mt-5 flex flex-wrap gap-5 w-full overflow-auto">
               {projects.map((project) => (
                  <ProjectCard key={project._id} {...project} handleDelete={handleDelete} />
               ))}
            </div>
         )}
         {projects.length === 0 && !loading && (
            <p className="mt-5 font-semibold text-2xl">No projects yet</p>
         )}
         {loading && (
            <div className="flex gap-3 items-start">
               <ProjectCardSkeleton />
               <ProjectCardSkeleton />
               <ProjectCardSkeleton />
            </div>
         )}
      </div>
   );
};

export default Dashboard;
