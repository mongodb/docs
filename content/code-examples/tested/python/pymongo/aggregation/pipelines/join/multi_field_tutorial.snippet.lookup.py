pipeline.append(
    {
        "$lookup": {
            "from": "orders",
            "let": {"prdname": "$name", "prdvartn": "$variation"},
            "pipeline": embedded_pl,
            "as": "orders",
        }
    }
)
