db.movies.createSearchIndex(
    "default",
    {
    "mappings": { 
        "dynamic": false,
        "fields": {
            "awards": {
                "type": "document",
                "dynamic": true
            }
        }
    }}
)