import multer from 'multer'
import path from 'path'


const storage = multer.diskStorage({
    destination : (req,res,cb)=>{
            cb(null,'uploads/')
    },
    filename : (req,file,cb)=>{
                cb(null, `${Date.now()}-${file.originalname}`)
    }
})


// file filter

const fileFilter = (req,file,cb)=>{
    const allowTypes = ['image/jpeg','image/jpg','image/png'];
    if(allowTypes.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(new Error('Only jpeg , jpg and jpg formats are allowed'),false)
    }
};

const upload = multer({storage:storage,fileFilter})

export default upload