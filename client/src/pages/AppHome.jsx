import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

const AppHome = () => {
   const { isLoggedIn } = useUser();
   return (
      <div className="w-screen">
         <div className="flex justify-start items-start">
            <div>
               <Sidebar />
            </div>
            <div className="p-10 overflow-auto max-h-screen w-full">
               {isLoggedIn ? (
                  <Outlet />
               ) : (
                  <div>
                     <h2 className="text-3xl ">
                        Please Login to continue ~{" "}
                        <Link to="/login" className="text-button-bg">
                           Login
                        </Link>
                     </h2>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default AppHome;
