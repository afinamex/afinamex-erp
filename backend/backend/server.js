const express = require("express")
const app = express()

app.use(express.json())

app.get("/", (req,res)=>{
res.send("ERP Afinamex funcionando")
})

app.get("/vehiculos",(req,res)=>{
res.json([
{
unidad:"TMX-2381",
marca:"Nissan",
modelo:"NP300"
}
])
})

app.listen(3000,()=>{
console.log("Servidor ERP corriendo en puerto 3000")
})
