pipeline.append(
    {
        "$group": {
            "_id": "$products.prod_id",
            "product": {"$first": "$products.name"},
            "total_value": {"$sum": "$products.price"},
            "quantity": {"$sum": 1},
        }
    }
)
