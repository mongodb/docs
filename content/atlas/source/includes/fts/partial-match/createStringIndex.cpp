#include <iostream>
#include <bsoncxx/builder/stream/document.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/exception/exception.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/options/index.hpp>

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
        // Connect to your Atlas deployment
        const std::string uri = "<connection-string>";
        mongocxx::client client{mongocxx::uri{uri}};

        // Set namespace
        auto database = client["sample_mflix"];
        auto collection = database["movies"];

    // Define your MongoDB Search index
        auto index_doc = document{} 
            << "name" << "partial-match-tutorial"
            << "definition" << open_document
                << "mappings" << open_document
                    << "dynamic" << false
                    << "fields" << open_document
                        << "title" << open_document
                            << "type" << "string"
                        << close_document
                    << close_document
                << close_document
            << close_document
            << finalize;

        // Create the search index
        auto result = collection.create_search_index(index_doc.view());
        
        std::cout << "New index name: " << bsoncxx::to_json(result) << std::endl;

    } catch (const mongocxx::exception& e) {
        std::cerr << "MongoDB error: " << e.what() << std::endl;
        return 1;
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
        return 1;
    }

    return 0;
}
