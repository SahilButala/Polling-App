import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, setuser] = useState(null);

  // update user
  const updateUser = (userData)=>{
     setuser(userData)
     console.log(userData)
  }
  const clearUser = ()=>{
    setuser(null)
  }

  const updateUserStatus = (key,value)=>{
            setuser((prev)=>({
              ...prev,
              [key] : value
            }))
  }

// update the totalPollsVotes count locally

const onUserVoted = ()=>{
    const totalPollsVotes = user?.totalPollsVotes || 0;
    updateUserStatus("totalPollsVotes",totalPollsVotes + 1)
}



  // upadte totalPollsCreated count Locally
  // const onPollCreateOrDelete = (type="create")=>{
  //           const totalPollsCreated = user.totalPollsCreated || 0;
  //           updateUserStatus(
  //             "totalPollsCreated",
  //             type === "create" ? totalPollsCreated + 1 : totalPollsCreated -1 
  //           )
  // }

  const onPollCreateOrDelete = (type = "create") => {
    if (!user) return;
  
    const totalPollsCreated = user?.totalPollsCreated || 0;
    let updatedCount = totalPollsCreated;
  
    if (type === "create") {
      updatedCount += 1;
    } else if (type === "delete" && totalPollsCreated > 0) {
      updatedCount -= 1;
    }
  
    updateUserStatus("totalPollsCreated", updatedCount);
  };

//bookMarked.filter((item)=>item !== id)
  // add or remove the id from bookMarked Polls
  const toogleBookMarkedId = (id)=>{
    const bookMarked = user?.bookmarkedPolls || []
    const index = bookMarked.indexOf(id)
    if(index === -1){
      setuser((prev)=>({
        ...prev,
        bookmarkedPolls : [...bookMarked,id],
        totalPollsBookmarked : prev.totalPollsBookmarked + 1
      }

    ))
  }else{
    setuser((prev)=>({
      ...prev,
      bookmarkedPolls : [bookMarked.filter((item)=>item !== id)],
      totalPollsBookmarked : prev.totalPollsBookmarked - 1
    }

  ))
  }
  }
  return (
    <UserContext.Provider value={{user,clearUser,updateUser,onPollCreateOrDelete,onUserVoted,toogleBookMarkedId}}>
        {children}
    </UserContext.Provider>
  );
};
