const {Pool} = require("pg")

const pool = new Pool({
user:"postgres",
host:"localhost",
database:"afinamex",
password:"1234",
port:5432
})
const express = require("express")
const app = express()

app.use(express.json())
app.post("/vehiculos", async (req,res)=>{

const {numero_unidad, marca, modelo, anio, placas} = req.body

try{

await pool.query(
"INSERT INTO vehiculos(numero_unidad,marca,modelo,anio,placas) VALUES($1,$2,$3,$4,$5)",
[numero_unidad,marca,modelo,anio,placas]
)

res.json({mensaje:"Vehiculo guardado"})

}catch(error){

console.error(error)
res.status(500).json({error:"Error al guardar vehiculo"})

}

})

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
