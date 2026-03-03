#include <cstdint>
#include <iostream>
#include <vector>

#include <bsoncxx/builder/basic/document.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>

using bsoncxx::builder::basic::kvp;
using bsoncxx::builder::basic::make_document;
using bsoncxx::builder::basic::make_array;

int main() {
    mongocxx::instance instance;
    mongocxx::uri uri("<connection string>");
    mongocxx::client client(uri);
    auto db = client["db"];
    auto collection = db["coll"];

    {
        // Retrieves one document that matches a query filter
        // start-find-one
        auto result = collection.find_one(make_document(kvp("<field name>", "<value>")));
        std::cout << bsoncxx::to_json(*result) << std::endl;
        // end-find-one
    }

    {
        // Retrieves all documents that match a query filter
        // start-find-multiple
        auto results = collection.find(make_document(kvp("<field name>", "<value>")));
        for(auto&& doc : results) {
            std::cout << bsoncxx::to_json(doc) << std::endl;
        }
        // end-find-multiple
    }

    {
        // Counts the number of documents in a collection
        // start-count
        auto result = collection.count_documents({});
        std::cout << result << std::endl;
        // end-count
    }

    {
        // Counts the number of documents that match a query filter
        // start-count-query
        auto result = collection.count_documents(make_document(kvp("<field name>", "<value>")));
        std::cout << result << std::endl;
        // end-count-query
    }

    {
        // Estimates the number of documents in the collection
        // start-count-estimate
        auto result = collection.estimated_document_count();
        std::cout << result << std::endl;
        // end-count-estimate
    }

    {
        // Retrieves distinct values of a specified field
        // start-distinct
        auto results = collection.distinct("<field name>", "<filter>");
        for(auto&& doc : results) {
            std::cout << bsoncxx::to_json(doc) << std::endl;
        }
        // end-distinct
    }

    {
        // Monitors and prints data changes to the collection
        // start-change-stream
        auto stream = collection.watch();
        while (true) {
            for (const auto& event : stream) {
                std::cout << bsoncxx::to_json(event) << std::endl;
            }
        }
        // end-change-stream
    }
}