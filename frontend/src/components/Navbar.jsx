import React, { useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import SideBarMenue from "./SideBarMenue";

function Navbar({activeMenue}) {
  const [toogle, settoogle] = useState(false);

  const handletoogleMenu = () => {
    settoogle(!toogle);
  };

  return (
    <div className="flex items-center  p-5 bg-slate-100 backdrop-blur-[2px] border-b border-white sticky top-0 z-30 gap-3.5">
      <button
        className="block lg:hidden text-xl cursor-pointer"
        onClick={() => handletoogleMenu()}
      >
        {toogle ? <RxCross2 /> : <RiMenu3Line />}
      </button>
      <h2 className="text-xl font-bold ">Polling App</h2>
      {toogle && <div className="fixed top-[67px] -ml-4 bg-white">
          <SideBarMenue activeMenue={activeMenue}/>
        </div>}
    </div>
  );
}

export default Navbar;
