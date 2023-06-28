import express from "express"

import Product from "../models/Product.js"

const productsRouter = express.Router()

productsRouter.get("/", (req, res) => {
  const productList = Product.findAll()
  res.render("index", { products: productList })
})

productsRouter.get("/new", (req, res) => {
  res.render("new")
})

productsRouter.post("/", (req, res) => {
  const newProduct = new Product(req.body)
  console.log(newProduct)
  if(newProduct.name && newProduct.price) {
  // if(newProduct.name !== "" && newProduct.price !== "") {
    newProduct.save()
    res.redirect("/products")
  } else {
    res.render("new")
  }
})

export default productsRouter