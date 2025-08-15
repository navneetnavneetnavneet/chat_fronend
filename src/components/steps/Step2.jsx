import React, { useState } from "react";

const Step2 = ({
  currentStep,
  formData,
  changeHandler,
  sendOTPHandler,
  prevStep,
}) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <h4 className="text-base font-semibold opacity-50 tracking-tight">
        Step {currentStep}/3
      </h4>
      <h1 className="text-center text-[1.25rem] md:text-[1.5rem] font-semibold opacity-80 tracking-tighter">
        Contact Information
      </h1>
      <div className="flex flex-col gap-y-5 pt-5">
        <input
          onChange={changeHandler}
          value={formData.email}
          type="email"
          name="email"
          placeholder="Enter Email"
          className="w-full px-2 py-2 rounded-md outline-none border border-zinc-400 bg-zinc-100 text-base font-medium"
        />
        <div className="flex items-center w-full px-2 bg-zinc-100 rounded-md border border-zinc-400">
          <input
            onChange={changeHandler}
            value={formData.password}
            type={show ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
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
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={prevStep}
            className="w-full px-4 py-2 flex items-center justify-center gap-2 bg-zinc-500 hover:bg-zinc-600 rounded-md text-white font-medium cursor-pointer"
          >
            <i className="ri-arrow-left-line text-base"></i>
            Prev
          </button>
          <button
            onClick={sendOTPHandler}
            className="w-full px-4 py-2 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-medium cursor-pointer"
          >
            Next
            <i className="ri-arrow-right-line text-base"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Step2;
