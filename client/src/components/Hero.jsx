import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
   return (
      <div className="text-center text-heading-text flex flex-col items-center mt-20 gap-10 bg-[url('/Grid.svg')] bg-cover">
         <div className="max-w-60 min-w-56 w-full rounded-full h-10 border border-light-border flex gap-2 items-center px-2 justify-center">
            <img src="/AB-Testing.svg" alt="A/B Testing" />
            <div>
               <h3 className="font-medium text-sm text-light-text">Thumbnail A/B Testing</h3>
            </div>
         </div>
         <div className="flex flex-col gap-4">
            <h2 className="font-bold text-2xl xl:text-5xl lg:text-5xl md:text-4xl tracking-wide">
               Boost Your Video Performance <br /> with{" "}
               <span className="text-button-bg">Smart A/B Testing</span>
            </h2>
            <p className="text-sm text-lightish-text text-center max-w-2xl mx-auto">
               Leverage AI-powered analytics to optimize your video content, boost engagement, and
               drive measurable results. Transform raw data into strategic insights that propel your
               digital presence to new heights.
            </p>
         </div>
         <div className="hidden gap-3 md:hidden lg:flex xl:flex 2xl:flex">
            <Link to="/signup">
               <button className="bg-button-bg px-6 py-2 rounded-md shadow-lg text-white round">
                  Get Started
               </button>
            </Link>
            <Link to="/login">
               <button className="border border-button-dark-bg px-6 py-2 rounded-md shadow-lg text-button-bg">
                  Sign In
               </button>
            </Link>
         </div>
      </div>
   );
};

export default Hero;
