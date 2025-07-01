db.users.aggregate([
    {
        $search: {
            "index": "null-check-tutorial",
            "compound": {
                "should": [{
                        "wildcard": {
                            "path": "password",
                            "query": "*",
                            "allowAnalyzedField": true
                        }
                    },
                    {
                        "compound": {
                            "mustNot": {
                                "exists": {
                                    "path": "password"
                                }
                            },
                            "score": { "constant": { "value": 2 } }
                        }
                    }
                ]
            }
        }
    }, 
    {
    "$limit": 5
    },
    {
        "$project": {
            "_id": 0, 
            "name": 1, 
            "password": 1,
            "score": { "$meta": "searchScore" }
        }
    }
])