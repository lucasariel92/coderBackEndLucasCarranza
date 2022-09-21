const express = require("express")
const productsRouter = require("./products.js")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set("views", "./views")
app.set("view engine", "pug")

app.use("/", express.static(__dirname + "/public"))
app.use("/api", productsRouter)
app.get("/", (req, res) => {
    res.send("hola")
})
app.listen(8080, ()=>{
    console.log("Iniciado")
})