pipeline.append(
    {
        "$group": {
            "_id": "$customer_id",
            "first_purchase_date": {"$first": "$orderdate"},
            "total_value": {"$sum": "$value"},
            "total_orders": {"$sum": 1},
            "orders": {"$push": {"orderdate": "$orderdate", "value": "$value"}},
        }
    }
)
