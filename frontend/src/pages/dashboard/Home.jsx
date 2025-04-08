import React, { useEffect, useState } from "react";
import DashBoardLayout from "../../components/layouts/DashBoard";
import useUserAuth from "../../hooks/useUserAuth";
import HeaderwithFilter from "../../components/HeaderwithFilter";
import axiosInstance from "../../api/axiousInstance";
import { API_PATHS } from "../../api/apiPaths";
import PollCard from "../../components/poll/PollCard/PollCard";
import InfiniteScroll from 'react-infinite-scroll-component'
import EmptyCard from "../../components/EmptyCard";
import CREATE_IMG from "../../../assets/create.png";

const Home = () => {


  useUserAuth();
  const PAGE_SIZE = 10


  const [allPolls, setallPolls] = useState([]);
  const [stats, setstats] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const [loading, setloading] = useState(false);
  const [filterType, setfilterType] = useState("");

  const fetchAllPolls = async (overridepage = page) => {
    if (loading) return;
      setloading(true);
    try {
      const res = await axiosInstance.get(
        `${API_PATHS.POLLS.GET_ALL_POLLS}?page=${overridepage}&limit=${PAGE_SIZE}&type=${filterType}`
      );

      if (res.data?.polls?.length > 0) {
        setallPolls((prevPolls) =>
          overridepage === 1
            ? res.data.polls
            : [...prevPolls, ...res.data.polls]
        );
        setstats(res.data?.stats || []);
        sethasMore(res.data.polls.length === PAGE_SIZE);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Somthing went wrong",error.message)
    } finally {
      setloading(false);
    }
  };

 
useEffect(()=>{
  setPage(1)
  fetchAllPolls(1)
  return ()=>{}
},[filterType])


useEffect(()=>{
   if(page !== 1){
     fetchAllPolls(page)
   }
  return ()=>{}
},[page])




  return (
    <DashBoardLayout activeMenue="Dashboard" stats={stats || []} showStats>
      <div className="my-5 mx-auto">
        <HeaderwithFilter
          title="Polls"
          filterType={filterType}
          setfilterType={setfilterType}
        />
      
           {/* {allPolls.length === 0 && !loading && (
          <EmptyCard
            btnText="Create Poll"
            imgSrc={CREATE_IMG}
            message="Welcome you are the first user of the system and thier are no polls yet. start by creating the first poll"
            onClick={() => navigate("/create-poll")}
          />
        )} */}


        {
          allPolls.map((poll,i)=>(
              <PollCard 
              key={`${poll._id}`}
              pollId ={poll?._id}
              question= {poll.question}
              type={poll.type}
             options={poll.options}
             voters={poll.voters.length || 0}
             responses = {poll.responses || []}
             createProfileImg = {poll.creator.profileImageUrl || null}
             creatorName = {poll.creator.fullname}
             creatorUsername={poll.creator.username}
             userHasdVoted = {poll.userHasVoted || false}
             isPollClosed = {poll.closed || false} 
             createdAt = {poll.createdAt || false}

              />
          ))
        }
      </div>
    </DashBoardLayout>
  );
};

export default Home;
