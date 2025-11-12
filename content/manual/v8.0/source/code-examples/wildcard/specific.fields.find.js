db.products_catalog.find( { "product_attributes.washable" : true } )
db.products_catalog.find( { "product_attributes.maxSize" : { $gt : 20 } } )
db.products_catalog.find( { "product_attributes.colors" : { $eq: "blue" } } )