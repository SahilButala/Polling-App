import React, { useContext } from "react";
import { SideBarMenueItems } from "../config/data";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const SideBarMenue = ({ activeMenue }) => {
  const { clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };
  return (
    <div className="w-64 h-[calc(100vh-61px) border-r border-gray-100 bg-slate-50/50  sticky top-[61px] z-20] p-4 pt-6 ">
      {SideBarMenueItems.map((item, i) => (
        <button
          key={i}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenue == item.label ? "text-white bg-blue-300" : ""
          } py-4 px-4 rounded-full mb-3 hover:underline cursor-pointer font-medium `}
          onClick={() => handleClick(item.path)}
        >
          {<item.icon className="text-xl" />} {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideBarMenue;
