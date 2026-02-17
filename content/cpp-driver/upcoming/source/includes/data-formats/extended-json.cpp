#include <iostream>

#include <bsoncxx/builder/basic/document.hpp>
#include <bsoncxx/json.hpp>

using bsoncxx::builder::basic::kvp;

int main() {

  {
    // Creates a BSON document from Extended JSON
    // start-ex-json-read
    bsoncxx::document::value doc = bsoncxx::from_json(R"(
            {
                "_id": {"$oid": "507f1f77bcf86cd799439011"},
                "myNumber": {"$numberLong": "4794261"}
            }
        )");
    // end-ex-json-read
  }

  {
    // Creates a BSON document and converts to Extended JSON
    // start-ex-json-write
    bsoncxx::builder::basic::document doc_builder;
    doc_builder.append(kvp("myNumber", 11223344));
    doc_builder.append(kvp("myString", "String value"));

    bsoncxx::document::value doc = doc_builder.extract();
    std::string json_str =
        bsoncxx::to_json(doc, bsoncxx::ExtendedJsonMode::k_canonical);
    std::cout << json_str << std::endl;
    // end-ex-json-write
  }
}