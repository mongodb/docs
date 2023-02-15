db.users.aggregate([
    {
        $search: {
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