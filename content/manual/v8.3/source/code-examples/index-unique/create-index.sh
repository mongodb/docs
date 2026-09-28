db.products.createIndex( { "inventory.warehouse": 1, "inventory.quantity": 1 }, { unique: true } )
