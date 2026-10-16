// start-enable-substring
auto const encrypted_fields = make_document(kvp("fields", bsoncxx::builder::basic::make_array(
    make_document(
        kvp("path", "patientRecord.ssn"),
        kvp("bsonType", "string"),
        kvp("keyId", bsoncxx::types::b_null{}),
        kvp("queries", make_document(
            kvp("queryType", "substring"),
            kvp("strMaxLength", 12),
            kvp("strMinQueryLength", 3),
            kvp("strMaxQueryLength", 6),
            kvp("caseSensitive", true),
            kvp("diacriticSensitive", true)))))));
// end-enable-substring

// start-query-substring
auto const find_result = encrypted_collection.find_one(make_document(kvp("$expr", make_document(
    kvp("$encStrContains", make_document(
        kvp("input", "$patientRecord.ssn"),
        kvp("substring", "-65-4")))))));

if (find_result) {
    std::cout << bsoncxx::to_json(*find_result) << std::endl;
} else {
    std::cout << "Document not found" << std::endl;
}
// end-query-substring
