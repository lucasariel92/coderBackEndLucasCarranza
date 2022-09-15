const fs = require('fs')

function zFill(number, width) {
    var numberOutput = Math.abs(number); 
    var length = number.toString().length;
    var zero = "0";
    
    if (width <= length) {
        if (number < 0) {
             return ("-" + numberOutput.toString()); 
        } else {
             return numberOutput.toString(); 
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString()); 
        }
    }
}

class Container{
    constructor(file){
        this.file=file
    }
    
    async getAll(){
        try{
            const db = await fs.promises.readFile(`./data/${this.file}.json`, "utf-8")
            const products = JSON.parse(db)
            return (products)
        }catch(err){console.log(err)}
    }
    
    async save(obj){
        try{
            const productList = await fs.promises.readFile(`data/${this.file}.json`, "utf-8")
            const products = JSON.parse(productList)
            const id = 2528 - products.length
            obj.id = `INRO-${zFill(id,4)}`
            console.log(obj.id)
            products.push(obj)
            const prodString = JSON.stringify(products)
            await fs.promises.writeFile(`data/${this.file}.json`, prodString)
            return id
        }catch(err){console.log(err)}
    }

    async getById(num){
        try{
        const db = await fs.promises.readFile(`data/${this.file}.json`, "utf-8")
        const products = JSON.parse(db)
        const prodFound = products.find( products => products.id == `INRO-${zFill(num, 4)}`)
        if (prodFound == undefined){
            return {error: 'product missing'}    
        }else {return prodFound}
        }catch(err){
            console.log(err)    
        }
    }
    async deleteById(num){
        try{
        const db = await fs.promises.readFile(`data/${this.file}.json`, "utf-8")
        const products = JSON.parse(db)
        const cod = `INRO-${zFill(num, 4)}`
        const deleteId = (products) => products.id == cod
        const deleteIndex = products.findIndex(deleteId)
        if (deleteIndex>0){
            products.splice(deleteIndex, 1)
            const prodString = JSON.stringify(products)
            await fs.promises.writeFile(`data/${this.file}.json`, prodString)
            return products
            }else{return {error: "product missing"}}
        }catch(err){console.log(err)}
    }
    async deleteAll(){
        try{
            await fs.promises.writeFile(`data/${this.file}.json`, "[]")
        }catch(err){
            console.log(err)
        }
    }
}

const products = new Container("products")

module.exports = Container