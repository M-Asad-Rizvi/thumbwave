import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./pages/Dashboard";
import Upload from "./components/Upload";
import AppHome from "./pages/AppHome";
import AddProject from "./components/AddProject";
import Project from "./components/Project";
import Discover from "./pages/Discover";
import { useUser } from "./context/UserContext";

const AppContent = () => {
   const location = useLocation();
   const [divClasses, setDivClasses] = useState(
      "min-w-screen max-w-screen-2xl min-h-screen text-light-text w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl"
   );

   useEffect(() => {
      if (!location.pathname.startsWith("/app")) {
         setDivClasses(
            "min-w-screen max-w-screen-2xl min-h-screen text-light-text w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto p-5"
         );
      } else {
         setDivClasses(
            "min-w-screen max-w-screen-2xl min-h-screen text-light-text w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl"
         );
      }
   }, [location]);

   return (
      <div className={divClasses}>
         <NavBar />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/app" element={<AppHome />}>
               <Route path="dashboard" element={<Dashboard />} />
               <Route path="project/:projectSlug" element={<Project />} />
               <Route path="project/new" element={<AddProject />} />
               <Route path="discover" element={<Discover />} />
            </Route>
            <Route path="*" element={<Home />} />
         </Routes>
      </div>
   );
};

const App = () => {
   const { isLoggedIn, setIsLoggedIn } = useUser();

   const handleGoogleSignUp = async (decodedUser) => {
      try {
         const response = await fetch("/api/v1/user/google", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(decodedUser),
         });

         if (response.ok) {
            const res = await response.json();
            console.log(res);

            toast.success("Login successful");
            setIsLoggedIn(true);
            navigate("/app/dashboard");
         }
      } catch (error) {
         setIsLoggedIn(false);
         toast.error(error);
      }
   };

   if (!isLoggedIn) {
      useGoogleOneTapLogin({
         onSuccess: (response) => {
            const decoded = jwtDecode(response.credential);
            handleGoogleSignUp(decoded);
         },
         onError: (error) => {
            console.log(error);
         },
      });
   }

   return (
      <Router>
         <ToastContainer />
         <AppContent />
      </Router>
   );
};

export default App;
