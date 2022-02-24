import express from "express"

import Product from "../models/Product.js"

const productsRouter = express.Router()

productsRouter.get("/", (req, res) => {
  const products = Product.findAll()
  res.render("products/index", { products: products })
})

productsRouter.get("/new", (req, res) => {
  res.render("products/new")
})

productsRouter.post("/", (req, res) => {
  const formData = req.body
  const newProduct = new Product(formData)

  console.log(newProduct)

  // with conditional check for formdata here
  // if (
  //   req.body.name.trim() === "" ||
  //   req.body.description.trim() === "" ||
  //   req.body.price.trim() === ""
  // ) {
  //   res.render("products/new")
  // } else {
  //   newProduct.save()
  //   res.redirect("/products")
  // }

  // // With .save returning true/false
  if (newProduct.save()) {
    res.redirect("/products")
  } else {
    res.render("products/new")
  }
})

export default productsRouter
