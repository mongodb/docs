#include <cstdint>
#include <iostream>
#include <vector>

#include <bsoncxx/builder/basic/document.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/stdx.hpp>
#include <mongocxx/uri.hpp>

using bsoncxx::builder::basic::kvp;
using bsoncxx::builder::basic::make_document;

int main() {
    mongocxx::instance instance;
    mongocxx::uri uri("<connection string>");
    mongocxx::client client(uri);

    // start-db-coll
    auto db = client["sample_training"];
    auto collection = db["companies"];
    // end-db-coll

    // Retrieves and prints one document that has a "name" value of "LinkedIn"
    // start-find-one
    auto result = collection.find_one(make_document(kvp("name", "LinkedIn")));
    std::cout << bsoncxx::to_json(*result) << std::endl;
    // end-find-one

    // Retrieves documents that have a "founded_year" value of 1970
    // start-find-many
    auto cursor = collection.find(make_document(kvp("founded_year", 1970)));
    // end-find-many

    // Retrieves and prints documents that have a "founded_year" value of 1970
    // start-cursor
    auto cursor = collection.find(make_document(kvp("founded_year", 1970)));
    for(auto&& doc : cursor) {
        std::cout << bsoncxx::to_json(doc) << std::endl;
    }
    // end-cursor
 
    // Retrieves and prints 5 documents that have a "number_of_employees" value of 1000
    // start-modify
    mongocxx::options::find opts;
    opts.limit(5);
    auto cursor = collection.find(make_document(kvp("number_of_employees", 1000)), opts);
    // end-modify
}
