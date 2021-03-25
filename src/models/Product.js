import fs, { readFileSync } from 'fs'

const productsPath = "products.json"

class Product {
  constructor({name, price, description, available}) {
    this.name = name
    this.price = price
    this.description = description
    this.available = available
  }

  static findAll() {
    // read JSON file and parse into object
    const productsData = JSON.parse(fs.readFileSync(productsPath)).products
    // take the array of objects and map into Product objects
    let products = productsData.map(product => {
      let newProduct = new Product(product)
      return newProduct
    })
    // return array of objects
    return products
  }

  save() {
    // get products array
    const products = this.constructor.findAll()
    //avaible true
    this.available = true
    // save this to array
    products.push(this)
    //write the new array to file
    fs.writeFileSync(productsPath, JSON.stringify({ products: products}) )
  }
}

export default Product