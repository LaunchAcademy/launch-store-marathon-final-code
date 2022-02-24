import fs from "fs"

const productsPath = "products.json"

class Product {
  constructor({ name, description, price, available }) {
    this.name = name
    this.description = description
    this.price = price
    this.available = available
  }

  static findAll() {
    const stringifiedData = fs.readFileSync(productsPath)
    const productData = JSON.parse(stringifiedData).products

    const productsList = productData.map((product) => {
      const newProduct = new Product(product)
      return newProduct
    })

    return productsList
  }

  //with check in router
  // save() {
  //   const productsList = Product.findAll()
  //   this.available = true
  //   productsList.push(this)
  //   fs.writeFileSync(productsPath, JSON.stringify({ products: productsList }))
  // }

  // to return true or false
  save() {
    if (this.name && this.description && this.price) {
      const productsList = Product.findAll()
      this.available = true
      productsList.push(this)
      fs.writeFileSync(productsPath, JSON.stringify({ products: productsList }))
      return true
    } else {
      return false
    }
  }
}

export default Product
