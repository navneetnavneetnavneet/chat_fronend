import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Status = ({ user }) => {
  const navigate = useNavigate();

  const loggedInUser = useSelector((state) => state.userReducer);

  return (
    user && (
      <div className="relative w-14 md:w-16 h-14 md:h-16 flex-shrink-0 rounded-full p-[2px] border-2 border-zinc-400 cursor-pointer">
        <img
          onClick={() => navigate(`/status/${user._id}`)}
          className="w-full h-full rounded-full overflow-hidden object-cover"
          src={user.profileImage.url}
          alt=""
        />
        {loggedInUser && loggedInUser?.user?._id === user._id ? (
          <Link
            to="/status/upload"
            className="w-[1.5rem] h-[1.5rem] absolute z-[100] bottom-0 md:bottom-1 right-0 translate-x-1/4 translate-y-1/4 flex items-center justify-center rounded-full bg-zinc-200  border-2 border-zinc-600 cursor-pointer"
          >
            <i className="ri-add-line text-[1.2rem]"></i>
          </Link>
        ) : (
          ""
        )}
      </div>
    )
  );
};

export default Status;
