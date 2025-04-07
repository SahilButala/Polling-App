import React from "react";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

const OptionInputTile = ({ isSelected, label, onSelect }) => {
const getColors = ()=>{
    if(isSelected) return "text-white  bg-blue-300 border-sky-400"
    return "text-black bg-slate-200/80 border-slate-200 "
}

  return <div>
    <button className={`flex items-center gap-2 mt-2 px-3 py-2 mb-4 border rounded-md w-full border-slate-300 ${getColors()}`}
    onClick={onSelect}

    >
        {
            isSelected ? (
                <MdRadioButtonChecked className="text-lg text-white"/>
            ) : <MdRadioButtonUnchecked  className="text-lg text-slate-400"/>
        }
        <span className="text-[13px]">{label}</span>
    </button>
  </div>;
};

export default OptionInputTile;
