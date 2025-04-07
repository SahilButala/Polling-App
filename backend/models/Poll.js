import mongoose from "mongoose";

const PollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  options: [
    {
      optionText: { type: String, required: true },
      votes: { type: Number, default: 0 }, // track the votes
    },
  ],
  responses: [
    {
      voterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }, // for open ended polls
      responseText: { type: String }, // user submited text response
      createdAt: { type: Date, default: Date.now },
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  voters: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // to prevent multiple votes
  createdAt: { type: Date, default: Date.now },
  closed: { type: Boolean, default: false }, // to marked polls as closed
});

const PollModel = mongoose.model.Poll || mongoose.model("Poll", PollSchema);

export default PollModel;
