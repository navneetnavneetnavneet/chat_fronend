import React from "react";
import { useDispatch } from "react-redux";
import { asyncAccessChat } from "../../store/actions/chatActions";
import { useNavigate } from "react-router-dom";

const User = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    user && (
      <div
        onClick={async () => {
          const data = await dispatch(asyncAccessChat(user._id));
          await navigate(`/chat/${data.chatId}`);
        }}
        className="w-full h-[10vh] px-2 md:px-4 flex items-center gap-2 md:gap-3 cursor-pointer border-b border-zinc-400"
      >
        <div className="w-14 md:w-16 h-14 md:h-16 rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={user.profileImage.url}
            alt=""
          />
        </div>
        <h1 className="text-[1.25rem] md:text-[1.5rem] font-semibold tracking-tighter">
          {user.fullName}
        </h1>
      </div>
    )
  );
};

export default User;
