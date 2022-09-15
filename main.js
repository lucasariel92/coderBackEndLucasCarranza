const express = require("express")
const productsRouter = require("./products.js")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api/products", express.static(__dirname + "/public"))
app.use("/api", productsRouter)

app.listen(8080, ()=>{
    console.log("Iniciado")
})