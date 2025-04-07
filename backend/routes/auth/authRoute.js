import express from 'express'
import { getUserInfo, RegisterUser, UserLogin } from '../../controllers/auth/authController.js'
import { AuthMiddleWare } from '../../middlewares/authMiddleWare.js'
import upload from '../../middlewares/Multer.js'

const authRouter = express.Router()

// all routes

authRouter.post('/register',RegisterUser)
authRouter.post('/login',UserLogin)
authRouter.post('/upload-image',upload.single('image'),(req,res)=>{
       if(!req.file){
        return res.status(400).json({
             message  : "no file uploaded"
        })
       }

       const imageUrl  = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`

       res.status(200).json({imageUrl})
})
authRouter.get('/getUser',AuthMiddleWare,getUserInfo)




export default authRouter