const express = require("express")
const {Pool} = require("pg")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const pool = new Pool({
user:"postgres",
host:"localhost",
database:"afinamex",
password:"1234",
port:5432
})

app.get("/", (req,res)=>{
res.send("Servidor ERP Afinamex funcionando")
})

app.post("/vehiculos", async (req,res)=>{

const {numero_unidad, marca, modelo, anio, placas} = req.body

try{

await pool.query(
"INSERT INTO vehiculos(numero_unidad,marca,modelo,anio,placas) VALUES($1,$2,$3,$4,$5)",
[numero_unidad,marca,modelo,anio,placas]
)

res.json({mensaje:"Vehiculo guardado correctamente"})

}catch(error){

console.error(error)
res.status(500).json({error:"Error al guardar vehiculo"})

}

})

app.get("/vehiculos", async (req,res)=>{

try{

const resultado = await pool.query("SELECT * FROM vehiculos ORDER BY id DESC")

res.json(resultado.rows)

}catch(error){

console.error(error)
res.status(500).json({error:"Error al obtener vehiculos"})

}

})

app.listen(3000,()=>{
console.log("Servidor ERP corriendo en puerto 3000")
})
