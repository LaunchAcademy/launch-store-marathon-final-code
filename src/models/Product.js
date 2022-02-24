import fs from 'fs'

const productsPath = "products.json"

class Product {
  constructor({name, description, price, available}) {
    this.name = name
    this.description = description
    this.price = price
    this.available = available
  }

static findAll() {
  //console.log(JSON.parse(fs.readFileSync(productsPath)).products)
  const productsData = JSON.parse(fs.readFileSync(productsPath)).products
  const products = productsData.map(product => {
    return new Product(product)
  })
  return products
  }

  save() {
    this.available = true
    const products = this.constructor.findAll()
    // const products = Product.findAll()
    products.push(this)
    fs.writeFileSync(productsPath, JSON.stringify( { products: products }))
  }
}

export default Product