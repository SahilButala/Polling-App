import React, { useState } from "react";
import { GoTrash } from "react-icons/go";
import { IoAddSharp } from "react-icons/io5";
const OptionInput = ({ optionList, setOptionList }) => {
  const [option, setoption] = useState("");

  const handleToAddOptions = () => {
    if(option.trim() && optionList.length < 4){
      setOptionList([...optionList,option.trim()])
      setoption('')
    }
  };

  

  const handleToDeleteOptions = (index) => {
    const updatedArray = optionList.filter((_,id)=>id !== index)
    setOptionList(updatedArray)
  };
  return (
    <div>
      {optionList.map((item, i) => (
        <div key={i} className="flex justify-between bg-gray-200 px-4 py-3 rounded-sm mt-2">
          <p className="text-xs font-medium text-black capitalize ">{item}</p>
          <button onClick={() => handleToDeleteOptions(i)}>
            <GoTrash className="text-lg text-red-500 cursor-pointer" />
          </button>
        </div>
      ))}

      {
        optionList.length < 4 && (
          <div className="flex items-center gap-5 mt-4">
                    <input
                    type="text"
                    placeholder="Enter Options"
                    value={option}
                    onChange={({target})=>setoption(target.value)}
                    className="w-full bg-gray-200/80 p-3  rounded-sm px-3 outline-none text-sm"
                    />
                    <button className="py-2 bg-blue-400 rounded hover:bg-blue-300 text-sm text-white px-3  flex gap-2 cursor-pointer items-center text-nowrap btn-small"
                    onClick={handleToAddOptions}
                    >
                     <IoAddSharp className="text-lg "/> Add Options
                    </button>
          </div>
        )
      }
    </div>  
  );
};

export default OptionInput;
