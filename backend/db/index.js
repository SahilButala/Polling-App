import mongoose from "mongoose"
export const ConnectDataBase = ()=>{
   try {
      mongoose.connect(process.env.MONGOOSE_URL).then(console.log("Data base Connected Successfully"))
   } catch (error) { 
     console.log(error.message)
   }
}