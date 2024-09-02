import React from "react";
import Hero from "../components/Hero";
import LogosSection from "../components/LogosSection";
import Newsletter from "../components/Newsletter";

const Home = () => {
   return (
      <div className="p-10 mx-auto">
         <Hero />
         <LogosSection />
         <Newsletter />
      </div>
   );
};

export default Home;
