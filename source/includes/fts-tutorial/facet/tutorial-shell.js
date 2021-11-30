db.movies.aggregate([
  {
    "$searchMeta": {
      "facet": {
        "operator": {
          "near": {
            "path": "released",
            "origin": ISODate("1921-11-01T00:00:00.000+00:00"),
            "pivot": 7776000000
          }
        },
        "facets": {
          "genresFacet": {
            "type": "string",
            "path": "genres"
          },
          "yearFacet" : {
            "type" : "number",
            "path" : "year",
            "boundaries" : [1910,1920,1930,1940]
          }
        }
      }
    }
  }
])
