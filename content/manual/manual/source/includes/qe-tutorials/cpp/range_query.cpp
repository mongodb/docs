// start-enable-range
auto const encrypted_fields = make_document(kvp("fields", bsoncxx::builder::basic::make_array(
    make_document(
        kvp("path", "patientRecord.ssn"),
        kvp("bsonType", "string"),
        kvp("keyId", bsoncxx::types::b_null{}),
        kvp("queries", make_document(kvp("queryType", "equality")))),
    make_document(
        kvp("path", "patientRecord.billing"),
        kvp("bsonType", "object"),
        kvp("keyId", bsoncxx::types::b_null{})),
    make_document(
        kvp("path", "patientRecord.billAmount"),
        kvp("bsonType", "int"),
        kvp("keyId", bsoncxx::types::b_null{}),
        kvp("queries", make_document(
            kvp("queryType", "range"),
            kvp("sparsity", 1),
            kvp("min", 100),
            kvp("max", 2000),
            kvp("trimFactor", 4)))))));
// end-enable-range

// start-query-range
auto const find_result = encrypted_collection.find_one(make_document(kvp("$and", bsoncxx::builder::basic::make_array(
    make_document(kvp("patientRecord.billAmount", make_document(kvp("$gt", 1000)))),
    make_document(kvp("patientRecord.billAmount", make_document(kvp("$lt", 2000))))))));

if (find_result) {
    std::cout << bsoncxx::to_json(*find_result) << std::endl;
} else {
    std::cout << "Document not found" << std::endl;
}
// end-query-range
