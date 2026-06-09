#include <iostream>

#include <bsoncxx/builder/basic/document.hpp>
#include <bsoncxx/builder/basic/array.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>
#include <mongocxx/pipeline.hpp>

using bsoncxx::builder::basic::kvp;
using bsoncxx::builder::basic::make_document;
using bsoncxx::builder::basic::make_array;

int main() {
    // Initialize the MongoDB C++ driver
    mongocxx::instance instance{};
    
    // Connect to your MongoDB deployment
    mongocxx::uri uri("<connection-string>");
    mongocxx::client client(uri);

    auto db = client["sample_supplies"];
    auto collection = db["monthlyPhoneTransactions"];
    
    // Build the aggregation pipeline
    mongocxx::pipeline pipeline{};
    
    // Create the $search stage
    auto search_doc = make_document(
        kvp("$search", make_document(
            kvp("index", "monthlySalesIndex"),
            kvp("range", make_document(
                kvp("gt", 10000),
                kvp("path", make_array("sales_price"))
            ))
        ))
    );
    
    // Create the $count stage
    auto count_doc = make_document(
        kvp("$count", "months_w_over_10000")
    );
    
    // Add stages to the pipeline
    pipeline.append_stage(search_doc.view());
    pipeline.append_stage(count_doc.view());
    
    try {
        // Run the aggregation pipeline and print results
        auto cursor = collection.aggregate(pipeline);

        // Process and print the results
        for (auto&& doc : cursor) {
            std::cout << bsoncxx::to_json(doc) << std::endl;
        }
    } catch (const std::exception& e) {
        std::cerr << "Error executing query: " << e.what() << std::endl;
    }
    
    return 0;
}
