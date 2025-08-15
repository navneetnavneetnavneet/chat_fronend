import axios from "../../utils/axios";
import { setMessages } from "../reducers/messageSlice";

export const asyncFetchAllMessages = (chatId) => async (dispatch, getState) => {
  try {
    const { data, status } = await axios.get(`/messages/${chatId}`);

    if (data && status === 200) {
      await dispatch(setMessages(data));
    }
  } catch (error) {
    console.log(error?.response?.data);
  }
};
