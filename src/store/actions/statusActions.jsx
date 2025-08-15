import axios from "../../utils/axios";
import { setAllStatus } from "../reducers/statusSlice";
import { asyncLoadUser } from "./userActions";

export const asyncFetchAllStatus = () => async (dispatch, getState) => {
  try {
    const { data, status } = await axios.get("/status/");

    if (data && status === 200) {
      await dispatch(setAllStatus(data));
    }
  } catch (error) {
    console.log(error?.response?.data);
  }
};

export const asyncUploadStatus = (media) => async (dispatch, getState) => {
  try {
    const { data, status } = await axios.post(
      "/status/upload",
      { media },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (data && status === 201) {
      await dispatch(asyncFetchAllStatus());
      await dispatch(asyncLoadUser());
    }
  } catch (error) {
    console.log(error?.response?.data);
  }
};

export const asyncDeleteStatus = (statusId) => async (dispatch, getState) => {
  try {
    const { data, status } = await axios.get(`/status/delete/${statusId}`);
    if (data && status === 200) {
      await dispatch(asyncFetchAllStatus());
      await dispatch(asyncLoadUser());
    }
  } catch (error) {
    console.log(error?.response?.data);
  }
};
