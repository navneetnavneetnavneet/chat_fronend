import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncEditProfile } from "../store/actions/userActions";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const imageRef = useRef();

  const { user } = useSelector((state) => state.userReducer);

  const [fullName, setFullName] = useState(user && user.fullName);
  const [email, setEmail] = useState(user && user.email);
  const [gender, setGender] = useState(user && user.gender);
  const [dateOfBirth, setDateOfBirth] = useState(user && user.dateOfBirth);
  const [profileImage, setProfileImage] = useState(
    user ? user.profileImage : ""
  );

  const submitHandler = async (e) => {
    e.preventDefault();

    const userDetails = {
      fullName,
      email,
      dateOfBirth,
      gender,
      profileImage,
    };

    await dispatch(asyncEditProfile(userDetails));
    navigate("/profile");
  };

  return (
    <div className="w-full h-screen bg-zinc-200">
      <div className="w-full h-[10vh] px-2 md:px-4 flex items-center justify-between border-b border-zinc-400">
        <i
          onClick={() => navigate("/profile")}
          className="ri-arrow-left-line text-[1.25rem] cursor-pointer"
        ></i>
        <h1 className="text-[1.5rem] md:text-[1.75rem] lg:text-[2rem] font-semibold tracking-tighter">
          Update Profile
        </h1>
        <i className="ri-menu-line text-[1.25rem] cursor-pointer"></i>
      </div>
      <div className="w-full md:w-[40vw] lg:w-[30vw] mx-auto flex flex-col items-center gap-5 pt-10">
        <div className="relative w-[6rem] md:w-[8rem] h-[6rem] md:h-[8rem] rounded-full border border-zinc-400">
          <img
            className="w-full h-full object-cover rounded-full"
            src={user.profileImage.url}
            alt=""
          />
          <div
            onClick={() => imageRef.current.click()}
            className="w-[2rem] h-[2rem] flex items-center justify-center absolute bottom-0 left-0 rounded-full bg-zinc-600"
          >
            <i className="ri-pencil-line text-[1.25rem] text-white cursor-pointer"></i>
          </div>
        </div>
        <div className="w-full px-2 md:px-4">
          <h1 className="text-[1.5rem] font-semibold tracking-tighter">
            User Details
          </h1>
          <hr className="w-full h-[1px] bg-zinc-400 border-none" />
          <form
            onSubmit={submitHandler}
            className="w-full flex flex-col gap-y-3 mt-5 font-medium"
          >
            <input
              hidden
              ref={imageRef}
              accept="image/*"
              onChange={(e) => setProfileImage(e.target.files[0])}
              type="file"
            />
            <div>
              <label
                htmlFor="fullname"
                className="text-base md:text-lg opacity-80"
              >
                Full name
              </label>
              <input
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                type="text"
                placeholder="Enter full name"
                className="w-full px-2 py-2 rounded-md bg-zinc-100 border border-zinc-400 outline-none "
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-base md:text-lg opacity-80"
              >
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter email"
                className="w-full px-2 py-2 rounded-md bg-zinc-100 border border-zinc-400 outline-none "
              />
            </div>
            <div>
              <label
                htmlFor="dateOfBirth"
                className="text-base md:text-lg opacity-80"
              >
                Date of Birth (DOB)
              </label>
              <input
                onChange={(e) => setDateOfBirth(e.target.value)}
                value={dateOfBirth}
                type="date"
                placeholder="Enter Date of Birth"
                className="w-full px-2 py-2 rounded-md bg-zinc-100 border border-zinc-400 outline-none "
              />
            </div>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1">
                <input
                  name="gender"
                  type="radio"
                  value="male"
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === "male"}
                />
                <span className="text-sm md:text-base opacity-80">Male</span>
              </div>
              <div className="flex items-center gap-1">
                <input
                  name="gender"
                  type="radio"
                  value="female"
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === "female"}
                />
                <span className="text-sm md:text-base opacity-80">Female</span>
              </div>
              <div className="flex items-center gap-1">
                <input
                  name="gender"
                  type="radio"
                  value="other"
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === "other"}
                />
                <span className="text-sm md:text-base opacity-80">Other</span>
              </div>
            </div>
            <button className="w-full px-4 py-2 rounded-md text-white text-base bg-blue-500 hover:bg-blue-600">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
