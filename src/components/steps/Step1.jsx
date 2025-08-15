import React from "react";

const Step1 = ({ currentStep, formData, changeHandler, nextStep }) => {
  return (
    <>
      <h4 className="text-base font-semibold opacity-50 tracking-tight">
        Step {currentStep}/3
      </h4>
      <h1 className="text-center text-[1.25rem] md:text-[1.5rem] font-semibold opacity-80 tracking-tighter">
        Personal Information
      </h1>
      <div className="flex flex-col gap-y-5 pt-5">
        <input
          onChange={changeHandler}
          value={formData.fullName}
          type="text"
          name="fullName"
          placeholder="Enter Full Name"
          className="w-full px-2 py-2 rounded-md outline-none border border-zinc-400 bg-zinc-100 text-base font-medium"
        />
        <input
          onChange={changeHandler}
          value={formData.dateofBirth}
          type="date"
          name="dateOfBirth"
          placeholder="Date of Birth (DOB)"
          className="w-full px-2 py-2 rounded-md outline-none border border-zinc-400 bg-zinc-100 text-base font-medium"
        />
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1">
            <input
              onChange={changeHandler}
              checked={formData.gender === "male" ? true : false}
              name="gender"
              value="male"
              type="radio"
            />
            <span className="text-[1rem] font-medium">Male</span>
          </div>
          <div className="flex items-center gap-1">
            <input
              onChange={changeHandler}
              checked={formData.gender === "female" ? true : false}
              name="gender"
              value="female"
              type="radio"
            />
            <span className="text-[1rem] font-medium">Female</span>
          </div>
          <div className="flex items-center gap-1">
            <input
              onChange={changeHandler}
              checked={formData.gender === "other" ? true : false}
              name="gender"
              value="other"
              type="radio"
            />
            <span className="text-[1rem] font-medium">Other</span>
          </div>
        </div>
        <button
          onClick={nextStep}
          className="w-full px-4 py-2 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-medium cursor-pointer"
        >
          Next
          <i className="ri-arrow-right-line text-base"></i>
        </button>
      </div>
    </>
  );
};

export default Step1;
