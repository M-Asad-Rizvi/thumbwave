import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";

const NavBar = () => {
   const { user, isLoggedIn } = useUser();
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const menuRef = useRef(null);

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
         }
      };

      const handleResize = () => {
         if (window.innerWidth >= 768) {
            // md breakpoint
            setIsMenuOpen(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("resize", handleResize);

      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
         window.removeEventListener("resize", handleResize);
      };
   }, []);

   const location = useLocation();
   if (
      location.pathname === "/login" ||
      location.pathname === "/signup" ||
      location.pathname.startsWith("/app")
   )
      return null;

   return (
      <header className="px-5 text-light-text mx-auto">
         <div className="flex justify-between items-center ">
            <div>
               <h2 className="sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-heading-text tracking-tight __logo">
                  <Link to="/">
                     Thumb<span className="text-button-bg __logo">Wave👋</span>
                  </Link>
               </h2>
            </div>

            <nav className="relative" ref={menuRef}>
               <div
                  className="md:hidden cursor-pointer"
                  onClick={toggleMenu}
                  aria-label="Toggle menu"
               >
                  {isMenuOpen ? (
                     <X className="text-lightish-text" size={24} />
                  ) : (
                     <Menu className="text-lightish-text" size={24} />
                  )}
               </div>

               <ul
                  className={`md:flex items-center gap-3 ${
                     isMenuOpen
                        ? "block absolute right-0 top-10 bg-dark-bg-variant shadow-lg rounded-md p-4"
                        : "hidden"
                  } md:relative md:bg-transparent md:shadow-none md:p-0`}
               >
                  <div className={`flex flex-col md:flex-row gap-3`}>
                     {["Home", "Features", "About", "Contact"].map((item) => (
                        <li
                           key={item}
                           className="font-medium hover:text-button-bg cursor-pointer duration-300"
                        >
                           {item}
                        </li>
                     ))}
                  </div>
                  {isLoggedIn === false ? (
                     <div className={`flex flex-col md:flex-row gap-3 mt-4 md:mt-0`}>
                        <Link to="/login">
                           <button className="border border-button-dark-bg px-6 py-2 rounded-md shadow-lg text-button-bg hover:bg-button-bg hover:text-white transition-all duration-300">
                              Sign In
                           </button>
                        </Link>
                        <Link to="/signup">
                           <button className="bg-button-bg px-6 py-2 rounded-md shadow-lg text-white hover:bg-button-dark-bg transition-all duration-300">
                              Get Started
                           </button>
                        </Link>
                     </div>
                  ) : (
                     <div className={`flex flex-col md:flex-row gap-3 mt-4 md:mt-0`}>
                        <Link to="/app/dashboard">
                           <button className="border border-button-dark-bg px-6 py-2 rounded-md shadow-lg text-button-bg hover:bg-button-bg hover:text-white transition-all duration-300">
                              Dashboard
                           </button>
                        </Link>
                     </div>
                  )}
               </ul>
            </nav>
         </div>
         <hr className="my-3 bg-light-border opacity-30" />
      </header>
   );
};

export default NavBar;
