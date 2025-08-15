import React from "react";

const Step3 = ({
  currentStep,
  formData,
  changeHandler,
  prevStep,
  submitHandler,
}) => {
  return (
    <>
      <h4 className="text-base font-semibold opacity-50 tracking-tight">
        Step {currentStep}/3
      </h4>
      <h1 className="text-center text-[1.25rem] md:text-[1.5rem] font-semibold opacity-80 tracking-tighter">
        OTP Verification
      </h1>
      <div className="flex flex-col gap-5 mt-5">
        <input
          onChange={changeHandler}
          value={formData.otp}
          type="number"
          name="otp"
          placeholder="Enter OTP"
          className="w-full px-4 py-2 rounded-md outline-none border border-zinc-400 bg-zinc-100 text-base font-medium"
        />
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={prevStep}
            className="w-full px-4 py-2 flex items-center justify-center gap-2 bg-zinc-500 hover:bg-zinc-600 rounded-md text-white font-medium cursor-pointer"
          >
            <i className="ri-arrow-left-line text-base"></i>
            Prev
          </button>
          <button
            onClick={submitHandler}
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

export default Step3;
