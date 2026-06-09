db.movies.createSearchIndex(
    "default",
    {
    "mappings": { 
        "dynamic": true
    },
    "synonyms": [
        {
            "analyzer": "lucene.standard",
            "name": "my_synonyms",
            "source": {
                "collection": "synonymous_terms"
            }
        }
    ]}
)