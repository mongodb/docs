/*
To build:
brew install mongo-cxx-driver
clang++ -o indexes main.cpp -std=c++17 $(pkg-config --libs --cflags libmongocxx)
*/
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
    mongocxx::uri uri("<connectionString>");
    mongocxx::client client(uri);

    auto db = client["<databaseName>"];
    auto collection = db["<collectionName>"];
    
    {
        // start-single-field
        auto index_specification = make_document(kvp("<fieldName>", 1));
        auto result = collection.create_index(index_specification.view());

        std::cout << "Index created: " << bsoncxx::to_json(result) << std::endl;
        // end-single-field
    }
    {
        // start-compound-field
        auto index_specification = make_document(kvp("<fieldName1>", -1), kvp("<fieldName2>", -1));
        auto result = collection.create_index(index_specification.view());

        std::cout << "Index created: " << bsoncxx::to_json(result) << std::endl;
        // end-compound-field
    }
    {
        // start-remove-index
        collection.indexes().drop_one("<indexName>");

        std::cout << "Index dropped." << std::endl;
        // end-remove-index

        // start-remove-all-indexes
        collection.indexes().drop_all();

        std::cout << "All indexes removed." << std::endl;
        // end-remove-all-indexes
    }
    {
        // start-create-search-index
        // Create an index model with your index name and definition
        auto siv = collection.search_indexes();
        auto name = "<searchIndexName>";
        auto definition = make_document(kvp("mappings", make_document(kvp("dynamic", true))));
        auto model = mongocxx::search_index_model(name, definition.view());
    
        // Create the search index
        auto result = siv.create_one(model);
        std::cout << "New index name: " << result << std::endl;
        // end-create-search-index
    }
    {    
        // start-list-search-indexes
        auto siv = collection.search_indexes();
        auto result = siv.list(); 
        for (const auto &idx : result) {
            std::cout << bsoncxx::to_json(idx) << std::endl;
        }
        // end-list-search-indexes
    }
    {
        // start-update-search-index
        auto siv = collection.search_indexes();
        auto update_fields = make_document(kvp("<fieldName>", make_document(kvp("type", "<fieldType>"))));
        auto update_definition = make_document(kvp("mappings", make_document(kvp("dynamic", false), kvp("fields", update_fields))));
        siv.update_one("<searchIndexName>", update_definition.view());
        // end-update-search-index   
    }
    {
        // start-remove-search-index
        auto siv = collection.search_indexes();
        siv.drop_one("<searchIndexName>");
        // end-remove-search-index
    }
}