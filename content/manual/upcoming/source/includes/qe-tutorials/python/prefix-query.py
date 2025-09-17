# start-enable-prefix
encrypted_fields_map = {
    "fields": [
        {
            "path": "patientRecord.ssn",
            "bsonType": "string",
            "queries": [{
                "queryType": "prefixPreview",
                "strMinQueryLength": 3,
                "strMaxQueryLength": 10,
                "caseSensitive": True,
                "diacriticSensitive": True,
            }]
        },
    ]
}
# end-enable-prefix

# start-query-prefix
find_result = encrypted_collection.find_one(
   { "$expr": { "$encStrStartsWith": 
      { "input": "$patientRecord.ssn", "prefix": "987" } 
    } 
})
# end-query-prefix