import express from "express"

import Product from "../models/Product.js"

const productsRouter = express.Router()

productsRouter.get("/", (req, res) => {

    const arrayOfProducts = Product.findAll()
    // console.log(arrayOfProducts)
    res.render("productList.hbs", { products: arrayOfProducts })
})

productsRouter.get("/new", (req, res) => {
    res.render("productForm.hbs")
})

productsRouter.post("/", (req, res) => {

    // const { name, price, description } = req.body
    const nameFromForm = req.body.name
    const priceFromForm = req.body.price
    const descriptionFromForm = req.body.description

    if (nameFromForm === "" || priceFromForm === "" || descriptionFromForm === ""){
        res.render("productForm.hbs", { errorStuff: "please fill out all fields" })
    } else {
        // save that to the json file 
        const newProductObject = new Product({
            name: nameFromForm,
            price: priceFromForm,
            description: descriptionFromForm,
            available: true
        })

        newProductObject.save()

        res.redirect("/products")
    }
})

export default productsRouter