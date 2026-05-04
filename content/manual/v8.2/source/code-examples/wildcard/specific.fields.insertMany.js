db.products_catalog.insertMany( [
  {
    _id : ObjectId("5c1d358bf383fbee028aea0b"),
    product_name: "Jeans",
    product_attributes: {
      price: {
        cost: 29.99,
        currency: "USD"
      }
    }
  },
  {
    _id: ObjectId("5c1d358bf383fbee028aea0c"),
    product_name: "Sweater",
    product_attributes: {
      washable: true,
      size: [ "small", "medium", "large" ]
    }
  }
] )