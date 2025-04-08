import React, { useEffect, useState } from "react";
import DashBoardLayout from "../../components/layouts/DashBoard";
import useUserAuth from "../../hooks/useUserAuth";
import HeaderwithFilter from "../../components/HeaderwithFilter";
import axiosInstance from "../../api/axiousInstance";
import { API_PATHS } from "../../api/apiPaths";
import PollCard from "../../components/poll/PollCard/PollCard";
import EmptyCard from "../../components/EmptyCard";
import bookmarkImg from "../../../assets/bookMark.png";
import { useNavigate } from "react-router-dom";

const BookMarks = () => {
  useUserAuth();
  const PAGE_SIZE = 10;

  const [BookMarksPolls, setBookMarksPolls] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate()

  const fetchAllPolls = async () => {
    if (loading) return;
    setloading(true);
    try {
      const res = await axiosInstance.get(`${API_PATHS.POLLS.GET_USER_BOOKMARKED_POLL}`);

      if (res.data?.bookMarkedPolls?.length > 0) {
        setBookMarksPolls((prevPolls) => [...prevPolls, ...res?.data?.bookMarkedPolls]);
        sethasMore(res.data.polls.length === PAGE_SIZE);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Somthing went wrong", error.message);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchAllPolls();
    return () => {};
  }, [page]);

  console.log(BookMarksPolls)

  return (
    <DashBoardLayout activeMenue="BookMarks">
      <div className="my-5 mx-auto">
        <h2 className="text-xl font-medium text-black">BookMarks Polls</h2>

        {BookMarksPolls.length === 0 && !loading && (
          <EmptyCard
            imgSrc={bookmarkImg}
            message="Welcome you are the first user of the system and thier are no polls BookMarked"
              btnText={"Explore"}
            onClick={() => navigate("/dashboard")}
          />
        )}

        {BookMarksPolls.map((poll, i) => (
          <PollCard
            key={i}
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
          />
        ))}
      </div>
    </DashBoardLayout>
  );
};

export default BookMarks;
