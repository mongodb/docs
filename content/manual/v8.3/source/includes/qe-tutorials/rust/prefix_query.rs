// start-enable-prefix
let encrypted_fields = doc! {
    "fields": [
        {
            "path":     "patientRecord.ssn",
            "bsonType": "string",
            "keyId":    Bson::Null,
            "queries": { "queryType": "prefixPreview",
                         "strMinQueryLength": 3,
                         "strMaxQueryLength": 10,
                         "caseSensitive": true,
                         "diacriticSensitive": true },
        },
    ]
};
// end-enable-prefix

// start-query-prefix
let query =
    doc! { "$expr": doc! {
        "$encStrStartsWith": doc! {
            "input": "$patientRecord.ssn",
            "prefix": "987"
        }
    }
};
let find_result = encrypted_coll.find_one(query).await?;

match find_result {
    Some(document) => println!("{:?}", document),
    None => println!("Document not found"),
}
// end-query-prefix
