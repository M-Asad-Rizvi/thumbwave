import React from "react";

const Footer = () => {
   return (
      <div>
         <div className="w-full h-full min-h-72 __footer flex items-center flex-col mt-10 bg-dark-bg-variant">
            <div className="__content flex items-start mx-auto">
               <div>
                  <h1 className="text-center text-light-text text-sm">Privacy Policy</h1>
                  <h1 className="text-center text-light-text text-sm">Terms of Service</h1>
                  <h1 className="text-center text-light-text text-sm">Contact Us</h1>
                  <h1 className="text-center text-light-text text-sm">FAQ</h1>
               </div>
               <div className="__quickLinks flex flex-col">
                  <h1 className="text-center text-light-text text-sm">About Us</h1>
                  <h1 className="text-center text-light-text text-sm">Blog</h1>
                  <h1 className="text-center text-light-text text-sm">Careers</h1>
                  <h1 className="text-center text-light-text text-sm">Support</h1>
               </div>
            </div>
            <h1 className="text-center text-light-text text-sm">© 2023 All Rights Reserved</h1>
         </div>
      </div>
   );
};

export default Footer;
