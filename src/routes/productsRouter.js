import express from "express"

import Product from "../models/Product.js"

const productsRouter = express.Router()

productsRouter.get("/", (req, res) => {
  //console.log({ products: Product.findAll() })
  // console.log(Product.findAll())
  const products = Product.findAll()

  // res.render("products/index", {
  //   products: Product.findAll(),
  //   banana: "hi!",
  //   creator: "Alice"
  // })
  // res.render("products/index", { products: products })
  res.render("products/index", { products })
})

productsRouter.get("/new", (req, res) => {
  res.render("products/new")
})

// First build it so that it creates a new Product object, logs that Product object, and redirects to /products.
productsRouter.post("/", (req, res) => {
    const name = req.body.name.trim()
    const description = req.body.description.trim()
    const price = req.body.price.trim()
    // const newProduct = new Product({
    //   name: name,
    //   description: description,
    //   price: price
    // })
    if(name && description && price) {
      const newProduct = new Product({ name, description, price })
      console.log(newProduct);
      newProduct.save()
      res.redirect("/products")
    } else {
      res.render("products/new")
    }
})

export default productsRouter