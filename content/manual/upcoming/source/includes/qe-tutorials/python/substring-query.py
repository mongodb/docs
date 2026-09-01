# start-enable-substring
encrypted_fields = {
    "fields": [
        {
            "path": "patientRecord.ssn",
            "bsonType": "string",
            "queries": [{
                "queryType": "substring",
                "strMaxLength": 12,
                "strMinQueryLength": 3,
                "strMaxQueryLength": 6,
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
      { "input": "$patientRecord.ssn", "substring": "-65-4" }
    } 
})
# end-query-substring