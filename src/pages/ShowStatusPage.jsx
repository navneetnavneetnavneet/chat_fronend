import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { asyncDeleteStatus } from "../store/actions/statusActions";

const ShowStatusPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(30);

  const { userId } = useParams();

  const { user, allUser } = useSelector((state) => state.userReducer);
  const statusUser = allUser && allUser.find((u) => u._id === userId);

  useEffect(() => {
    let interval;
    if (statusUser.status.length > 0) {
      interval = setInterval(() => {
        setProgress((prev) => prev + 1);
      }, 30);

      if (progress >= 100) {
        setProgress(0);

        if (currentIndex < statusUser.status.length - 1) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          navigate("/");
        }
      }

      return () => clearInterval(interval);
    } else {
      navigate("/");
    }
  }, [currentIndex, progress, statusUser]);

  const previousStatusHandler = () => {
    setProgress(0);
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    } else {
      navigate("/");
    }
  };

  const nextStatusHandler = () => {
    setProgress(0);
    if (currentIndex < statusUser.status.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      navigate("/");
    }
  };

  return statusUser && user ? (
    <div className="relative w-full h-screen bg-zinc-200">
      <div
        style={{
          background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4))`,
        }}
        className="absolute top-0 left-0 z-[999] w-full h-[10vh] flex items-center justify-between px-2 md:px-4 text-white"
      >
        <div className="flex items-center gap-2 md:gap-3">
          <i
            onClick={() => navigate("/")}
            className="ri-arrow-left-line text-[1.5rem] cursor-pointer"
          ></i>
          <div className="relative w-14 md:w-16 h-14 md:h-16">
            <img
              className="w-full h-full object-cover overflow-hidden rounded-full border"
              src={statusUser.profileImage.url}
              alt=""
            />
            {statusUser._id === user?._id && (
              <Link
                to="/status/upload"
                className="w-[1.6rem] h-[1.6rem] absolute z-[100] bottom-1 right-0 translate-x-1/4 translate-y-1/4 flex items-center justify-center rounded-full bg-zinc-200  border-2 border-zinc-600 "
              >
                <i className="ri-add-line text-[1.2rem] text-black"></i>
              </Link>
            )}
          </div>
          <h1 className="text-[1.25rem] md:text-[1.5rem] font-semibold tracking-tighter">
            {statusUser.fullName}
          </h1>
        </div>
        {statusUser._id === user?._id && (
          <i
            onClick={async () =>
              await dispatch(
                asyncDeleteStatus(statusUser?.status[currentIndex]?._id)
              )
            }
            className="ri-delete-bin-line z-[2000] text-[1.25rem] cursor-pointer"
          ></i>
        )}

        <div className="absolute top-[100%] left-0 w-full h-[4px] z-[999] bg-zinc-400 overflow-hidden">
          <div
            style={{ width: `${progress}%` }}
            className="h-full rounded-full bg-white"
          ></div>
        </div>
      </div>

      <div className="w-full h-full overflow-hidden">
        {statusUser?.status[currentIndex]?.media.fileType === "image" ? (
          <img
            className="w-full h-full object-cover"
            src={statusUser?.status[currentIndex]?.media.url}
            alt=""
          />
        ) : (
          <video
            className="w-full h-full object-cover"
            autoPlay={true}
            loop={false}
            muted={true}
            src={statusUser?.status[currentIndex]?.media.url}
          ></video>
        )}
      </div>

      <div
        onClick={previousStatusHandler}
        className="w-1/2 h-full absolute top-0 left-0 z-[99]"
      ></div>
      <div
        onClick={nextStatusHandler}
        className="w-1/2 h-full absolute top-0 right-0 z-[99]"
      ></div>

      <div className="absolute bottom-0 w-full flex items-center px-2 md:px-4 py-2 text-white font-medium">
        <form className="w-full flex items-center gap-2">
          <input
            type="text"
            placeholder="message . . ."
            className="w-full px-4 py-2 rounded-full bg-transparent outline-none border-2 border-zinc-400 text-black"
          />
          <button className="px-4 py-3 rounded-full bg-zinc-400 text-zinc-800">
            <i className="ri-send-plane-2-fill"></i>
          </button>
        </form>
      </div>
    </div>
  ) : (
    <LoadingPage />
  );
};

export default ShowStatusPage;
