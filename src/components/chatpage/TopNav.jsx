import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  const navigate = useNavigate();

  const { user, onlineUsers } = useSelector((state) => state.userReducer);

  const { selectedChat } = useSelector((state) => state.chatReducer);

  const oppositeUser =
    selectedChat &&
    selectedChat.isGroupChat === false &&
    selectedChat.users.find((u) => u._id !== user?._id);

  const isOppositeUserOnline =
    oppositeUser && onlineUsers.includes(oppositeUser._id);

  return (
    selectedChat && (
      <div className="w-full h-[10vh] px-2 md:px-4 text-white  border-b border-zinc-400 flex items-center justify-between cursor-pointer">
        <div className="flex items-center gap-2 md:gap-3">
          <i
            onClick={() => navigate("/")}
            className="ri-arrow-left-line text-[1.5rem] cursor-pointer"
          ></i>
          <div className="w-14 md:w-16 h-14 md:h-16 rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={
                selectedChat.isGroupChat
                  ? selectedChat.groupImage.url
                  : oppositeUser?.profileImage?.url
              }
              alt=""
            />
          </div>
          <div className="">
            <h1 className="text-[1.25rem] md:text-[1.5rem] font-semibold tracking-tighter leading-2 md:leading-3">
              {selectedChat.isGroupChat
                ? selectedChat.chatName
                : oppositeUser?.fullName}
            </h1>
            {!selectedChat.isGroupChat && (
              <small
                className={`${
                  isOppositeUserOnline ? "text-green-600" : "text-gray-600"
                } text-sm md:text-base font-medium leading-0`}
              >
                {isOppositeUserOnline ? "online" : "offline"}
              </small>
            )}
          </div>
        </div>
        <div className="flex items-center gap-x-3 md:gap-x-5">
          {selectedChat.isGroupChat && (
            <i
              onClick={() =>
                navigate(`/chat/${selectedChat._id}/group-details`)
              }
              className="ri-edit-box-line text-[1.5rem] cursor-pointer"
            ></i>
          )}
          <i className="ri-phone-line text-[1.5rem] cursor-pointer"></i>
          <i className="ri-live-line text-[1.5rem] cursor-pointer"></i>
          <i
            onClick={() =>
              navigate(`/chat/${selectedChat._id}/chat-information`)
            }
            className="ri-information-line text-[1.5rem] cursor-pointer"
          ></i>
        </div>
      </div>
    )
  );
};

export default TopNav;
