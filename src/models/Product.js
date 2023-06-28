import fs from 'fs'

const productsPath = "products.json"

class Product {
  constructor({ name, description, price, available }) {
    this.name = name
    this.description = description
    this.price = price
    this.available = available
  }

  // Product.findAll()
  static findAll() {
    // read our JSON file
    const stringifiedData = fs.readFileSync(productsPath)
    const productData = JSON.parse(stringifiedData)
    debugger
    // create Product objects for each set of product data
    // const productArray = []
    // productData.products.forEach(productData => {
    //   productArray.push(new Product(productData))
    // })

    const productArray = productData.products.map(productData => {
      return new Product(productData)
    })
    // return an array of product objects
    return productArray
  }

  // newProduct.save()
  save() {
    // get the existing list of products from the file
    const existingList = Product.findAll()
    // add the new product to our existing product list
    // make sure to mark `available` as true!
    this.available = true
    existingList.push(this)

    // format our data to match the JSON file
    const formattedData = {
      products: existingList
    }
    
    // update (overwrite) our JSON file with the new list
    // first, stringify our data -- make it the format the file can understand
    const stringifiedData = JSON.stringify(formattedData)
    // second, save that stringified data to the JSON file
    fs.writeFileSync(productsPath, stringifiedData)
  }
}

export default Product