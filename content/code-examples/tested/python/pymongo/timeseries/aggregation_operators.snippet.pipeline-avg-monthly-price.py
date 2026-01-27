pipeline_results = stocks_coll.aggregate(
    [
        {
            "$group": {
                "_id": {
                    "firstDayOfMonth": {
                        "$dateTrunc": {
                            "date": "$date",
                            "unit": "month"
                        }
                    },
                    "symbol": "$symbol"
                },
                "avgMonthClose": {"$avg": "$close"}
            }
        }
    ]
)
