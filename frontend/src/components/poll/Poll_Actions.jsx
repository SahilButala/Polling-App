import React, { useContext, useState } from "react";
import { IoBookmark } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";

const Poll_Actions = ({
  pollid,
  isVoteComplete,
  inputCaptured,
  onVoteSubmit,
  isPollBookMarked,
  toogleBookMarked,
  isMyPoll,
  pollClosed,
  onClose,
  onDelete,
}) => {


    const [loading, setloading] = useState(false)

  

    const handleVoteClick = async ()=>{
        setloading(true)
        try {
            await  onVoteSubmit()
        } catch (error) {
            
        } finally{
             setloading(false)
        }
        
    }
  return <div className="flex items-center gap-4">
    {
        (isVoteComplete || pollClosed ) && (
            <div className="text-[12px] font-medium text-slate-600 bg-sky-700/10 px-3 py-1 rounded-md">
                   {pollClosed ? "closed" : "Voted"}

            </div>
        )
    }

{
  isMyPoll && !pollClosed && (
    <button
    className="btn-small text-orange-500 bg-orange-500/20 hover:border-orange-500 px-2 py-1 rounded-md text-sm cursor-pointer"
    onClick={onClose}
    disabled={loading}
    >
  Close
    </button>
  )
}


   {isMyPoll &&( <button
    className="btn-small text-white bg-red-500 hover:border-orange-500 px-4  py-2 rounded-md text-sm cursor-pointer"
    onClick={onDelete}
    disabled={loading}
    >
  Delete
    </button>)}


                   <button className="text-[25px] text-slate-300 cursor-pointer  hover:text-blue-300" onClick={toogleBookMarked}>
                      {
                    isPollBookMarked ? (
                               <IoBookmark className=" text-blue-400" />
                        ) : (
                            <IoBookmarkOutline className=""/>
                        )
                      }
                   </button>

                   {
                    inputCaptured && !isVoteComplete && (
                        <button className="bg-blue-300 text-xs cursor-pointer font-medium ml-auto text-white py-2 px-3 rounded-xl"
                        disabled={loading}
                        onClick={handleVoteClick}
                        >
                            {loading ? "Submitting..." :  "Submit"}
                        </button>
                    )
                   }
  </div>;
};

export default Poll_Actions;
