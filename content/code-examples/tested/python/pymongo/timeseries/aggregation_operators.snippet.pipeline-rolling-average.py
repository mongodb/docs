pipeline_results = stocks_coll.aggregate(
    [
        {
            "$setWindowFields": {
                "partitionBy": "$symbol",
                "sortBy": {"date": 1},
                "output": {
                    "averageMonthClosingPrice": {
                        "$avg": "$close",
                        "window": {"range": [-1, 0], "unit": "month"}
                    }
                }
            }
        }
    ]
)
