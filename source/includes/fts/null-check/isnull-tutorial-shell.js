db.users.aggregate([
    {
        $search: {
            "index": "null-check-tutorial",
            "compound": {
                "must": {
                    "exists": {
                        "path": "password"
                    }
                },
                "mustNot": {
                    "wildcard": {
                        "path": "password",
                        "query": "*",
                        "allowAnalyzedField": true
                    }
                }
            }
        }
    }
])