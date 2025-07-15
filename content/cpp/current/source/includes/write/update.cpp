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
        // Updates the "name" value of a document from "Bagels N Buns" to "2 Bagels 2 Buns"
        // start-update-one
        auto query_filter = make_document(kvp("name", "Bagels N Buns"));
        auto update_doc = make_document(kvp("$set", make_document(kvp("name", "2 Bagels 2 Buns"))));

        auto result = collection.update_one(query_filter.view(), update_doc.view());
        // end-update-one
    }

    {
        // Updates the "cuisine" value of documents from "Pizza" to "Pasta"
        // start-update-many
        auto query_filter = make_document(kvp("cuisine", "Pizza"));
        auto update_doc = make_document(kvp("$set", make_document(kvp("cuisine", "Pasta"))));

        auto result = collection.update_many(query_filter.view(), update_doc.view());
        // end-update-many
    }

    {

        // Updates the "borough" value of matching documents and inserts a document if none match
        // start-update-options
        mongocxx::options::update opts{};
        opts.upsert(true);

        auto query_filter = make_document(kvp("borough", "Manhattan"));
        auto update_doc = make_document(kvp("$set", make_document(kvp("borough", "Manhattan (north)"))));

        auto result = collection.update_many(query_filter.view(), update_doc.view(), opts);
        // end-update-options
    }

    {

        // Updates the "name" value of matching documents and prints the number of updates
        // start-update-result
        auto query_filter = make_document(kvp("name", "Dunkin' Donuts"));
        auto update_doc = make_document(kvp("$set", make_document(kvp("name", "Dunkin'"))));

        auto result = collection.update_many(query_filter.view(), update_doc.view());
        std::cout << "Modified documents: " << result->modified_count() << std::endl;
        // end-update-result
    }
}