import React, { useCallback, useContext, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { getPollBookMarekd } from "../../../utils/helper";
import UserProfileInfo from "./UserProfileInfo";
import Poll_Actions from "../Poll_Actions";
import Poll_Conetent from "../Poll_Conetent";
import axiosInstance from "../../../api/axiousInstance";
import { API_PATHS } from "../../../api/apiPaths";
import { toast } from "react-toastify";
import PollingResultsContent from "../PollingResultsContent";

const PollCard = ({
  pollId,
  question,
  type,
  options,
  voters,
  isMyPoll,
  responses,
  createProfileImg,
  creatorName,
  creatorUsername,
  userHasdVoted,
  isPollClosed,
  createdAt,
}) => {
  const { user, onUserVoted, toogleBookMarkedId, onPollCreateOrDelete } =
    useContext(UserContext);

  const [selectedOptionIndex, setselectedOptionIndex] = useState(-1);
  const [rating, setrating] = useState(0);
  const [userResponse, setuserResponse] = useState("");
  const [isVoteComplete, setisVoteComplete] = useState(userHasdVoted);
  const [pollresult, setpollresult] = useState({
    options,
    voters,
    responses,
  });

  const isPollBookMarked = getPollBookMarekd(
    pollId,
    user.bookmarkedPolls || []
  );

  const [pollBookMarked, setpollBookMarked] = useState(isPollBookMarked);
  const [pollClosed, setpollClosed] = useState(isPollClosed || false);
  const [PollDeleted, setPollDeleted] = useState(false);

  const handleInput = (value) => {
    if (type === "rating") setrating(value);
    else if (type === "open-ended") setuserResponse(value);
    else setselectedOptionIndex(value);
  };

  // handlethe bookMarked

  const toogleBookMarked = async () => {
    try {
      const res = await axiosInstance.post(
        API_PATHS.POLLS.BOOKMARKED_POLL(pollId)
      );
      toogleBookMarkedId(pollId);
      setpollBookMarked((prev) => !prev);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error.response?.data?.message || "Error bookMarking Poll");
    }
  };

  // generate the data bsed on  poll type
  const getPostData = useCallback(() => {
    if (type === "open-ended") {
      return { responseText: userResponse, voterId: user?._id };
    }
    if (type === "rating") {
      return { optionIndex: rating - 1, voterId: user?._id };
    }
    return { optionIndex: selectedOptionIndex, voterId: user?._id };
  }, [type, userResponse, rating, selectedOptionIndex, user]);

  // get Poll details by Id
  const getPollDetailsById = async () => {
    try {
      const res = await axiosInstance.get(
        API_PATHS.POLLS.GET_POLL_BYID(pollId)
      );
      if (res.data) {
        const pollDetails = res.data;
        setpollresult({
          options: pollDetails.options || [],
          voters: pollDetails.voters.length || 0,
          responses: pollDetails.responses || [],
        });
      }
    } catch (error) {
      console.log(error.response?.data?.message || "Error to get Poll Details");
    }
  };

  // handles the the submition of vote
  const handleVoteSubmit = async () => {
    try {
      const res = await axiosInstance.post(
        API_PATHS.POLLS.VOTE_ONPOLL(pollId),
        getPostData()
      );

      getPostData();
      setisVoteComplete(true);
      onUserVoted();
      getPollDetailsById();
      toast.success("Vote submitted Successfully...");
    } catch (error) {
      console.log(error.response?.data?.message || "Error submitting vote");
    }
  };

  // onClose
  const OnPollClosed = async () => {
    try {
      const res = await axiosInstance.post(API_PATHS.POLLS.CLOSE_POLL(pollId));

      if (res.data) {
        setpollClosed(true);
        toast.success(res.data?.message || "Poll Closed Successfully... ");
      }
    } catch (error) {}
  };

  // Delete Poll
  const OnDeletePoll = async () => {
    try {
      const res = await axiosInstance.delete(
        API_PATHS.POLLS.DELETE_POLL(pollId)
      );

      if (res.data) {
        setPollDeleted(true);
        onPollCreateOrDelete("delete");
        toast.success(res.data?.message || "Poll Deleted Successfully... ");
      }
    } catch (error) {}
  };

  return (
    !PollDeleted && (
      <div className="bg-slate-100/50 my-5 p-4 rounded-lg  border border-slate-100 mx-auto">
        <div className="flex items-start justify-between">
          <UserProfileInfo
            imgUrl={createProfileImg}
            fullname={creatorName}
            userName={creatorUsername}
            createdAt={createdAt}
          />
          <Poll_Actions
            pollid={pollId}
            isVoteComplete={isVoteComplete}
            inputCaptured={
              !!(userResponse || selectedOptionIndex >= 0 || rating)
            }
            onVoteSubmit={handleVoteSubmit}
            isPollBookMarked={pollBookMarked}
            toogleBookMarked={toogleBookMarked}
            isMyPoll={isMyPoll}
            pollClosed={pollClosed}
            onClose={OnPollClosed}
            onDelete={OnDeletePoll}
          />
        </div>

        <div className="ml-14 mt-3">
          <p className="text-[15px] text-black leading-8  font-medium">
            {question}
          </p>
          <div className="mt-2">
            {isVoteComplete || isPollClosed ? (
              <PollingResultsContent
                type={type}
                options={pollresult.options || []}
                voters={pollresult.voters}
                responses={pollresult.responses || []}
              />
            ) : (
              <Poll_Conetent
                type={type}
                options={options}
                selectedOptionIndex={selectedOptionIndex}
                onOptionSelect={handleInput}
                rating={rating}
                onRatingChange={handleInput}
                userResponse={userResponse}
                onResponseChange={handleInput}
              />
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default PollCard;
