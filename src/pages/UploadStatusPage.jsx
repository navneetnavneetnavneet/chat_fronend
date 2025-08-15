import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { asyncUploadStatus } from "../store/actions/statusActions";
import LoadingPage from "./LoadingPage";

const UploadStatusPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mediaRef = useRef();

  const [media, setMedia] = useState("");

  const { user } = useSelector((state) => state.userReducer);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!media) {
      return toast.warning("Media file is required !");
    }

    await dispatch(asyncUploadStatus(media));
    navigate("/");
    setMedia("");
  };

  return user ? (
    <div className="w-full h-screen bg-zinc-200">
      <div className="w-full h-[10vh] px-2 md:px-4 flex items-center justify-between border-b border-zinc-400">
        <i
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line text-[1.25rem] cursor-pointer"
        ></i>
        <h1 className="text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] font-semibold tracking-tighter">
          Upload Status
        </h1>
        <i className="ri-menu-line text-[1.25rem] cursor-pointer"></i>
      </div>
      <div className="flex flex-col items-center px-4 py-4 mt-5 gap-5">
        <div
          onClick={() => mediaRef.current?.click()}
          className="w-[6rem] h-[6rem] md:w-[8rem] md:h-[8rem] rounded-full flex items-center justify-center border border-zinc-400"
        >
          <i className="ri-image-line text-[4rem]"></i>
        </div>
      </div>
      <form
        onSubmit={submitHandler}
        className="w-full md:w-[50vw] lg:w-[30vw] mx-auto px-4 py-4 flex items-center justify-center flex-col"
      >
        <input
          type="file"
          hidden={true}
          ref={mediaRef}
          accept="image/*, video/*"
          onChange={(e) => setMedia(e.target.files[0])}
        />
        <button className="px-4 py-2 w-full rounded-md outline-none bg-blue-500 hover:bg-blue-600 text-white text-base font-medium cursor-pointer">
          Upload Status
        </button>
      </form>
    </div>
  ) : (
    <LoadingPage />
  );
};

export default UploadStatusPage;
