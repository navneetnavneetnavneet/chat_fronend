import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { setOnlineUsers } from "../store/reducers/userSlice";

export const socketContext = createContext(null);

export const SocketContextProvide = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);

  const [socket, setSocket] = useState(null); // Start with null for clarity

  useEffect(() => {
    if (!user) {
      if (socket) {
        socket.disconnect(); // Disconnect socket if the user logs out
        setSocket(null); // Clear the socket instance
      }
      return;
    }

    // Initialize the socket connection
    const newSocket = io(import.meta.env.VITE_API_URL);
    setSocket(newSocket);

    // Setup the socket for the current user
    newSocket.emit("setup", user);

    newSocket.on("connected", () => {
      // console.log("Socket is Connected !");
    });

    newSocket.on("getOnlineUsers", async (onlineUsers) => {
      await dispatch(setOnlineUsers(onlineUsers));
    });

    // Cleanup on component unmount or user change
    return () => {
      if (newSocket) {
        newSocket.disconnect();
        // console.log("Socket disconnected!");
      }
    };
  }, [user]);

  return (
    <socketContext.Provider value={{ socket, setSocket }}>
      {children}
    </socketContext.Provider>
  );
};
