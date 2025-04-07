import express from "express"
import { bookMarkedPoll, ClosePoll, CreatePoll, deletePoll, getAllPolls, getPollById, getUserBookMarkedPoll, getVotedPolls, voteOnPoll } from "../../controllers/poll/Poll_Controller.js"
import { AuthMiddleWare } from "../../middlewares/authMiddleWare.js"


const Poll_Route = express.Router()


// routes
Poll_Route.post("/create",AuthMiddleWare,CreatePoll)
Poll_Route.get("/getAllPolls",AuthMiddleWare,getAllPolls)
Poll_Route.get("/votedPolls",AuthMiddleWare,getVotedPolls)
Poll_Route.get("/:id",AuthMiddleWare,getPollById)
Poll_Route.post("/:id/vote",AuthMiddleWare,voteOnPoll)
Poll_Route.post("/:id/close",AuthMiddleWare,ClosePoll)
Poll_Route.post("/:id/bookmarked",AuthMiddleWare,bookMarkedPoll)
Poll_Route.get("/getuser/bookmarked",AuthMiddleWare,getUserBookMarkedPoll)
Poll_Route.delete("/:id/delete",AuthMiddleWare,deletePoll)


export default Poll_Route