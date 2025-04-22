# start-enable-range
encrypted_fields_map = {
    "fields": [
        {
            "path": "patientRecord.ssn",
            "bsonType": "string",
            "queries": [{"queryType": "equality"}]
        },
        {
            "path": "patientRecord.billing",
            "bsonType": "object",
        },
        {
          "path": "patientRecord.billAmount",
          "bsonType": "int",
          "queries": [{ "queryType": "range",
                        "sparsity": 1,
                        "min": 100,
                        "max": 2000, 
                        "trimFactor": 4 }],
        },
    ]
}
# end-enable-range

# start-query-range
query = {"patientRecord.billAmount": {"$gt": 1000, "$lt": 2000}}
find_result = encrypted_collection.find_one(query)

print(find_result)
# end-query-range