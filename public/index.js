const express=require('express')
const app=express()
const {insertarCurso,consultarCursos,editCurso}=require('./consulta')


app.listen(3000,()=>console.log('servidor 3000 encendido'))
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.post("/curso",async(req,res)=>{
    let body="";
    req.on('data',(chunk)=>{
        body+=chunk
    })
    req.on('end',async()=>{
        const datos= Object.values(JSON.parse(body))
        const respuesta= await insertarCurso(datos)
        res.send(JSON.stringify(respuesta))
    })
})
app.get("/cursos",async(req,res)=>{
    const registros= await consultarCursos() 
    res.send(JSON.stringify(registros))

})

app.put("/curso",async(req,res)=>{
    let body="";
    req.on('data',(chunk)=>{
        body +=chunk;
    })
    req.on('end',async()=>{      
        const datos= Object.values(JSON.parse(body))
        const respuesta= await editCurso(datos)       
        res.end(JSON.stringify(respuesta))

    })
})