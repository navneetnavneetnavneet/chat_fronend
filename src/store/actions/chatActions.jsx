import axios from "../../utils/axios";
import { setSelectedChat, setChats } from "../reducers/chatSlice";

export const asyncFetchAllChats = () => async (dispatch, getState) => {
  try {
    const { data, status } = await axios.get("/chats/");

    if (data && status === 200) {
      await dispatch(setChats(data));
    }
  } catch (error) {
    console.log(error?.response?.data);
  }
};

export const asyncAccessChat = (userId) => async (dispatch, getState) => {
  try {
    const { data, status } = await axios.post("/chats/", { userId });

    if (data && (status === 201 || status === 200)) {
      await dispatch(setSelectedChat(data));
      await dispatch(asyncFetchAllChats());

      return { chatId: data._id };
    }
  } catch (error) {
    console.log(error?.response?.data);
  }
};

export const asyncCreateGroup =
  ({ chatName, users }) =>
  async (dispatch, getState) => {
    try {
      const { data, status } = await axios.post("/chats/create-group", {
        chatName,
        users,
      });

      if (data && status === 201) {
        await dispatch(asyncFetchAllChats());
      }
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

export const asyncRenameGroup =
  (chatId, chatName) => async (dispatch, getState) => {
    try {
      const { data, status } = await axios.post("/chats/rename-group", {
        chatName,
        chatId,
      });

      if (data && status === 200) {
        await dispatch(setSelectedChat(data));
      }
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

export const asyncAddUserToGroup =
  (chatId, userId) => async (dispatch, getState) => {
    try {
      const { data, status } = await axios.post("/chats/add-user-group", {
        chatId,
        userId,
      });

      if (data && status === 200) {
        await dispatch(setSelectedChat(data));
      }
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

export const asyncRemoveUserfromGroup =
  (chatId, userId) => async (dispatch, getState) => {
    try {
      const { data, status } = await axios.post("/chats/remove-user-group", {
        chatId,
        userId,
      });

      if (data && status === 200) {
        await dispatch(setSelectedChat(data));
      }
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

export const asyncExitUserFromGroup =
  (chatId) => async (dispatch, getState) => {
    try {
      const { data, status } = await axios.post("/chats/exit-user-group", {
        chatId,
      });

      if (data && status === 200) {
        await dispatch(setSelectedChat(null));
        await dispatch(asyncFetchAllChats());
      }
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
