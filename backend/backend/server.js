const express = require("express")
const { Pool } = require("pg")
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

/* -------------------------
SERVIDOR
------------------------- */

app.get("/", (req,res)=>{
res.send("ERP Afinamex funcionando")
})

/* -------------------------
VEHICULOS
------------------------- */

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

const resultado = await pool.query(
"SELECT * FROM vehiculos ORDER BY id DESC"
)

res.json(resultado.rows)

}catch(error){

console.error(error)
res.status(500).json({error:"Error al obtener vehiculos"})

}

})

/* -------------------------
ORDENES
------------------------- */

app.post("/ordenes", async (req,res)=>{

const {vehiculo_id, servicio, costo, estado} = req.body

try{

await pool.query(
"INSERT INTO historial_servicios(vehiculo_id,servicio,costo,estado) VALUES($1,$2,$3,$4)",
[vehiculo_id,servicio,costo,estado]
)

res.json({mensaje:"Orden creada correctamente"})

}catch(error){

console.error(error)
res.status(500).json({error:"Error al crear orden"})

}

})

app.get("/ordenes", async (req,res)=>{

try{

const resultado = await pool.query(`
SELECT 
h.id,
v.numero_unidad,
h.servicio,
h.costo,
h.estado
FROM historial_servicios h
JOIN vehiculos v ON v.id = h.vehiculo_id
ORDER BY h.id DESC
`)

res.json(resultado.rows)

}catch(error){

console.error(error)
res.status(500).json({error:"Error al obtener ordenes"})

}

})

/* -------------------------
INVENTARIO
------------------------- */

app.post("/inventario", async (req,res)=>{

const {nombre, stock, precio} = req.body

try{

await pool.query(
"INSERT INTO inventario(nombre,stock,precio) VALUES($1,$2,$3)",
[nombre,stock,precio]
)

res.json({mensaje:"Producto agregado al inventario"})

}catch(error){

console.error(error)
res.status(500).json({error:"Error al guardar producto"})

}

})

app.get("/inventario", async (req,res)=>{

try{

const resultado = await pool.query(
"SELECT * FROM inventario ORDER BY id DESC"
)

res.json(resultado.rows)

}catch(error){

console.error(error)
res.status(500).json({error:"Error al obtener inventario"})

}

})

/* -------------------------
COTIZACIONES
------------------------- */

app.post("/cotizaciones", async (req,res)=>{

const {vehiculo, descripcion, total} = req.body

try{

await pool.query(
"INSERT INTO cotizaciones(vehiculo,descripcion,total) VALUES($1,$2,$3)",
[vehiculo,descripcion,total]
)

res.json({mensaje:"Cotización guardada"})

}catch(error){

console.error(error)
res.status(500).json({error:"Error al guardar cotización"})

}

})

app.get("/cotizaciones", async (req,res)=>{

try{

const resultado = await pool.query(
"SELECT * FROM cotizaciones ORDER BY id DESC"
)

res.json(resultado.rows)

}catch(error){

console.error(error)
res.status(500).json({error:"Error al obtener cotizaciones"})

}

})

/* -------------------------
PUERTO
------------------------- */

app.listen(3000,()=>{
console.log("Servidor ERP Afinamex corriendo en puerto 3000")
})
