import React from "react";
import chatlogo from "/public/chatlogo.png";

const LoadingPage = () => {
  return (
    <div className="w-full h-screen bg-zinc-200 flex items-center justify-center">
      <img className="w-40" src={chatlogo} alt="" />
    </div>
  );
};

export default LoadingPage;
