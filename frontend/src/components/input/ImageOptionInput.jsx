import React from "react";

const ImageOptionInput = ({ isSelected, imagUrl, onSelect }) => {
  const getColors = ()=>{
      if(isSelected) return "border-2 border-blue-300"
      return "border-transparent"
  }
  return <button 
  className={`w-full flex items-center gap-2 bg-slate-200/80 rounded-md overflow-hidden ${getColors()}`}
  onClick={onSelect}

  >
    <img src={imagUrl} alt="image" className="w-full h-36 object-contain"/>
  </button>;
};

export default ImageOptionInput;
