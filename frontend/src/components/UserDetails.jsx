import React from "react";
import bg from "../../assets/bg.jpg";
import CharAvtar from "./avatar/CharAvtar";


const ProfileInfo = ({label,value})=>{
       return (
        <div className="text-center">
                 <p  className="font-medium text-gray-950">{value}</p>
                 <p className="text-xs text-slate-700/80 mt-[2px]">{label}</p>
        </div>
       )
}

const UserDetails = ({
  profileImageUrl,
  fullname,
  username,
  totalPollsVotes,
  totalPollsBookmarked,
  totalPollsCreated,
}) => {
  return (
    <div className="bg-slate-100/50 rounded-lg mt-16 overflow-hidden">
      <div
        className={`flex w-full h-32 items-center justify-center relative`}
        style={{
          backgroundImage: `url(${bg}
      )`,
      backgroundRepeat : "no-repeat",
      objectFit : "cover"
        }}
      >
        <div className="absolute -bottom-10"
        >
         { profileImageUrl ? <img
            src={profileImageUrl}
            alt="Profile Image"
            className="w-20 h-20 bg-slate-50 rounded-full object-cover border-2 border-gray-100 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]"
          /> : <CharAvtar fullname={fullname} width={"w-20"} height={"20"} style={"text-xl"} />}
        </div>
      </div>

      <div className="mt-12 px-5 flex items-center flex-col">
        <div className="text-center pt-1">
          <h5 className="text-lg text-gray-950 font-medium">{fullname}</h5>
        </div>
        <span className="text-sm text-gray-500 text-center">@{username}</span>

        <div className="pb-5 flex gap-2 items-center mt-3">
           <ProfileInfo label={"Polls Created"} value={totalPollsCreated}/>
           <ProfileInfo label={"Polls Voted"} value={totalPollsVotes}/>
           <ProfileInfo label={"Polls BookMarked"} value={totalPollsBookmarked}/>
        </div>
      </div>

    </div>
  );
};

export default UserDetails;
