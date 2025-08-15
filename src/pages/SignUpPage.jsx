import React, { useState } from "react";
import chatlogo from "/public/chatlogo.png";
import background from "/public/background.jpg";
import Step1 from "../components/steps/Step1";
import Step2 from "../components/steps/Step2";
import Step3 from "../components/steps/Step3";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { asyncSendOtp, asyncSignUpUser } from "../store/actions/userActions";

const SignUpPage = () => {
  const dispatch = useDispatch();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    gender: "",
    dateOfBirth: "",
    otp: "",
  });

  const nextStep = () => {
    const { fullName, dateOfBirth, gender } = formData;

    if (!fullName || !dateOfBirth || !gender) {
      return toast.warning("All fileds are required !");
    }

    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOTPHandler = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      return toast.warning("Email or Password is required !");
    }

    if (password.length < 6) {
      return toast.warning("Password minimum 6 characters !");
    }

    if (password.length > 15) {
      return toast.warning("Password maximum 15 characters !");
    }

    const otp = await dispatch(asyncSendOtp(email));
    if (otp) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const submitHandler = async () => {
    const { otp } = formData;

    if (!otp) {
      return toast.warning("OTP is required !");
    }

    if (otp.length !== 6) {
      return toast.warning("OTP must be have 6 characters !");
    }

    await dispatch(asyncSignUpUser(formData));

    setFormData({
      fullName: "",
      email: "",
      password: "",
      gender: "",
      dateOfBirth: "",
      otp: "",
    });
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
            Register to create your first account and start exploring the chat
            in ChatX.
          </p>
        </div>
        <div className="px-2 py-4 flex items-center justify-between">
          <h1 className="inline-block px-6 md:px-8 py-1 rounded-full bg-blue-300 text-base font-semibold text-white tracking-tight">
            Step-1
          </h1>
          <h1 className="inline-block px-6 md:px-8 py-1 rounded-full bg-blue-300 text-base font-semibold text-white tracking-tight">
            Step-2
          </h1>
          <h1 className="inline-block px-6 md:px-8 py-1 rounded-full bg-blue-300 text-base font-semibold text-white tracking-tight">
            Step-3
          </h1>
        </div>
        <div className="w-full px-2 py-4">
          {currentStep === 1 && (
            <Step1
              currentStep={currentStep}
              formData={formData}
              changeHandler={changeHandler}
              nextStep={nextStep}
            />
          )}
          {currentStep === 2 && (
            <Step2
              currentStep={currentStep}
              formData={formData}
              changeHandler={changeHandler}
              prevStep={prevStep}
              sendOTPHandler={sendOTPHandler}
            />
          )}
          {currentStep === 3 && (
            <Step3
              currentStep={currentStep}
              formData={formData}
              changeHandler={changeHandler}
              prevStep={prevStep}
              submitHandler={submitHandler}
            />
          )}
        </div>
        <p className="text-sm text-center font-medium opacity-80">
          Already have an account ?{" "}
          <Link
            to="/signin"
            className="text-blue-500 font-semibold opacity-100"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
