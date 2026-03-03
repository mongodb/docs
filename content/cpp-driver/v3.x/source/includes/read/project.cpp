#include <iostream>

#include <bsoncxx/builder/basic/document.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
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

    // Retrieves documents matching the "name" field query and projects their "name", "cuisine", and "borough" values
    // start-project-include
    mongocxx::options::find opts{};
    opts.projection(make_document(kvp("name", 1), kvp("cuisine", 1), kvp("borough", 1)));

    auto cursor = collection.find(make_document(kvp("name", "Emerald Pub")), opts);
    for(auto&& doc : cursor) {
        std::cout << bsoncxx::to_json(doc) << std::endl;
    }
    // end-project-include

    // Retrieves documents matching the "name" field query
    // and projects their "name", "cuisine", and "borough" values while excluding the "_id" values
    // start-project-include-without-id
    mongocxx::options::find opts{};
    opts.projection(make_document(kvp("_id", 0), kvp("name", 1), kvp("cuisine", 1), kvp("borough", 1)));

    auto cursor = collection.find(make_document(kvp("name", "Emerald Pub")), opts);
    for(auto&& doc : cursor) {
        std::cout << bsoncxx::to_json(doc) << std::endl;
    }
    // end-project-include-without-id

    // Retrieves documents matching the "name" field query and excludes their "grades" and "address" values when printing
    // start-project-exclude
    mongocxx::options::find opts{};
    opts.projection(make_document(kvp("grades", 0), kvp("address", 0)));

    auto cursor = collection.find(make_document(kvp("name", "Emerald Pub")), opts);
    for(auto&& doc : cursor) {
        std::cout << bsoncxx::to_json(doc) << std::endl;
    }
    // end-project-exclude

}
