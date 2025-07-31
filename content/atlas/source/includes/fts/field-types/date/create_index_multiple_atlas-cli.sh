{
  "name": "default",
  "collectionName": "movies",
  "database": "sample_mflix",
  "mappings": {
    "dynamic": false,
    "fields": {
      "released": [
        {
          "type": "date"
        },
        {
          "type": "dateFacet"
        }
      ]
    }
  }
}