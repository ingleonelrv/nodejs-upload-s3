const router=require('express').Router()
const path=require('path')
const multer=require('multer')
const uuid=require('uuid/v4')

//config multer para q guarde la img con su nombre original. Le paso esto a Multer Middleware
const multerStorage=multer.diskStorage({
    destination:path.join(__dirname,'../public/images'),
    filename:(req,file,cb)=>{
        //si no hay error le paso null
        cb(null,uuid() + path.extname(file.originalname).toLowerCase())
    }
})

router.get('/',(req,res)=>{
    res.render('index.ejs')
})

//la configuracion de multer, puedo cambiar single('nombre_del_campo')
const upload=multer({
    storage:multerStorage,
    dest: path.join(__dirname,'../public/images'),
    limits:{fileSize:1000000},//size en bytes
    fileFilter:(req,file,cb)=>{
        //expresion regular /abc/
        const fileType= /jpeg|jpg|png/
        //comprueba q el tipo subido coincide con alguna de las esperadas
        const mimetype=fileType.test(file.mimetype)
        //ahora compruebo la extension con un metodo de path pasandole el originalname
        const extname=fileType.test(path.extname(file.originalname))
        if(mimetype && extname){
            // el cb dice: no error, continua
            cb(null,true)
        }else{
            //sino error
            console.log(`${mimetype} y ${extname}`)
            cb('Error: Archivo debe ser imagen')
        }
    }
}).single('imageInput')

router.post('/upload',upload,(req,res)=>{
    //por medio de req.file me llega la imagen
    console.log(req.file)
    res.send('Uploaded')
})
module.exports=router