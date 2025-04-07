// import jwt from "jsonwebtoken";

// const verifyToken = (token, JWT_SECRET) => {
//   return jwt.verify(token, JWT_SECRET);
// };

// export const AuthMiddleWare = async (req,res,next)=>{
//    try {
//     try {
//         const authHeader = req.headers.authorization;

//         if (!authHeader) {
//             return res.json({
//                 success: false,
//                 message: "User not authenticated. Authorization header missing.",
//             });
//         }

//         const token = authHeader.split(' ')[1]; // Extract token
//         if (!token) {
//             return res.json({
//                 success: false,
//                 message: "User not authenticated. Token missing.",
//             });
//         }

//         const payload = verifyToken(token, process.env.JWT_SECRET); // Verify token
//         req.user = payload;   // Attach user data to request object
//         next();
//     } catch (error) {
//         console.error("Error in authentication middleware:", error.message);
//         return res.json({
//             success: false,
//             message: "Invalid token or user not authenticated.",
//         });
//     }
//    } catch (error) {
//       console.log(error.message)
//    }
// }


import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js"; // Import User model

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

export const AuthMiddleWare = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated. Authorization header missing.",
      });
    }

    const token = authHeader.split(" ")[1]; // Extract token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated. Token missing.",
      });
    }

    const payload = verifyToken(token, process.env.JWT_SECRET); // Verify token

    // Fetch the user from DB to ensure it exists
    const user = await UserModel.findById(payload.id).select("_id fullname email");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Authentication failed.",
      });
    }

    req.user = user; // Attach full user object to request
    next();
  } catch (error) {
    console.error("Error in authentication middleware:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid token or user not authenticated.",
    });
  }
};


