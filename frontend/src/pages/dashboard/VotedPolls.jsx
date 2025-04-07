import React, { useContext, useEffect, useState } from "react";
import DashBoardLayout from "../../components/layouts/DashBoard";
import useUserAuth from "../../hooks/useUserAuth";
import HeaderwithFilter from "../../components/HeaderwithFilter";
import axiosInstance from "../../api/axiousInstance";
import { API_PATHS } from "../../api/apiPaths";
import PollCard from "../../components/poll/PollCard/PollCard";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
const MyPolls = () => {
  useUserAuth();

  const [vootedPolls,setVootedPolls] = useState([])
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const [loading, setloading] = useState(false);
  const [filterType, setfilterType] = useState("");


 
  const fetchAllPolls = async () => {
    if (loading) return;
    setloading(true);
    try {
      const res = await axiosInstance.get(
        `${API_PATHS.POLLS.GET_VOTED_POLLS}`
      );

      if (res.data?.polls?.length > 0) { 
        setVootedPolls((prevPolls) =>[...prevPolls, ...res.data.polls]
        );
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Somthing went wrong", error.message);
    } finally {
      setloading(false);
    }
  };

  // const loadMorePolls =()=>{
  //   setPage((prevpage)=>prevpage + 1)
  //  }

  useEffect(() => {
    setPage(1);
    fetchAllPolls();
    return () => {};
  }, [filterType]);





  return (
    <DashBoardLayout activeMenue="Voted Polls">
      <div className="my-5 mx-auto">
        <HeaderwithFilter
          title="Voted Polls"
          filterType={filterType}
          setfilterType={setfilterType}
        />


        {vootedPolls.map((poll, i) => (
          <PollCard
            key={`${i}`}
            pollId={poll?._id}
            question={poll.question}
            type={poll.type}
            options={poll.options}
            voters={poll.voters.length || 0}
            responses={poll.responses || []}
            createProfileImg={poll.creator.profileImageUrl || null}
            creatorName={poll.creator.fullname}
            creatorUsername={poll.creator.username}
            userHasdVoted={poll.userHasVoted || false}
            isPollClosed={poll.closed || false}
            createdAt={poll.createdAt || false}
            isMyPoll
          />
        ))}
      </div>
    </DashBoardLayout>
  );
};

export default MyPolls;
