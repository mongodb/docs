[{
  "$searchMeta": {
    "index": "listingsSearchableTypes",
    "facet":{
      "operator": {
        "text": {
          "path": "summary",
          "query": "ocean view"
        }
      },
      "facets": {
        "idFacet" : {
          "type" : "string",
          "path" : "idString",
          "numBuckets" : 10,
        },
        "hostFacet": {
          "type" : "string",
          "path" : "superHostString"
        }
      }
    }
  }
}]