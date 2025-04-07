import PollModel from "../../models/Poll.js";
import UserModel from "../../models/UserModel.js";

const CreatePoll = async (req, res) => {
  const { question, options, type, creatorId } = req.body;

  if (!question || !type || !creatorId) {
    return res.status(400).json({
      success: false,
      message: "Question , options and CreateId are requried",
    });
  }

  try {
    let processedOptions = [];

    switch (type) {
      case "single-choice":
        if (!options || options.length < 2) {
          return res.status(404).json({
            success: false,
            message: "Single choice poll must have at least 2 options",
          });
        }

        processedOptions = options.map((option) => ({ optionText: option }));
        break;
        processedOptions = []; // no  options are needed for open-ended

      case "open-ended":
        processedOptions = []; // no options are needed for open-ended
        break;

      case "rating":
        processedOptions = [1, 2, 3, 4, 5].map((rate) => ({
          optionText: rate.toString(),
        }));
        break;

      case "yes/no":
        processedOptions = ["Yes", "No"].map((option) => ({
          optionText: option,
        }));
        break;

      case "image-based":
        if (!options || options.length < 2) {
          return res.status(404).json({
            success: false,
            message: "image based poll must have at least two images",
          });
        }

        processedOptions = options.map((url) => ({
          optionText: url,
        }));
        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid Poll type",
        });
    }
    const newPoll = await PollModel.create({
      question,
      type,
      options: processedOptions,
      creator: creatorId,
    });

    res.status(201).json(newPoll);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllPolls = async (req, res) => {
  const { type, creatorId, page = 1, limit = 10 } = req.query;
  const filter = {};
  const userId = req.user?._id;
  if (type) filter.type = type;
  if (creatorId) filter.creator = creatorId;

  try {
    // calculating pagination parameter
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    const skip = (pageNumber - 1) * pageSize;

    const polls = await PollModel.find(filter)
      .populate("creator", "fullname username email profileImageUrl")
      .populate({
        path: "responses.voterId",
        select: "username profileImageUrl fullname",
      })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    // add userHasVoted flag for each poll

    const updatedPoll = polls.map((poll) => {
      const userHasVoted = poll.voters.some((voterId) =>
        voterId.equals(userId)
      );
      return {
        ...poll.toObject(),
        userHasVoted,
      };
    });

    // get total count of polls for pagination metadata

    const totalPolls = await PollModel.countDocuments(filter);

    const stats = await PollModel.aggregate([
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          type: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    // ensure that all types include in stats , even those with zero counts

    const allTypes = [
      {
        type: "single-choice",
        label: "Single Choice",
      },
      {
        type: "open-ended",
        label: "Open Ended",
      },
      {
        type: "yes/no",
        label: "Yes/No",
      },
      {
        type: "rating",
        label: "Rating",
      },
      {
        type: "image-based",
        label: "Image Based",
      },
    ];

    const statsWithDefaults = allTypes
      .map((pollType) => {
        const stat = stats.find((item) => item.type === pollType.type);
        return {
          label: pollType.label,
          type: pollType.type,
          count: stat ? stat.count : 0,
        };
      })
      .sort((a, b) => b.count - a.count);

    res.status(200).json({
      polls: updatedPoll,
      currentPage: pageNumber,
      totalPage: Math.ceil(totalPolls / pageSize),
      totalPolls,
      stats: statsWithDefaults,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getVotedPolls = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const userId = req.user._id;

  try {
    // calculate pagination parameter
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    const skip = (pageNumber - 1) * pageSize;

    const polls = await PollModel.find({ voters: userId })
      .populate("creator", "fullname username email profileImageUrl")
      .populate({
        path: "responses.voterId",
        select: "username fullname profileImageUrl",
      })
      .skip(skip)
      .limit(pageSize);

    // add
    const updatedPoll = polls.map((poll) => {
      const userHasVoted = poll.voters.some((voterId) =>
        voterId.equals(userId)
      );
      return {
        ...poll.toObject(),
        userHasVoted,
      };
    });

    const totalVotedPolls = await PollModel.countDocuments({ voters: userId });

    res.status(200).json({
      polls: updatedPoll,
      currentPage: pageNumber,
      totalPage: Math.ceil(totalVotedPolls / pageSize),
      totalVotedPolls,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getPollById = async (req, res) => {
  const { id } = req.params;

  try {
    const poll = await PollModel.findById(id);

    if (!poll) {
      return res.status(400).json({
        success: false,
        message: "Poll not found",
      });
    }

    res.status(200).json(poll);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const voteOnPoll = async (req, res) => {
  const { id } = req.params;

  const { optionIndex, voterId, responseText } = req.body;
  try {
    const poll = await PollModel.findById(id);

    if (!poll) {
      return res.status(404).json({
        success: false,
        message: "Poll Not Found..",
      });
    }

    if (poll.closed) {
      return res.status(400).json({ success: false, message: "Poll Closed" });
    }

    if (poll.voters.includes(voterId)) {
      return res.status(400).json({
        success: false,
        message: "User already vote this poll ",
      });
    }

    if (poll.type === "open-ended") {
      if (!responseText) {
        return res.status(400).json({
          message: "Response text is requried for open-ended poll",
        });
      }
      poll.responses.push({ voterId, responseText });
    } else {
      if (
        optionIndex == undefined ||
        optionIndex < 0 ||
        optionIndex >= poll.options.length
      ) {
        return res.status(400).json({
          message: "invalid options index",
        });
      }
      poll.options[optionIndex].votes += 1;
    }

    poll.voters.push(voterId);
    await poll.save();

    res.status(200).json(poll);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const ClosePoll = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  console.log(userId);
  try {
    const poll = await PollModel.findById(id);

    if (!poll) {
      return res.status(400).json({
        success: false,
        message: "Poll not found",
      });
    }

    if (poll.creator.toString() !== userId) {
      return res.status(403).json({
        message: "You are not authorized to close this poll",
      });
    }

    poll.closed = true;
    await poll.save();

    res.status(200).json({
      success: true,
      message: "Poll closed successfully ",
      poll,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const bookMarkedPoll = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found ",
      });
    }

    // checking if poll is already bookmarked

    const isBookMarked = user.bookmarkedPolls.includes(id);
    if (isBookMarked) {
      // remove poll from bookMarked
      user.bookmarkedPolls = user.bookmarkedPolls.filter(
        (pollid) => pollid.toString() !== id
      );

      await user.save();
      return res.status(200).json({
        message: "poll removed from bookmarked",
        bookMarkedPoll: user.bookmarkedPolls,
      });
    }

    //  add book marked

    user.bookmarkedPolls.push(id);
    await user.save();
    res.status(200).json({
      message: "added to bookmarked",
      bookMarkedPoll: user.bookmarkedPolls,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getUserBookMarkedPoll = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await UserModel.findById(userId).populate({
      path: "bookmarkedPolls",
      populate: {
        path: "creator",
        select: "username fullname profileImageUrl ",
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "user not found",
        success: false,
      });
    }

    const bookMarkedPolls = user.bookmarkedPolls;

    // add userHasVoted  flag for each poll

    const updatedPoll = bookMarkedPolls.map((poll) => {
      const userHasVoted = poll.voters.some((voterId) => {
        voterId.equals(userId);
      });
      return {
        ...poll.toObject(),
        userHasVoted,
      };
    });

    res.status(200).json({
      bookMarkedPolls: updatedPoll,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deletePoll = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const poll = await PollModel.findByIdAndDelete(id);
    if (!poll) {
      return res.status(404).json({
        message: "Poll not found or provide id for delete the poll",
        success: false,
      });
    }

    if (poll.creator.toString() !== userId) {
      return res.status(404).json({
        message: "you not authorized to delete this poll",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "Poll has successfully deleted..",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  CreatePoll,
  getAllPolls,
  getPollById,
  getVotedPolls,
  voteOnPoll,
  ClosePoll,
  bookMarkedPoll,
  getUserBookMarkedPoll,
  deletePoll,
};
