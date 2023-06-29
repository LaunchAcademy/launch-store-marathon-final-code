Launch has commissioned your cohort to build our official e-commerce site.
Together, we'll use Express, HTTP, and Handlebars to build a simple online store.

## Getting Started

```no-highlight
et get launch-store-cypress
cd launch-store-cypress
yarn install
yarn run dev
```

## Introduction

The Cypress tests for the Core User Stories are provided for you to use TDD to build this application. We have split the features into 2 Cypress test files for you to follow along. Below, we have indicated which tests to run for the criteria asked.

Work through all of the Core Stories before the Non-Core!

The Non-Core User Stories do not have Cypress tests provided, but the last Non-Core User Story is an opportunity for you to write Cypress tests for the acceptance criteria.

## Core User Stories - 01_userViewsProductsIndex.spec.js

### Welcome Page

```no-highlight
As a potential customer
I want to be welcomed to the site
So that I'm encouraged to purchase Launch swag
```

Acceptance Criteria:

- When I navigate to the root path, I'm redirected to `/products`
- On the `/products` page, I'm presented with a "Welcome Coder" headline
- I should also see the following paragraph "All the gear a Launcher needs"

_Hint_ - use a Handlebars template.

STEPS:

1. Modify the route in `src/routes/rootRouter.js` and create any necessary additional routes
2. Add the view template

### List Products

```no-highlight
As a potential customer
I want to see a list of products
So that I can consider purchasing them
```

Acceptance Criteria:

- I can see each product's name and price at the "/products" path

STEPS:

3. Build out the `findAll` method in our model to load all products
4. Update the route to obtains all products and pass them to the appropriate view template, and update the view template to list out each product's name and price

### List Only Available Products

```no-highlight
As a potential customer
I only want to see a list of available products
So that I don't get my heart set on an unavailable product
```

Acceptance Criteria:

- At `/products`, I only see products that are set as available
- I can't see products that are not available

STEPS:

5. Update the view to conditionally show the products that are available

## Core User Stories - 02_userAddsNewProduct.spec.js

### Add a Product

```no-highlight
As a site admin
I want to add a new product to the store
So that I can improve the catalog
```

Acceptance Criteria:

- At `/products/new`, I can enter the product's name, description, and price
- Upon submitting the form, my product is posted to the `/products` path
- If I provide all necessary information, my product is persisted to the `products.json` file and I am redirected back to my `/products` page
- If I do not provide all information, I stay on my form page and my `products.json` file is not altered.

STEPS:

6. Build the route that will render the form, and create the view template with a heading inside
7. Update the view with a form that will allow us to add a new product
8. Create the route that the form will post to. First build it so that it creates a new Product object, logs that Product object, and redirects to `/products`.
9. Add a `save()` method to the `Product` model to persist the new product. Note that `available` should be marked as `true` by default when saving a product. Update your route to `save()` the new product.
10. Now, update the route to conditionally handle the saving of a product:

    - If the user fills out the proper information, the product should persist to the `products.json` file and the user should be redirected to the `/products` page.
    - If the user does not fill out the information, the JSON file should not be touched and they should stay on the `/products/new` page.

## Non-Core Challenges

### Link to a Show Page

```no-highlight
As a site admin
I want to view the detail of a product
So that I can learn more about it
```

Acceptance Criteria:

- On the homepage `/products`, each product name is a link that I can follow to view more detail around the correlating product at `/products/:productName`
- On the detail / show page, I can see the product name, description, and price
- On the detail / show page, there is a link to take me back to the home page

STEPS:

11. Modify the index page to make each product name a link to specific products
12. Add a `findByName` method on your `Product` model that finds a product by its name
13. Create the route that renders the product detail screen and hands the product to the appropriate view template
14. Build out the view template for the specific product, including the link that takes the user back to the homepage

### Validate an Added Product

```no-highlight
As a site admin
I want to be prompted to fix an error
So that I can fix the issue
```

Acceptance Criteria:

- If I fail to specify a product name or price, I'm presented with an error message, and the product is not saved
- If I fail to specify a product name or price but I have entered a description, the description should still appear on the page prompting me to fix my submission

STEPS:

- Add an `isValid()` method on your model to validate the required attributes. This method return true if product name and price are present. This method should return false if either one of those properties is missing.
- You may figure out how to display the error as you see fit, as long as an informative error message appears on the page to help the user correct their form submission. However, we recommend adding an error message (or messages) to a property on your Product e.g. `this.error = "Title cannot be blank"` if `isValid()` finds that the title property is missing.
- Modify the `post` endpoint to re-render the form _with errors_ when validation fails
- Update the view template to handle for the presence of an error
- Update the view template to populate form field values if present - the group should ensure this does not break the original form.

### Delete an Added Product

```no-highlight
As a site admin
I can delete a product on its detail page
So that I can keep my catalog fresh
```

Acceptance Criteria:

- On the product detail / show page, there is a button to delete a product
- When the button is pressed, the product is no longer available on the root page or via its product detail / show page

STEPS:

- Add the button to delete the product to the page
- Add a `delete()` function to your `Product` model which finds and removes the given product
- Build a route for `DELETE /products/:productName` which finds a product by its name and deletes that product from the JSON. After deletion, the page should be reloaded by redirecting back to `/products`

### Write Cypress Tests

```no-highlight
As a developer
I want to write tests for my app
So that I can make sure that all features are functioning
```

Acceptance Criteria:

- All non-core features should have cypress tests
- Each feature should have it's own test suite
