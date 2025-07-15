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
    auto db = client["sample_restaurants"];
    auto collection = db["restaurants"];
    // end-db-coll

    // Inserts a document that stores a "name" value of "Mongo's Burgers" into the collection
    // start-insert-one
    auto result = collection.insert_one(make_document(kvp("name", "Mongo's Burgers")));
    // end-insert-one

    // Inserts documents representing restaurants into the collection
    // start-insert-many
    std::vector<bsoncxx::document::value> restaurants;
    restaurants.push_back(make_document(kvp("name", "Mongo's Burgers")));
    restaurants.push_back(make_document(kvp("name", "Mongo's Pizza")));

    auto result = collection.insert_many(restaurants);
    // end-insert-many

    // Inserts multiple documents and instructs the insert operation to skip document-level validation
    // start-modify
    std::vector<bsoncxx::document::value> docs;
    docs.push_back(make_document(kvp("name", "Mongo's Burgers")));
    docs.push_back(make_document(kvp("name", "Mongo's Pizza")));
    docs.push_back(make_document(kvp("name", "Mongo's Tacos")));

    mongocxx::options::insert opts;
    opts.bypass_document_validation(true);

    auto result = collection.insert_many(docs, opts);
    // end-modify

}