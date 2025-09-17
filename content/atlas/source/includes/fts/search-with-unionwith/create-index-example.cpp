#include <iostream>

#include <bsoncxx/builder/basic/document.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>

using bsoncxx::builder::basic::kvp;
using bsoncxx::builder::basic::make_document;

int main() {
    // Initialize the MongoDB C++ driver
    mongocxx::instance instance{};
    
    // Connect to your MongoDB deployment
    mongocxx::uri uri("<connection-string>");
    mongocxx::client client(uri);

    auto db = client["sample_training"];
    
    // First index on companies collection
    auto companies = db["companies"];
    auto companies_siv = companies.search_indexes();

    // Create the MongoDB Search index definition for companies
    auto name = "default";
    auto definition = make_document(
        kvp("mappings", make_document(
            kvp("dynamic", true)
        ))
    );
    auto model = mongocxx::search_index_model(name, definition.view());

    try {
        // Execute the command to create the index on companies
        auto result = companies_siv.create_one(model);
        std::cout << "New index name for companies: " << result << std::endl;
    } catch (const std::exception& e) {
        std::cerr << "Error creating Atlas Search index for companies: " << e.what() << std::endl;
    }
    
    // Second index on inspections collection
    auto inspections = db["inspections"];
    auto inspections_siv = inspections.search_indexes();

    try {
        // Execute the command to create the index on inspections
        auto result = inspections_siv.create_one(model);
        std::cout << "New index name for inspections: " << result << std::endl;
    } catch (const std::exception& e) {
        std::cerr << "Error creating Atlas Search index for inspections: " << e.what() << std::endl;
    }
}
