#include <iostream>
#include <bsoncxx/builder/stream/document.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/exception/exception.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/pipeline.hpp>

using bsoncxx::builder::stream::close_array;
using bsoncxx::builder::stream::close_document;
using bsoncxx::builder::stream::document;
using bsoncxx::builder::stream::finalize;
using bsoncxx::builder::stream::open_array;
using bsoncxx::builder::stream::open_document;

int main() {
    // Initialize the MongoDB C++ driver
    mongocxx::instance instance{};
    
    try {
        // Connect to your Atlas cluster
        const std::string uri = "<connection-string>";
        mongocxx::client client{mongocxx::uri{uri}};

        // Set namespace
        auto database = client["sample_mflix"];
        auto collection = database["movies"];

        // Define pipeline
        mongocxx::pipeline pipeline{};
        
        // Add $search stage
        pipeline.search(document{} 
            << "index" << "partial-match-tutorial-autocomplete"
            << "autocomplete" << open_document
                << "query" << "Great"
                << "path" << "title"
            << close_document
            << finalize);
        
        // Add $limit stage
        pipeline.limit(10);
        
        // Add $project stage
        pipeline.project(document{} 
            << "_id" << 0
            << "title" << 1
            << finalize);

        // Run pipeline
        auto cursor = collection.aggregate(pipeline);

        // Print results
        for (auto&& doc : cursor) {
            std::cout << bsoncxx::to_json(doc) << std::endl;
        }

    } catch (const mongocxx::exception& e) {
        std::cerr << "MongoDB error: " << e.what() << std::endl;
        return 1;
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
        return 1;
    }

    return 0;
}
