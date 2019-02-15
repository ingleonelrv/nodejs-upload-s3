const express=require('express')
const path=require('path')
const multer=require('multer')

//config multer para q guarde la img con su nombre original. Le paso esto a Multer Middleware
const multerStorage=multer.diskStorage({
    destination:path.join(__dirname,'public/images'),
    filename:(req,file,cb)=>{
        //si no hay error le paso null
        cb(null,file.originalname)
    }
})

//INITIALIZATIONSS
const app=express()


//SETTINGS
app.set('port',3000)
//por defecto express busca la carpeta views en la base, tengo q decirle donde esta ahora
app.set('views',path.join(__dirname,'views'))
//le digo a mi servidor quien sera el motor de vistas
app.set('view engine','ejs')


//MIDDLEWARE SE EJECUTAN ANTES DE LAS ROUTES
//la configuracion de multer, puedo cambiar single('nombre_del_campo')
app.use(multer({
    storage:multerStorage,
    dest: path.join(__dirname,'public/images')
}).single('imageInput'))


//ROUTES
app.get('/',(req,res)=>{
    res.render('index.ejs')
})
app.post('/upload',(req,res)=>{
    //por medio de req.file me llega la imagen
    console.log(req.file)
    res.send('Uploaded')
})


//START SERVER
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`)
})