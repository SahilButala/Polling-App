import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { CgPoll } from "react-icons/cg";
import { LuVote } from "react-icons/lu";
import { BsBookmarks } from "react-icons/bs";
import { IoExitOutline } from "react-icons/io5";



export const SideBarMenueItems = [
  {
    label: "Dashboard",
    icon: MdOutlineSpaceDashboard,
    path: "/dashboard",
  },
  {
    label: "Create Poll",
    icon: IoCreateOutline,
    path: "/create-poll",
  },
  {
    label: "My Polls",
    icon: CgPoll,
    path: "/my-polls",
  },
  {
    label: "Voted Polls",
    icon: LuVote,
    path: "/voted-polls",
  },
  {
    label: "BookMarks",
    icon: BsBookmarks,
    path: "/bookmarks",
  },
  {
    label: "Log Out",
    icon: IoExitOutline,
    path : "logout"
  },
];

export const POLL_TYPE = [
  {
    label : "Yes/No",
    value : "yes/no"
  },
  {
    label : "Single Choice ",
    value : "single-choice"
  },
  {
    label : "Rating",
    value : "rating"
  },
  {
    label : "Image Based",
    value : "image-based"
  },
  {
    label : "Open Ended",
    value : "open-ended"
  },
]
