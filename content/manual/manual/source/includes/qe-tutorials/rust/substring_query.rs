// start-enable-substring
let encrypted_fields = doc! {
    "fields": [
        {
            "path":     "patientRecord.ssn",
            "bsonType": "string",
            "keyId":    Bson::Null,
            "queries": { "queryType": "substringPreview",
                         "strMaxLength": 12,
                         "strMinQueryLength": 3,
                         "strMaxQueryLength": 6,
                         "caseSensitive": true,
                         "diacriticSensitive": true },
        },
    ]
};
// end-enable-substring

// start-query-substring
let query =
    doc! { "$expr": doc! {
        "$encStrContains": doc! {
            "input": "$patientRecord.ssn",
            "substring": "-65-4"
        }
    }
};
let find_result = encrypted_coll.find_one(query).await?;

match find_result {
    Some(document) => println!("{:?}", document),
    None => println!("Document not found"),
}
// end-query-substring
