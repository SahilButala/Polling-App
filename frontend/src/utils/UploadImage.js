import { API_PATHS } from "../api/apiPaths";
import axiosInstance from "../api/axiousInstance";

export const uploadImage  = async (imageFile)=>{
  const formdata = new FormData()

  formdata.append('image',imageFile)

  try {
    const res = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE,formdata,{
        headers : {
            "Content-Type"  :"multipart/form-data"
        }
    })
    return res.data
  } catch (error) {
    console.log("error to upload image",error.message)
  }
}