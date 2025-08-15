import React from "react";
import SideNav from "../components/sidenav/SideNav";
import { useSelector } from "react-redux";
import LoadingPage from "./LoadingPage";

const HomePage = () => {
  const { user } = useSelector((state) => state.userReducer);

  return user ? (
    <div className="w-full h-screen flex bg-zinc-200">
      <SideNav />
      <div className="hidden sm:w-[50vw] md:w-[60vw] lg:w-[70vw] sm:flex flex-col items-center justify-center bg-zinc-300">
        <h1 className="text-[2rem] md:text-[2.75rem] lg:text-[3.5rem] font-bold tracking-tighter opacity-80 leading-none">
          Hello, {user.fullName} !
        </h1>
        <h4 className="text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] font-semibold italic opacity-50">
          Let's <span className="text-orange-600 opacity-100">start</span>{" "}
          conversation !
        </h4>
      </div>
    </div>
  ) : (
    <LoadingPage />
  );
};

export default HomePage;
