import moment from "moment";
import React from "react";
import CharAvtar from "../avatar/CharAvtar";

const OpenEndedPollResponse = ({
  profileImgUrl,
  userFullname,
  response,
  createdAt,
}) => {

    return <div className="mb-8 ml-3">
    <div className="flex  gap-3">
              {
                profileImgUrl ? (
                    <img src={profileImgUrl} alt="image"  className="w-8 h-8 rounded-full object-cover "/>
                ) : (
                    <CharAvtar fullname={userFullname}
                    style={"w-8 h-8 text-[10px] bg-sky-800/40"}
                    />
                )
              }
              <p className="text-[13px] text-black">
                {userFullname}
                <span className="mx-1 text-[10px text-slate-500]">*</span>
                <span className=" text-[10px text-slate-500]">{createdAt}</span>
              </p>
    </div>
    <p className="text-xs text-slate-700 -mt-2 ml-[50px]">{response}</p>
    </div>
};

const ImagePollResult = ({ imgUrl, optionVotes, totalVotes }) => {
  return (
    <div>
      <div className="w-full bg-gray-800 flex items-center gap-2 mb-4 rounded-md overflow-hidden">
        <img src={imgUrl} className="w-full h-36 object-contain" alt="" />
      </div>

      <PollOptionVoteResults
        optionVotes={optionVotes}
        totalVotes={totalVotes}
      />
    </div>
  );
};

const PollOptionVoteResults = ({ label, optionVotes, totalVotes }) => {
  const progress =
    totalVotes > 0 ? Math.round((optionVotes / totalVotes) * 100) : 0;

  return (
    <div className="w-full bg-slate-200/80 rounded-md h-8 relative mb-3 ">
      <div
        className="bg-sky-900/10 h-8 rounded-md  "
        style={{ width: `${progress}%` }}
      ></div>
      <span className="absolute inset-0 flex items-center justify-between text-gray-800 text-[12px]  font-medium mx-4">
        {label} <span className="text-[11px] text-slate-500 ">{progress}%</span>
      </span>
    </div>
  );
};

const PollingResultsContent = ({ type, options, voters, responses }) => {
  switch (type) {
    case "single-choice":
    case "yes/no":
    case "rating":
      return (
        <>
          {options.map((option, i) => (
            <PollOptionVoteResults
              key={i}
              label={`${option.optionText} ${type === "rating" ? "Star" : " "}`}
              optionVotes={option.votes}
              totalVotes={voters || 0}
            />
          ))}
        </>
      );

    case "image-based":
      return (
        <div className="grid grid-cols-2 gap-4">
          {options.map((option, i) => (
            <ImagePollResult
              key={i}
              imgUrl={option.optionText || ""}
              optionVotes={option.votes}
              totalVotes={voters || 0}
            />
          ))}
        </div>
      );

    case "open-ended":
      return responses.map((response, i) => (
        <div className="" key={i}>
          <OpenEndedPollResponse
            profileImgUrl={response.voterId?.profileImageUrl}
            userFullname={response.voterId?.fullname || "xyz 123"}
            response={response.responseText || ""}
            createdAt={
              response.createdAt ? moment(response.createdAt).fromNow() : ""
            }
          />
        </div>
      ));

    default:
      return null;
  }

  return <div></div>;
};

export default PollingResultsContent;
