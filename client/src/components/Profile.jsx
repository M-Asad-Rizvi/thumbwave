import React from "react";

const Profile = () => {
   const user = JSON.parse(localStorage.getItem("user"));

   return (
      <div className="profile flex flex-col items-start justify-center p-10">
         <img src={user.picture} className="rounded-full shadow-xl" />
         <span className="text-2xl text-button-dark-bg font-bold">Hi {user.name}!</span>
         <div>
            <p className="text-xl">We are glad to see you!</p>
            <p className="text-xl">
               This page is under <b>construction!</b>
            </p>
         </div>
      </div>
   );
};

export default Profile;
