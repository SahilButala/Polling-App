import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      requried: true,
    },
    fullname: {
      type: String,
      requried: true,
    },
    email: {
      type: String,
      requried: true,
      unique: true,
    },
    password: {
      type: String,
      requried: true,
    },
    profileImageUrl: {
      type: String,
      default: null,
    },
    bookmarkedPolls: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Poll",
      },
    ],
  },
  { timestamps: true }
);

const UserModel = mongoose.model.User || mongoose.model("User", UserSchema);

export default UserModel;
