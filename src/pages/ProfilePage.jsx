import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { asyncSignOutUser } from "../store/actions/userActions";
import LoadingPage from "./LoadingPage";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userReducer);

  const [width, setWidth] = useState(0);

  return user ? (
    <div className="relative w-full h-screen bg-zinc-200 overflow-hidden">
      <div className="w-full h-[10vh] px-2 md:px-4 flex items-center justify-between border-b border-zinc-400">
        <i
          onClick={() => navigate("/")}
          className="ri-arrow-left-line text-[1.25rem] cursor-pointer"
        ></i>
        <h1 className="text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] font-semibold tracking-tighter">
          My Profile
        </h1>
        <i
          onClick={() => setWidth(100)}
          className="ri-menu-line text-[1.25rem] cursor-pointer"
        ></i>
      </div>
      <div className="flex flex-col gap-5 items-center pt-10">
        <div className="w-[6rem] md:w-[8rem] h-[6rem] md:h-[8rem] rounded-full overflow-hidden">
          <img className="w-full h-full object-cover" src={user.profileImage.url} alt="" />
        </div>
        <div className="text-center">
          <h1 className="text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] font-semibold tracking-tighter leading-none">
            {user.fullName}
          </h1>
          <h4 className="text-base md:text-lg lg:text-xl font-semibold tracking-tighter opacity-80">
            {user.email}
          </h4>
        </div>
        <div className="flex items-center justify-center gap-5">
          <div
            onClick={() => navigate("/profile/edit")}
            className="px-4 md:px-8 py-2 flex items-center gap-1 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium"
          >
            <i className="ri-pencil-line text-[1.2rem]"></i>
            <span className="text-[1rem]">Edit Profile</span>
          </div>
          <div
            onClick={async () => await dispatch(asyncSignOutUser())}
            className="px-4 md:px-8 py-2 w-fit flex items-center gap-1 rounded-md bg-red-500 hover:bg-red-600 cursor-pointer text-white font-medium"
          >
            <i className="ri-logout-box-line text-[1.2rem]"></i>
            <span className="text-[1rem]">Logout</span>
          </div>
        </div>
      </div>
      <div
        style={{ width: `${width}%` }}
        className="absolute sm:max-w-[30vw] md:max-w-[25vw] top-0 right-0 z-[999] duration-300 h-screen border-l border-zinc-400 bg-zinc-100"
      >
        <div className="h-[10vh] flex items-center justify-between border-b border-zinc-400 px-4">
          <i
            onClick={() => setWidth(0)}
            className="ri-close-line text-xl cursor-pointer"
          ></i>
          <i className="ri-menu-line text-xl cursor-pointer"></i>
        </div>
        <Link
          to="/"
          className="flex items-center gap-2 border-b border-zinc-400 px-4 py-4"
        >
          <i className="ri-home-line text-lg md:text-xl cursor-pointer"></i>
          <p className="text-base md:text-lg font-medium tracking-tighter">
            Home
          </p>
        </Link>
        <Link
          to="/profile"
          className="flex items-center gap-2 border-b border-zinc-400 px-4 py-4"
        >
          <i className="ri-user-line text-lg md:text-xl cursor-pointer"></i>
          <p className="text-base md:text-lg font-medium tracking-tighter">
            Profile
          </p>
        </Link>
        <Link
          to="/profile/edit"
          className="flex items-center gap-2 border-b border-zinc-400 px-4 py-4"
        >
          <i className="ri-pencil-line text-lg md:text-xl cursor-pointer"></i>
          <p className="text-base md:text-lg font-medium tracking-tighter">
            Edit Profile
          </p>
        </Link>
        <Link
          to="/group-create"
          className="flex items-center gap-2 border-b border-zinc-400 px-4 py-4"
        >
          <i className="ri-edit-box-line text-lg md:text-xl cursor-pointer"></i>
          <p className="text-base md:text-lg font-medium tracking-tighter">
            Create Group
          </p>
        </Link>
        <Link
          to="/status/upload"
          className="flex items-center gap-2 border-b border-zinc-400 px-4 py-4"
        >
          <i className="ri-add-box-line text-lg md:text-xl cursor-pointer"></i>
          <p className="text-base md:text-lg font-medium tracking-tighter">
            Upload Status
          </p>
        </Link>
        <div className="flex items-center gap-2 border-b border-zinc-400 px-4 py-4">
          <i className="ri-lock-line text-lg md:text-xl cursor-pointer"></i>
          <p className="text-base md:text-lg font-medium tracking-tighter">
            Privacy & Security
          </p>
        </div>
        <div
          onClick={async () => await dispatch(asyncSignOutUser())}
          className="px-4 py-2 mt-4 ml-4 w-fit flex items-center gap-1 rounded-md bg-red-600 cursor-pointer text-white font-medium"
        >
          <i className="ri-logout-box-line text-[1.2rem]"></i>
          <span className="text-[1rem]">Logout</span>
        </div>
      </div>
    </div>
  ) : (
    <LoadingPage />
  );
};

export default ProfilePage;
