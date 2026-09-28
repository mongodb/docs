db.products_catalog.find( { "product_attributes.colors" : { $eq: "Blue" } } )
db.products_catalog.find( { "product_attributes.material" : "Cotton" } )