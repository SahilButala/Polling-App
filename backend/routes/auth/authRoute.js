import express from "express";
import {
  getUserInfo,
  RegisterUser,
  UserLogin,
} from "../../controllers/auth/authController.js";
import { AuthMiddleWare } from "../../middlewares/authMiddleWare.js";
import { storage } from "../../controllers/Cloudinary/index.js";
import multer from "multer";

const authRouter = express.Router();
const upload = multer({ storage });

// all routes

authRouter.post("/register", RegisterUser);
authRouter.post("/login", UserLogin);
authRouter.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "no file uploaded",
    });
  }

  res.status(200).json({ imageUrl: req.file.path });
});
authRouter.get("/getUser", AuthMiddleWare, getUserInfo);

export default authRouter;
