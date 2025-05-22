// start-enable-range
let encrypted_fields_map = doc! {
    "fields": [
        {
            "path":     "patientRecord.ssn",
            "bsonType": "string",
            "keyId":    Bson::Null,
            "queries": { "queryType": "equality" },
        },
        {
            "path":     "patientRecord.billing",
            "bsonType": "object",
            "keyId":    Bson::Null,
        },
        {
            "path":     "patientRecord.billAmount",
            "bsonType": "int",
            "queries": { "queryType": "range",
                          "sparsity": 1,
                          "min": 100,
                          "max": 2000, 
                          "trimFactor": 4 },
        },
    ]
};
// end-enable-range

// start-query-range
let query =
    doc! { "$and": [
        doc! { "patientRecord.billAmount": doc! { "$gt": 1000 } },
        doc! { "patientRecord.billAmount": doc! { "$lt": 2000 } }
    ]
};
let find_result = encrypted_coll.find_one(query).await?;

match find_result {
    Some(document) => println!("{:?}", document),
    None => println!("Document not found"),
}
// end-query-range