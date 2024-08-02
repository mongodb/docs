#include <chrono>
#include <iostream>
#include <thread>

#include <bsoncxx/builder/basic/document.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/collection.hpp>
#include <mongocxx/database.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/options/find.hpp>
#include <mongocxx/uri.hpp>

using bsoncxx::builder::basic::document;
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
        // Iterates over and prints all documents that have a "name" value of "Dunkin' Donuts"
        // start-cursor-all
        auto cursor = collection.find(make_document(kvp("name", "Dunkin' Donuts")));
        for(auto&& doc : cursor) {
            std::cout << bsoncxx::to_json(doc) << std::endl;
        }
        // end-cursor-all
    }

    {
        // Retrieves and prints the first document stored in the cursor
        // start-cursor-first
        auto cursor = collection.find(make_document(kvp("name", "Dunkin' Donuts")));
        auto doc = cursor.begin();
        std::cout << bsoncxx::to_json(*doc) << std::endl;
        // end-cursor-first
    }

    {
        // Creates a collection with a maximum size and inserts documents representing vegetables
        // start-capped-coll
        auto db = client["db"];
        auto collection = db.create_collection("vegetables", make_document(kvp("capped", true), kvp("size", 1024 * 1024)));
        
        std::vector<bsoncxx::document::value> vegetables;
        vegetables.push_back(make_document(kvp("name", "cauliflower")));
        vegetables.push_back(make_document(kvp("name", "zucchini")));

        auto result = collection.insert_many(vegetables);
        // end-capped-coll
        
        // Iterates over the initial query results and continues iterating until three documents are stored in the cursor
        // by using a tailable cursor
        // start-tailable
        mongocxx::options::find opts{};
        opts.cursor_type(mongocxx::cursor::type::k_tailable);
        auto cursor = collection.find({}, opts);

        int docs_found = 0;
        while (docs_found < 3) {
            for (auto&& doc : cursor) {
                std::cout << bsoncxx::to_json(doc) << std::endl;
                docs_found++;
            }

            // Sleeps for 100 milliseconds before trying to access more documents
            std::this_thread::sleep_for(std::chrono::milliseconds(100));
        }
        // end-tailable
    }

}