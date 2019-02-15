const router=require('express').Router()
const path=require('path')
const multer=require('multer')

//config multer para q guarde la img con su nombre original. Le paso esto a Multer Middleware
const multerStorage=multer.diskStorage({
    destination:path.join(__dirname,'../public/images'),
    filename:(req,file,cb)=>{
        //si no hay error le paso null
        cb(null,file.originalname)
    }
})

router.get('/',(req,res)=>{
    res.render('index.ejs')
})

//la configuracion de multer, puedo cambiar single('nombre_del_campo')
const upload=multer({
    storage:multerStorage,
    dest: path.join(__dirname,'../public/images'),
    limits:{fileSize:1000000}//size en bytes
}).single('imageInput')

router.post('/upload',upload,(req,res)=>{
    //por medio de req.file me llega la imagen
    console.log(req.file)
    res.send('Uploaded')
})
module.exports=router