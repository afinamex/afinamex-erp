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
CLIENTES
------------------------- */

app.post("/clientes", async (req,res)=>{

const {nombre,telefono,correo} = req.body

await pool.query(
"INSERT INTO clientes(nombre,telefono,correo) VALUES($1,$2,$3)",
[nombre,telefono,correo]
)

res.json({mensaje:"Cliente guardado"})

})

app.get("/clientes", async (req,res)=>{

const resultado = await pool.query(
"SELECT * FROM clientes ORDER BY id DESC"
)

res.json(resultado.rows)

})

/* -------------------------
VEHICULOS
------------------------- */

app.post("/vehiculos", async (req,res)=>{

const {cliente_id,numero_unidad,marca,modelo,anio,placas} = req.body

await pool.query(
`INSERT INTO vehiculos(cliente_id,numero_unidad,marca,modelo,anio,placas)
VALUES($1,$2,$3,$4,$5,$6)`,
[cliente_id,numero_unidad,marca,modelo,anio,placas]
)

res.json({mensaje:"Vehículo registrado"})

})

app.get("/vehiculos", async (req,res)=>{

const resultado = await pool.query(`
SELECT 
v.id,
v.numero_unidad,
v.marca,
v.modelo,
v.anio,
v.placas,
c.nombre cliente
FROM vehiculos v
LEFT JOIN clientes c ON c.id = v.cliente_id
ORDER BY v.id DESC
`)

res.json(resultado.rows)

})

/* -------------------------
ORDENES / HISTORIAL
------------------------- */

app.post("/ordenes", async (req,res)=>{

const {vehiculo_id,descripcion,fecha} = req.body

await pool.query(
`INSERT INTO historial_servicios(vehiculo_id,descripcion,fecha)
VALUES($1,$2,$3)`,
[vehiculo_id,descripcion,fecha]
)

res.json({mensaje:"Orden registrada"})

})

app.get("/ordenes", async (req,res)=>{

const resultado = await pool.query(`
SELECT 
h.id,
h.fecha,
h.descripcion,
v.numero_unidad
FROM historial_servicios h
JOIN vehiculos v ON v.id = h.vehiculo_id
ORDER BY h.id DESC
`)

res.json(resultado.rows)

})

/* -------------------------
COTIZACIONES
------------------------- */

app.post("/cotizaciones", async (req,res)=>{

const {vehiculo_id,descripcion,total,fecha} = req.body

await pool.query(
`INSERT INTO cotizaciones(vehiculo_id,descripcion,total,fecha)
VALUES($1,$2,$3,$4)`,
[vehiculo_id,descripcion,total,fecha]
)

res.json({mensaje:"Cotización guardada"})

})

app.get("/cotizaciones", async (req,res)=>{

const resultado = await pool.query(`
SELECT
c.id,
c.fecha,
c.descripcion,
c.total,
v.numero_unidad
FROM cotizaciones c
JOIN vehiculos v ON v.id = c.vehiculo_id
ORDER BY c.id DESC
`)

res.json(resultado.rows)

})

/* -------------------------
INVENTARIO
------------------------- */

app.post("/inventario", async (req,res)=>{

const {nombre,stock,precio} = req.body

await pool.query(
`INSERT INTO inventario(nombre,stock,precio)
VALUES($1,$2,$3)`,
[nombre,stock,precio]
)

res.json({mensaje:"Producto agregado"})

})

app.get("/inventario", async (req,res)=>{

const resultado = await pool.query(
"SELECT * FROM inventario ORDER BY id DESC"
)

res.json(resultado.rows)

})

/* -------------------------
DASHBOARD
------------------------- */

app.get("/dashboard", async (req,res)=>{

const clientes = await pool.query("SELECT COUNT(*) FROM clientes")
const vehiculos = await pool.query("SELECT COUNT(*) FROM vehiculos")
const ordenes = await pool.query("SELECT COUNT(*) FROM historial_servicios")
const cotizaciones = await pool.query("SELECT COUNT(*) FROM cotizaciones")

res.json({
clientes:clientes.rows[0].count,
vehiculos:vehiculos.rows[0].count,
ordenes:ordenes.rows[0].count,
cotizaciones:cotizaciones.rows[0].count
})

})

/* -------------------------
PUERTO
------------------------- */

app.listen(3000,()=>{
console.log("ERP Afinamex ejecutándose en puerto 3000")
})
