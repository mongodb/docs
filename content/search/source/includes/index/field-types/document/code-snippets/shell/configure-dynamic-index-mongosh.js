db.movies.createSearchIndex(
    "default",
    {
      "mappings": {
        "dynamic": false,
        "fields": {
          "awards": {
            "type": "document",
            "dynamic": {
              "typeSet": "onlyNumbers"
            }
          }
        }
      },
      "typeSets": [
        {
          "name": "onlyNumbers",
          "types": [
            {
              "type": "number"
            }
          ]
        }
      ]
    }
)