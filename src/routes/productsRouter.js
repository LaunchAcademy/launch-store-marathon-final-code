import express from "express"

import Product from "../models/Product.js"

const productsRouter = express.Router()

productsRouter.get("/", (req, res) => {
  res.render('products/index', { products: Product.findAll() })
})

productsRouter.get("/new", (req, res) => {
  res.render("products/new")
})

productsRouter.post("/", (req, res) => {
  const userName = req.body.name
  const userDescription = req.body.description
  const userPrice = parseFloat(req.body.price)
  if(userName && userPrice){
    const newProduct = new Product({
      name: userName,
      description: userDescription,
      price: userPrice
    })
    newProduct.save()
    // redirect expects the URL path -- we add a leading slash
    res.redirect("/products")
  }
  else {
    // render expects the file for the view
    // we DON'T give it a leading slash, it knows to look in the `views` folder
    res.render("products/new")
  }
})

export default productsRouter