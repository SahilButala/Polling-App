import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { ConnectDataBase } from './db/index.js'
import path, { dirname } from 'path'
import authRouter from './routes/auth/authRoute.js'
import { fileURLToPath } from "url";
import Poll_Route from './routes/poll/PollRoutes.js'
dotenv.config()

const app = express()

// Databas connection
ConnectDataBase()


// middlewares
app.use(express.json())
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }));


// routes
app.use('/auth',authRouter)
app.use('/user/poll',Poll_Route)



// server upload folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));



app.get('/',(req,res)=>{
    res.send("hello")
})


const PORT = process.env.PORT || 4000
app.listen(PORT,()=>{
      console.log(`Server are running at PORT ${PORT}..`) 
})