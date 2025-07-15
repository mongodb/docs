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

    {
        // Deletes a document that has a "name" value of "Ready Penny Inn"
        // start-delete-one
        auto result = collection.delete_one(make_document(kvp("name", "Ready Penny Inn")));
        // end-delete-one
    }

    {
        // Deletes documents that have a "borough" value of "Brooklyn"
        // start-delete-many
        auto result = collection.delete_many(make_document(kvp("borough", "Brooklyn")));
        // end-delete-many
    }

    {

        // Deletes matching documents and attaches a comment to the operation
        // start-delete-options
        mongocxx::options::delete_options opts{};
        opts.comment(bsoncxx::types::bson_value::view_or_value{"Deleting Mongo restaurants"});

        auto query_filter = make_document(kvp("name", make_document(kvp("$regex", "Mongo"))));
        auto result = collection.delete_many(query_filter.view(), opts);
        // end-delete-options
    }

    {
        // Deletes and prints the number of documents that have a "cuisine" value of "Greek"
        // start-delete-count
        auto result = collection.delete_many(make_document(kvp("cuisine", "Greek")));
        std::cout << result->deleted_count() << std::endl;
        // end-delete-count
    }

}