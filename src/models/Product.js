import fs from 'fs'

const productsPath = "products.json"

class Product {
    constructor({ name, price, description, available = true }){
        this.name = name
        this.price = price 
        this.description = description
        this.available = available
    }

    static findAll(){
        const productDataObject = JSON.parse(fs.readFileSync(productsPath))

        const productArray = productDataObject.products 

        const formalProductsArray = productArray.map((objectImIteratingOver) => {
            // if (objectImIteratingOver.available === true){
                return new Product(objectImIteratingOver)
            // }
        })

        return formalProductsArray
    }

    save(){
        let allProductsPlusTheNewOne = this.constructor.findAll()

        allProductsPlusTheNewOne.push(this)
                
        fs.writeFileSync(productsPath, JSON.stringify({products: allProductsPlusTheNewOne}))

        return true
    }
}

export default Product