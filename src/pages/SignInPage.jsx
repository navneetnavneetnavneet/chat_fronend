import React, { useState } from "react";
import chatlogo from "/public/chatlogo.png";
import background from "/public/background.jpg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { asyncSignInUser } from "../store/actions/userActions";

const SignInPage = () => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.warning("Email or Password is required !");
    }

    if (password.length < 6) {
      return toast.warning("Password minimum 6 characters !");
    }

    if (password.length > 15) {
      return toast.warning("Password maximum 15 characters !");
    }

    const userDetails = { email, password };

    await dispatch(asyncSignInUser(userDetails));

    setEmail("");
    setPassword("");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full h-screen flex items-center justify-center px-4 py-4"
    >
      <div className="w-full md:w-[40vw] lg:w-[30vw] px-2 py-4 bg-white rounded-md">
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-zinc-400 overflow-hidden">
            <img className="w-full h-full object-cover" src={chatlogo} alt="" />
          </div>
          <h1 className="text-center text-[1.75rem] md:text-[2rem] font-bold leading-none tracking-tighter">
            Welcome to <span className="text-blue-600">Chat</span>
            <span className="text-orange-600">X</span>
          </h1>
          <p className="px-4 text-center text-[1rem] leading-tight font-medium opacity-80 tracking-tighter">
            Please enter your details to sign in.
          </p>
        </div>
        <form
          onSubmit={submitHandler}
          className="w-full flex flex-col gap-y-5 px-2 py-4"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            name="email"
            placeholder="Enter Email"
            className="w-full px-2 py-2 rounded-md outline-none border border-zinc-400 bg-zinc-100 text-base font-medium"
          />
          <div className="flex items-center w-full px-2 bg-zinc-100 rounded-md border border-zinc-400">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={show ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              className="w-full py-2 text-base font-medium bg-zinc-100 outline-none"
            />
            <span
              onClick={() => setShow(!show)}
              className="text-sm rounded-md font-medium cursor-pointer "
            >
              <i
                className={`ri-eye-${show ? "" : "off-"}line cursor-pointer`}
              ></i>
            </span>
          </div>
          <Link to="/forgot-password" className="-mt-5 text-end text-base font-medium text-blue-500">
            Forgot password ?
          </Link>
          <button className="w-full px-4 py-2 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-medium cursor-pointer">
            Sign In
          </button>
        </form>
        <p className="text-sm text-center font-medium opacity-80">
          Don't have an account ?{" "}
          <Link
            to="/signup"
            className="text-blue-500 font-semibold opacity-100"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
