embedded_pl = [
    {
        "$match": {
            "$expr": {
                "$and": [
                    {"$eq": ["$product_name", "$$prdname"]},
                    {"$eq": ["$product_variation", "$$prdvartn"]},
                ]
            }
        }
    }
]
