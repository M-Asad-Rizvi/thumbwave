import { createContext, useState, useContext, useEffect } from "react";

// Create a context with a default value as an empty object
export const UserContext = createContext({});

// Export provider component
export const UserProvider = ({ children }) => {
   const [user, setUser] = useState({});
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   const handlePageView = async () => {
      try {
         const response = await fetch("http://localhost:3000/api/v1/user", {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
            },
            credentials: "include",
         });

         const data = await response.json();

         if (response.ok) {
            return { data, isLoggedIn: true };
         } else {
            // If response is not ok, handle the error
            console.log("Error fetching user data:", data);
            return { data: {}, isLoggedIn: false };
         }
      } catch (error) {
         console.log("Fetch error:", error);
         return { data: {}, isLoggedIn: false };
      }
   };

   useEffect(() => {
      const fetchUserData = async () => {
         const userData = await handlePageView();
         setUser(userData.data);
         setIsLoggedIn(userData.isLoggedIn);
      };

      fetchUserData();
   }, []);

   return (
      <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
         {children}
      </UserContext.Provider>
   );
};

// Export hook to use the UserContext
export const useUser = () => useContext(UserContext);
