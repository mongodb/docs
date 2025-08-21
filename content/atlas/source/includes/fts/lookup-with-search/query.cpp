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

    auto db = client["sample_analytics"];
    auto collection = db["customers"];
    
    // Build the aggregation pipeline
    mongocxx::pipeline pipeline{};
    
    // Create documents for the lookup pipeline stages
    auto search_doc = make_document(
        kvp("$search", make_document(
            kvp("index", "lookup-with-search-tutorial"),
            kvp("compound", make_document(
                kvp("must", make_array(
                    make_document(
                        kvp("queryString", make_document(
                            kvp("defaultPath", "products"),
                            kvp("query", "products: (CurrencyService AND InvestmentStock)")
                        ))
                    )
                )),
                kvp("should", make_array(
                    make_document(
                        kvp("range", make_document(
                            kvp("path", "limit"),
                            kvp("gte", 5000),
                            kvp("lte", 10000)
                        ))
                    )
                ))
            ))
        ))
    );
    
    
    auto limit_doc = make_document(kvp("$limit", 5));
    
    auto project_doc = make_document(
        kvp("$project", make_document(
            kvp("_id", 0),
            kvp("address", 0),
            kvp("birthdate", 0),
            kvp("username", 0),
            kvp("tier_and_details", 0)
        ))
    );
    
    auto lookup_pipeline_array = make_array(
        search_doc.view(),
        limit_doc.view(),
        project_doc.view()
    );
    
    pipeline.append_stage(make_document(
        kvp("$lookup", make_document(
            kvp("from", "accounts"),
            kvp("localField", "accounts"),
            kvp("foreignField", "account_id"),
            kvp("as", "purchases"),
            kvp("pipeline", lookup_pipeline_array.view())
        ))
    ));
    
    // Add $limit stage to the main pipeline
    pipeline.limit(5);
    
    // Add $project stage to the main pipeline
    pipeline.project(make_document(
        kvp("_id", 0),
        kvp("address", 0),
        kvp("birthdate", 0),
        kvp("username", 0),
        kvp("tier_and_details", 0)
    ));
    
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