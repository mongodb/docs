#include <iostream>
#include <bsoncxx/builder/stream/document.hpp>
#include <bsoncxx/builder/stream/array.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>
#include <mongocxx/exception/exception.hpp>

using bsoncxx::builder::stream::document;
using bsoncxx::builder::stream::array;
using bsoncxx::builder::stream::open_document;
using bsoncxx::builder::stream::close_document;
using bsoncxx::builder::stream::open_array;
using bsoncxx::builder::stream::close_array;
using bsoncxx::builder::stream::finalize;

int main() {
    try {
        // Initialize the MongoDB C++ driver
        mongocxx::instance instance{};
        
        // Create a MongoDB client
        const auto uri = mongocxx::uri{"<connection-string>"};
        mongocxx::client client{uri};
        
        // Get the sample_mflix database
        auto db = client["sample_mflix"];
        
        // Create the transport_synonyms collection
        try {
            db.create_collection("transport_synonyms");
        } catch (const mongocxx::exception& e) {
            // Collection may already exist, which is fine
            std::cerr << "Note: " << e.what() << std::endl;
        }
        
        auto transport_collection = db["transport_synonyms"];
        
        // Create and insert the first transport document - equivalent mapping
        auto doc1 = document{}
            << "mappingType" << "equivalent"
            << "synonyms" << open_array
                << "car" << "vehicle" << "automobile"
            << close_array
            << finalize;
                
        transport_collection.insert_one(doc1.view());
        
        // Create and insert the second transport document - explicit mapping
        auto doc2 = document{}
            << "mappingType" << "explicit"
            << "input" << open_array
                << "boat"
            << close_array
            << "synonyms" << open_array
                << "boat" << "vessel" << "sail"
            << close_array
            << finalize;
                
        transport_collection.insert_one(doc2.view());
        
        // Create the attire_synonyms collection
        try {
            db.create_collection("attire_synonyms");
        } catch (const mongocxx::exception& e) {
            // Collection may already exist, which is fine
            std::cerr << "Note: " << e.what() << std::endl;
        }
        
        auto attire_collection = db["attire_synonyms"];
        
        // Create and insert the first attire document - equivalent mapping
        auto doc3 = document{}
            << "mappingType" << "equivalent"
            << "synonyms" << open_array
                << "dress" << "apparel" << "attire"
            << close_array
            << finalize;
                
        attire_collection.insert_one(doc3.view());
        
        // Create and insert the second attire document - explicit mapping
        auto doc4 = document{}
            << "mappingType" << "explicit"
            << "input" << open_array
                << "hat"
            << close_array
            << "synonyms" << open_array
                << "hat" << "fedora" << "headgear"
            << close_array
            << finalize;
                
        attire_collection.insert_one(doc4.view());
        
        std::cout << "Synonyms collections successfully created and populated." << std::endl;
        
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
        return EXIT_FAILURE;
    }
    
    return EXIT_SUCCESS;
}
