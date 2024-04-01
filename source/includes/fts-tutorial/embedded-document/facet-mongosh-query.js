db.schools.aggregate({
    "$searchMeta": {
      "index": "embedded-documents-tutorial",
      "facet": {
        "operator": {
          "text":{
            "path": "name",
            "query": "High"
          }
        },
        "facets": {
          "gradeFacet": {
            "type": "string",
            "path": "teachers.classes.grade"
          }
        }
      }
    }
})