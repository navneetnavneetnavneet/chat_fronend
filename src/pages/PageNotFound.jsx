import React from "react";
import notFoundImage from "/public/404-error.jpg";

const PageNotFound = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <img
        className="w-full md:w-1/3 object-cover"
        src={notFoundImage}
        alt=""
      />
    </div>
  );
};

export default PageNotFound;
