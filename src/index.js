const express=require('express')
const path=require('path')


//INITIALIZATIONSS
const app=express()


//SETTINGS
app.set('port',3000)
//por defecto express busca la carpeta views en la base, tengo q decirle donde esta ahora
app.set('views',path.join(__dirname,'views'))
//le digo a mi servidor quien sera el motor de vistas
app.set('view engine','ejs')


//MIDDLEWARE SE EJECUTAN ANTES DE LAS ROUTES


//STATIC FILES
//desde el navegador :3000/images/cualquier_img.ext
app.use(express.static(path.join(__dirname,'public')))


//ROUTES
//uso las rutas q estan en otro archivo
app.use(require('./routes/index.router'))


//START SERVER
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`)
})