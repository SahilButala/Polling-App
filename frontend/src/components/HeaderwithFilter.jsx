import React, { useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { MdFilterListOff } from "react-icons/md";
import { POLL_TYPE } from "../config/data";
const HeaderwithFilter = ({ title, filterType, setfilterType }) => {
  const [open, setopen] = useState(false);
  return (
    <div>
        <div className="flex items-center justify-between">
      <h2 className='sm:text-xl font-medium text-black'>{title}</h2>
      <button
        onClick={() => {
          if (filterType !== " ") setfilterType("");
          setopen(!open);
        }}
        className="filter-type flex items-center gap-2 capitalize"
      >
        {filterType !== "" ? (
          <>
            <MdFilterListOff  className="text-xl cursor-pointer"/>
            Clear
          </>
        ) : (
          <>
            <IoFilterSharp className="text-xl cursor-pointer    " />
            Filter
          </>
        )}
      </button>
    </div>
    {
        open && (
            <div className="flex flex-wrap p-4 bg-blue-300 gap-2 mt-2 rounded-xl">
                      {[{label : "All" , value : '' },...POLL_TYPE].map((type)=>(
                        <button key={type.value}
                        className={`text-[12px] px-4 py-1 rounded-lg text-nowrap cursor-pointer ${
                            filterType == type.value ? 'text-white bg-sky-900' : "text-[13px] bg-sky-100"
                        }`}
                        onClick={()=>{
                            setfilterType(type.value)
                        }}
                        >
                            {type.label}
                                
                        </button>
                      ))}
            </div>
        )
    }
    </div>
  );
};

export default HeaderwithFilter;
