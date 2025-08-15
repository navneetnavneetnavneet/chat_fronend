import React, { useContext, useRef, useState } from "react";
import axios from "../../utils/axios";
import { socketContext } from "../../context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../store/reducers/messageSlice";

const MessageInput = () => {
  const dispatch = useDispatch();

  const mediaRef = useRef();

  const [messageInput, setMessageInput] = useState("");
  const [media, setMedia] = useState("");

  const { selectedChat } = useSelector((state) => state.chatReducer);
  const { messages } = useSelector((state) => state.messageReducer);

  const { socket } = useContext(socketContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!selectedChat || (!messageInput && !media)) {
      return;
    }

    try {
      const { data, status } = await axios.post(
        "/messages/send-message",
        {
          chatId: selectedChat._id,
          content: messageInput,
          media: media,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data && status === 201) {
        socket && socket.emit("new-message", data);
        await dispatch(setMessages([...messages, data]));
      }
    } catch (error) {
      console.log(error?.response?.data);
    }

    setMessageInput("");
    setMedia("");
  };

  return (
    <div className="w-full h-[10vh] px-2 md:px-4 flex items-center absolute bottom-0 left-0">
      <form onSubmit={submitHandler} className="w-full flex items-center gap-1">
        <div className="w-full flex items-center bg-white rounded-full px-4">
          <input
            onChange={(e) => setMedia(e.target.files[0])}
            ref={mediaRef}
            type="file"
            hidden={true}
          />
          <input
            onChange={(e) => setMessageInput(e.target.value)}
            value={messageInput}
            type="text"
            placeholder="message . . ."
            className="w-full py-3 bg-transparent border-none outline-0 text-lg font-medium tracking-tighter"
          />
          <i
            onClick={() => mediaRef.current.click()}
            className="ri-attachment-line cursor-pointer text-[1.5rem] font-medium"
          ></i>
        </div>
        <button className="px-4 py-3 flex-shrink-0 rounded-full bg-zinc-50 cursor-pointer">
          <i className="ri-send-plane-2-fill"></i>
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
