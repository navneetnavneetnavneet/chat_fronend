import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import chatSlice from "./reducers/chatSlice";
import statusSlice from "./reducers/statusSlice";
import messageSlice from "./reducers/messageSlice";

export const store = configureStore({
  reducer: {
    userReducer: userSlice,
    chatReducer: chatSlice,
    statusReducer: statusSlice,
    messageReducer: messageSlice,
  },
});
