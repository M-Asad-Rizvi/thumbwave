import React from "react";

const LogosSection = () => {
  return (
    <div className="h-20 p-10 flex items-center justify-center mt-40 flex-col gap-10">
      <p className="text-center text-lightish-text text-sm">
        160,000+ customers in over 120 countries grow their businesses with
        Neuros
      </p>
      <img src="/Logos.svg" className="max-w-5xl min-w-96 w-full" />
    </div>
  );
};

export default LogosSection;
