import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import { UserProvider } from "./context/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <UserProvider>
         <GoogleOAuthProvider clientId="470784354642-l5g4uki1n3d6an61m8lf97aco3aafk5h.apps.googleusercontent.com">
            <App />
         </GoogleOAuthProvider>
      </UserProvider>
   </React.StrictMode>
);
