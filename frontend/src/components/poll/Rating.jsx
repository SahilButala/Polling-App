import React, { useState } from "react";
import { HiMiniStar } from "react-icons/hi2";
const Rating = ({
  maxStar = 5,
  value = 0,
  onRatingChange,
  readOnly = false,
}) => {
  const [hoverValue, sethoverValue] = useState(0);

  const handleClick = (rating) => {
    if (!readOnly && onRatingChange) {
      onRatingChange(rating);
    }
  };

  const handleMouseEnter = (rating) => {
    if (!readOnly) {
      sethoverValue(rating);
    }
  };

  const handleMouseLeave = (rating) => {
    if (!readOnly) {
      sethoverValue(0);
    }
  };
  return (
    <div className={`flex gap-2 ${readOnly ? "cursor-default" : "cursor-pointer"}`}>
      {[...Array(maxStar)].map((star, index) => {
        const starvalue = index + 1;
        return (
          <span key={index} className={`text-3xl transition-colors  ${starvalue <= (hoverValue || value) ? "text-yellow-400" : "text-gray-300"}  ` }
          onClick={()=> handleClick(starvalue)}
          onMouseEnter={()=>handleMouseEnter(starvalue)}
          onMouseLeave={()=>handleMouseLeave}
          >
              
            <HiMiniStar />
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
