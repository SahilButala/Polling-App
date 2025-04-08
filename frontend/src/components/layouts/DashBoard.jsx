import React, { useContext } from "react";
import Navbar from "../Navbar";
import SideBarMenue from "../SideBarMenue";
import UserDetails from "../UserDetails";
import { UserContext } from "../../context/UserContext";
import TrendingPoll from "../TrendingPoll";

const DashBoardLayout = ({ children, activeMenue,stats ,showStats}) => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <Navbar activeMenue={activeMenue} />
      <div className="flex">
        <div className="max-[1024px]:hidden">
          <SideBarMenue activeMenue={activeMenue} />
        </div>
        <div className="mx-5 grow">{children}</div>

        <div>
          <div className="hidden md:block mr-5">
            <UserDetails
              
              profileImageUrl={user && user?.profileImageUrl}
              fullname={user && user?.fullname}
              username={user && user?.username}
              totalPollsVotes={user && user?.totalPollsVotes}
              totalPollsBookmarked={user && user?.totalPollsBookmarked}
              totalPollsCreated={user && user?.totalPollsCreated}
            />

            {
              showStats && stats?.length > 0 && <TrendingPoll stats={stats}/>               
              }
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
