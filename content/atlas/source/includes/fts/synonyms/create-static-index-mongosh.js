db.movies.createSearchIndex(
    "default",
    {
    "mappings": { 
        "dynamic": false,
        "fields": {
            "plot": {
                "type": "string",
                "analyzer": "lucene.english"
            }
        }
    },
    "synonyms": [
        {
            "analyzer": "lucene.english",
            "name": "my_synonyms",
            "source": {
                "collection": "synonymous_terms"
            }
        }
    ]}
)