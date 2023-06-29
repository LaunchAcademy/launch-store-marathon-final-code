/// <reference types="cypress" />

import newProduct from "../../fixtures/newProduct.json"
import starterProducts from "../../fixtures/starterProducts.json"
const productsFilePath = "products.json"

context("Products New", () => {
  beforeEach(() => {
    cy.visit("/products/new")
    cy.writeFile(productsFilePath, JSON.stringify(starterProducts))
  })

  it("has a header displaying the text Add a New Product", () => {
    cy.get("h1").should("have.text", "Add a New Product")
  })

  it("adds a product upon submitting the form correctly", () => {
    cy.get("#name")
      .type(newProduct.name)
      .should("have.value", newProduct.name)

    cy.get("#description")
      .type(newProduct.description)
      .should("have.value", newProduct.description)

    cy.get("#price")
      .type(newProduct.price)
      .should("have.value", newProduct.price)

    cy.get("form").submit()
    cy.url().should("eq", "http://localhost:3000/products")

    cy.get("li")
      .last()
      .should("have.text", `${newProduct.name} ($ ${newProduct.price})`)
  })

  it("remains on the form page if not all information is provided on submit", () => {
    cy.get("form").submit()
    cy.get("h1").should("have.text", "Add a New Product")
  })

  it("does not add a product to the list if the form is submitted incomplete", () => {
    cy.get("form").submit()

    cy.visit("/products")

    cy.get("li")
      .last()
      .should("not.have.text", "")
  })

})
