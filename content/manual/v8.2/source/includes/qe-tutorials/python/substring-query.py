# start-enable-substring
encrypted_fields_map = {
    "fields": [
        {
            "path": "patientRecord.ssn",
            "bsonType": "string",
            "queries": [{
                "queryType": "substringPreview",
                "strMaxLength": 12,
                "strMinQueryLength": 3,
                "strMaxQueryLength": 10,
                "caseSensitive": True,
                "diacriticSensitive": True,
            }]
        },
    ]
}
# end-enable-substring

# start-query-substring
find_result = encrypted_collection.find_one(
   { "$expr": { "$encStrContains": 
      { "input": "$patientRecord.ssn", "substring": "-65-432" } 
    } 
})
# end-query-substring