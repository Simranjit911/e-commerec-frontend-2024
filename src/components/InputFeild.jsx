// components/InputField.js
import React from "react";

const InputField = ({ label, type, placeholder, value, onChange, name }) => {
  return (
    <div>
      {/* <label>{label}</label> */}
      <input
        className="w-[90%] md:w-[90%]  outline-1 outline-blue-300  hover:outline-2 hover:outline-blue-500 mx-1 my-1 px-2 text-xl py-2 shadow-xl"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};

export default InputField;
