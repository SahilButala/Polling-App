import React from "react";
import CharAvtar from "../../avatar/CharAvtar";
import moment  from 'moment'

const UserProfileInfo = ({ imgUrl, fullname, userName, createdAt }) => {
  return (
    <div className="flex items-center gap-3">
      {imgUrl ? (
        <img src={imgUrl} className="w-10 h-10 rounded-full border-none object-cover" />
      ) : (
        <CharAvtar fullname={fullname} style={"text-[13px]"} />
      )}

      <div className="">
      <p className="font-medium text-black text-sm leading-4 flex">
        {fullname} <span className="mx-1 text-sm font-medium text-slate-500">*</span>
        <span className="text-xs text-slate-500">
            {createdAt && moment(createdAt).fromNow()}
        </span>
      </p>
      <span className="text-[11.5px] text-slate-500 leading-4">
        @ {userName}
      </span>
      </div>
    </div>
  );
};

export default UserProfileInfo;
