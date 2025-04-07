import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

const AuthInput = ({ value, onChange, label, placeholder, type }) => {
  const [showpass, setshowpass] = useState(false);

  const togglePasswordEye = () => {
    setshowpass(!showpass);
  };
  return (
    <div>
      <label className="text-[13px] text-slate-800">{label}</label>
      <div className="input-box relative">
        <input
          type={type == "password" ? (showpass ? "text" : "password") : "text"}
          placeholder={placeholder}
          value={value}
          required
          className="w-full bg-transparent outline-none "
          onChange={(e) => onChange(e)}
        />
        {type == "password" && (
          <>
            {showpass ? (
              <IoEyeOutline
                size={22}
                className="text-primary cursor-pointer"
                onClick={() => togglePasswordEye()}
              />
            ) : (
              <IoEyeOffOutline
                size={22}
                className="text-primary cursor-pointer "
                onClick={() => togglePasswordEye()}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AuthInput;
