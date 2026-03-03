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
        // Monitors and prints changes to the "restaurants" collection
        // start-open-change-stream
        auto stream = collection.watch();
        while (true) {
            for (const auto& event : stream) {
                std::cout << bsoncxx::to_json(event) << std::endl;
            }
        }
        // end-open-change-stream
    }

    {
        // Updates a document that has a "name" value of "Blarney Castle"
        // start-update-for-change-stream
        auto result = collection.update_one(make_document(kvp("name", "Blarney Castle")), 
                                            make_document(kvp("$set", 
                                            make_document(kvp("cuisine", "Irish")))));
        // end-update-for-change-stream
    }

    {
        // Passes a pipeline argument to watch() to monitor only update operations
        // start-change-stream-pipeline
        mongocxx::pipeline pipeline;
        pipeline.match(make_document(kvp("operationType", "update")));
        auto stream = collection.watch(pipeline);
        
        while (true) {
            for (const auto& event : stream) {
                std::cout << bsoncxx::to_json(event) << std::endl;
            }
        }
        // end-change-stream-pipeline
    }

    {
        // Passes an options argument to watch() to include the post-image of updated documents
        // start-change-stream-post-image
        mongocxx::options::change_stream opts;
        opts.full_document("updateLookup");
        auto stream = collection.watch(opts);
        
        while (true) {
            for (const auto& event : stream) {
                std::cout << bsoncxx::to_json(event) << std::endl;
            }
        }
        // end-change-stream-post-image
    }
    
}