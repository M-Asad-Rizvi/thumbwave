import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Sidebar = () => {
   const { isLoggedIn, setIsLoggedIn } = useUser();

   const navigate = useNavigate();
   const handleLogout = async () => {
      try {
         const res = await fetch("http://localhost:3000/api/v1/user/logout", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            credentials: "include",
         });

         const data = await res.json();

         console.log(data);

         if (res.ok) {
            setIsLoggedIn(false);
            navigate("/");
         }

         if (!res.status === 200) {
            const error = new Error(res.error);
            throw error;
         }

         localStorage.clear();
      } catch (err) {
         console.log(err);
      }
   };
   return (
      <div className="__sidebar bg-dark-bg-variant h-screen w-[300px] p-10 flex justify-between flex-col items-start text-start shadow-xl hover:shadow-2xl transition-all duration-300">
         <ul className="flex flex-col gap-3 items-start">
            <li className="hover:text-button-bg duration-200 transition-all">
               <Link to="discover">Discover</Link>
            </li>
            <li className="hover:text-button-bg duration-200 transition-all">
               <Link to="./dashboard">All Projects</Link>
            </li>
            <li className="hover:text-button-bg duration-200 transition-all">
               <Link to="project/new">Add Project</Link>
            </li>
         </ul>
         <ul className="flex flex-col gap-3 items-start">
            <li>
               <Link to="/setting">Setting</Link>
            </li>
            <li>
               <Link className="text-red-500" onClick={handleLogout}>
                  Logout
               </Link>
            </li>
         </ul>
      </div>
   );
};

export default Sidebar;
