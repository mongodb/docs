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

    auto db = client["sample_training"];
    auto collection = db["companies"];
    
    // Build the aggregation pipeline
    mongocxx::pipeline pipeline{};
    
    // $search stage
    pipeline.append_stage(make_document(
        kvp("$search", make_document(
            kvp("text", make_document(
                kvp("query", "Mobile"),
                kvp("path", "name"),
                kvp("score", make_document(
                    kvp("boost", make_document(
                        kvp("value", 1.6)
                    ))
                ))
            ))
        ))
    ));
    
    // $project stage
    pipeline.append_stage(make_document(
        kvp("$project", make_document(
            kvp("score", make_document(kvp("$meta", "searchScore"))),
            kvp("_id", 0),
            kvp("number_of_employees", 1),
            kvp("founded_year", 1),
            kvp("name", 1)
        ))
    ));
    
    // $set stage for source and source_count
    pipeline.append_stage(make_document(
        kvp("$set", make_document(
            kvp("source", "companies"),
            kvp("source_count", "$$SEARCH_META.count.lowerBound")
        ))
    ));
    
    // $limit stage
    pipeline.append_stage(make_document(
        kvp("$limit", 3)
    ));
    
    // Create the lookup pipeline for the $unionWith stage
    auto lookup_pipeline = mongocxx::pipeline{};
    
    lookup_pipeline.append_stage(make_document(
        kvp("$search", make_document(
            kvp("text", make_document(
                kvp("query", "mobile"),
                kvp("path", "business_name")
            ))
        ))
    ));
    
    lookup_pipeline.append_stage(make_document(
        kvp("$project", make_document(
            kvp("score", make_document(kvp("$meta", "searchScore"))),
            kvp("business_name", 1),
            kvp("address", 1),
            kvp("_id", 0)
        ))
    ));
    
    lookup_pipeline.append_stage(make_document(
        kvp("$limit", 3)
    ));
    
    lookup_pipeline.append_stage(make_document(
        kvp("$set", make_document(
            kvp("source", "inspections"),
            kvp("source_count", "$$SEARCH_META.count.lowerBound")
        ))
    ));
    
    lookup_pipeline.append_stage(make_document(
        kvp("$sort", make_document(
            kvp("score", -1)
        ))
    ));
    
    // Add $unionWith stage to the main pipeline
    pipeline.append_stage(make_document(
        kvp("$unionWith", make_document(
            kvp("coll", "inspections"),
            kvp("pipeline", lookup_pipeline.view_array())
        ))
    ));
    
    // Add $facet stage
    pipeline.append_stage(make_document(
        kvp("$facet", make_document(
            kvp("allDocs", make_array()),
            kvp("totalCount", make_array(
                make_document(
                    kvp("$group", make_document(
                        kvp("_id", "$source"),
                        kvp("firstCount", make_document(
                            kvp("$first", "$source_count")
                        ))
                    ))
                ),
                make_document(
                    kvp("$project", make_document(
                        kvp("totalCount", make_document(
                            kvp("$sum", "$firstCount")
                        ))
                    ))
                )
            ))
        ))
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
