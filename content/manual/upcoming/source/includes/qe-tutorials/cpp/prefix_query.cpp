// start-enable-prefix
auto const encrypted_fields = make_document(kvp("fields", bsoncxx::builder::basic::make_array(
    make_document(
        kvp("path", "patientRecord.ssn"),
        kvp("bsonType", "string"),
        kvp("keyId", bsoncxx::types::b_null{}),
        kvp("queries", make_document(
            kvp("queryType", "prefix"),
            kvp("strMinQueryLength", 3),
            kvp("strMaxQueryLength", 10),
            kvp("caseSensitive", true),
            kvp("diacriticSensitive", true)))))));
// end-enable-prefix

// start-query-prefix
auto const find_result = encrypted_collection.find_one(make_document(kvp("$expr", make_document(
    kvp("$encStrStartsWith", make_document(
        kvp("input", "$patientRecord.ssn"),
        kvp("prefix", "987")))))));

if (find_result) {
    std::cout << bsoncxx::to_json(*find_result) << std::endl;
} else {
    std::cout << "Document not found" << std::endl;
}
// end-query-prefix
