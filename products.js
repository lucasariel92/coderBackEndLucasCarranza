const express = require("express")
const Container = require("./Container")
const products = new Container("products")
const {Router} = express
const router = Router()
const Products = []



//devolver todos los productos
router.get("/products", async (req, res) => {
 const data = await products.getAll()
 res.render("products", { data })
 
})


//devolver un producto segun id
router.get("/products/:id", async (req, res)=>{
    const {id} = req.params
    const data = await products.getById(id)
    res.send(data)
    

})

////recibir y agregar un producto
router.post("/products", async (req, res)=>{
    const {id, title, price, uMed, price2, uMed2, pack, linealMeters, squareMeters, wide, long, group1, group2, group3} = req.body
    Products.push({id, title, price, uMed, price2, uMed2, pack, linealMeters, squareMeters, wide, long, group1, group2, group3})
    await products.save(Products[0])
    res.send( {updated: {id, title, price, uMed, price2, uMed2, pack, linealMeters, squareMeters, wide, long, group1, group2, group3} } )
})
//
////recibir y actualizar producto segun id
router.put("/products/:id", async (req, res)=>{
    const {id} = req.params
    const data = await products.getById(id)
    
    
    
})

//eliminar producto segun id
router.delete("/products/:id", async (req, res)=>{
    const {id} = req.params
    const data = await products.deleteById(id)
    res.send(data)
    


})

//router.listen(8080, ()=>{
//    console.log("Products started")
//})

module.exports = router

