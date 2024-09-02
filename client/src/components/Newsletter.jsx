import React from "react";

const Newsletter = () => {
   return (
      <div className="flex items-center justify-center w-full">
         <div className="__Newsletter bg-dark-bg-variant mt-32 p-10 rounded-md shadow-lg max-w-6xl w-full flex flex-col gap-5 justify-between">
            <div className="flex flex-col w-full">
               <h2 className="font-semibold text-2xl text-button-bg ">
                  Subscribe to Our Newsletter
               </h2>
               <p className="text-sm">
                  Subscribe to our newsletter to stay up-to-date with the latest news and
                  announcements.
               </p>
            </div>
            <div className="w-full flex flex-col justify-end items-end">
               <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  spellCheck="false"
                  autoComplete="off"
                  className="w-full p-3 border border-light-border rounded-full bg-transparent outline-none px-4"
               />
               <button className="bg-button-bg px-6 py-2 rounded-full shadow-lg text-white relative -top-[45px] right-2 hover:bg-button-dark-bg transition-all duration-200">
                  Subscribe
               </button>
            </div>
         </div>
      </div>
   );
};

export default Newsletter;
