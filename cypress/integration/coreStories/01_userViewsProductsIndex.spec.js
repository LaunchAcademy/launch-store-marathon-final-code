/// <reference types="cypress" />

import starterProducts from "../../fixtures/starterProducts.json"

context("Products Index", () => {
  beforeEach(() => {
    cy.visit("/products")
  })

  it("has a header displaying the text Welcome Coder", () => {
    cy.get("h1").should("have.text", "Welcome Coder")
  })

  it("has a paragraph displaying the text All the gear a Launcher needs", () => {
    cy.get("p").should("have.text", "All the gear a Launcher needs")
  })

  it("lists all products with their related information", () => {
    cy.get("ul")
      .find("li")
      .first()
      .should("have.text", `${starterProducts.products[0].name} ($ ${starterProducts.products[0].price})`)

    cy.get("ul")
      .find("li")
      .eq(1)
      .should("have.text", `${starterProducts.products[1].name} ($ ${starterProducts.products[1].price})`)
  })

  it("it does not show products that are unavailable", () => {
    cy.contains("Sleep Mask").should("not.exist")
  })
})