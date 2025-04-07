import UserModel from "../../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import PollModel from "../../models/Poll.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const RegisterUser = async (req, res) => {
  const { username, fullname, email, password, profileImageUrl } = req.body;

  if (!password && !email && !username) {
    return res.status(400).json({
      success: false,
      message: "All fields are requried",
    });
  }

  // validation : username format
  // allow alphanumeric characters and hyphens only
  const usernameRegex = /^[a-zA-Z0-9-]+$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid username.. Only alphanumneric characters and hyphens are allowed. No spaces permitted",
    });
  }
  try {
    // checking if email already exsist in db
    const exsistUser = await UserModel.findOne({ email });

    if (exsistUser) {
      return res.status(400).json({
        success: false,
        message: "email already exsist..",
      });

      // checking if username already exsist
    }
    const exsistUsername = await UserModel.findOne({ username });

    if (exsistUsername) {
      return res.status(400).json({
        success: false,
        message: "email already username..",
      });
    }

    // hashing password

    const hashPassword = await bcrypt.hash(password, 10);

    // creating user

    const user = await UserModel.create({
      username,
      fullname,
      email,
      password: hashPassword,
      profileImageUrl,
    });

    res.status(201).json({
      success: true,
      message: "User Register successfully",
      data: {
        id: user?._id,
        user,
        token: generateToken(user?._id),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login
const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email && !password) {
      return res.status(400).json({
        success: false,
        message: "incorrect password or email , please try again..",
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found please register firstly. ",
      });
    }

    // Count polls created by user
    const totalPollsCreated = await PollModel.countDocuments({
      creator: user._id,
    });

    // count polls user has voted to each poll

    const totalPollsVotes = await PollModel.countDocuments({
      voters: user._id,
    });

    // get the count of bookMarked Polls
    const totalPollsBookmarked = user.bookmarkedPolls.length;

    const checkPass = await bcrypt.compare(password, user?.password);
    if (!checkPass) {
      return res.status(404).json({
        success: false,
        message: "Password incorrect please try again...",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login Successfully...",
      id: user?._id,
      user: {
        ...user.toObject(),
        totalPollsCreated,
        totalPollsVotes,
        totalPollsBookmarked,
      },
      token: generateToken(user?._id),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const { id } = req.user; // Extract user ID from payload

    if (!id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user, try again.",
      });
    }

    const user = await UserModel.findById(id).select("-password"); // Exclude password field
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Count polls created by user
    const totalPollsCreated = await PollModel.countDocuments({
      creator: user._id,
    });

    // count polls user has voted to each poll

    const totalPollsVotes = await PollModel.countDocuments({
      voters: user._id,
    });

    // get the count of bookMarked Polls
    const totalPollsBookmarked = user.bookmarkedPolls.length;

    res.status(200).json({
      success: true,
      user: {
        ...user.toObject(),
        totalPollsCreated,
        totalPollsVotes,
        totalPollsBookmarked,
      },
    });
  } catch (error) {
    console.error("Error fetching user info:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};
export { RegisterUser, UserLogin, getUserInfo };
