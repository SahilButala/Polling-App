import React from "react";

const EmptyCard = ({ imgSrc, message, onClick, btnText }) => {
  return (
    <div className="bg-gray-100/50 flex flex-col items-center justify-center py-15 mt-3">
      <img src={imgSrc} alt="No Notes" className="w-36 md:w-48" />
      <p className="w-2/3 text-xs md:text-[14px] text-slate-500 leading-6 mt-7  text-center">
        {message}
      </p>
      {btnText && (
        <button className="bg-blue-300 py-2 px-4 text-white mt-4 rounded-md cursor-pointer text-sm " onClick={onClick}>
          {btnText}
        </button>
      )}
    </div>
  );
};

export default EmptyCard;
