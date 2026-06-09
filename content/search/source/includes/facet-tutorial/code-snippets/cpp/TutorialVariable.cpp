#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>
#include <mongocxx/pipeline.hpp>
#include <bsoncxx/json.hpp>
#include <bsoncxx/builder/stream/document.hpp>
#include <bsoncxx/builder/stream/array.hpp>
#include <bsoncxx/exception/exception.hpp>
#include <bsoncxx/types.hpp>
#include <iostream>
#include <string>
#include <chrono>

int main(int argc, char* argv[]) {
    try {
        // Initialize the MongoDB C++ Driver
        mongocxx::instance instance{};

        // Connect to MongoDB
        mongocxx::uri uri("<connection-string>");
        mongocxx::client client(uri);

        // Get a handle on the collection
        mongocxx::database db = client["sample_mflix"];
        mongocxx::collection collection = db["movies"];

        using bsoncxx::builder::stream::document;
        using bsoncxx::builder::stream::open_document;
        using bsoncxx::builder::stream::close_document;
        using bsoncxx::builder::stream::open_array;
        using bsoncxx::builder::stream::close_array;
        using bsoncxx::builder::stream::finalize;
        using bsoncxx::builder::stream::array;

        std::chrono::system_clock::time_point origin_date = 
            std::chrono::system_clock::from_time_t(-1520035200);

        // Create the boundaries array for yearFacet
        auto boundaries_array = array{} << 1910 << 1920 << 1930 << 1940 << finalize;

        using namespace bsoncxx::builder::basic;

        // Create the search stage with facet
        try {
            auto search_stage_basic = make_document(
                kvp("$search", make_document(
                    kvp("index", "facet-tutorial"),
                    kvp("facet", make_document(
                        kvp("operator", make_document(
                            kvp("near", make_document(
                                kvp("path", "released"),
                                kvp("origin", bsoncxx::types::b_date{origin_date}),
                                kvp("pivot", bsoncxx::types::b_int64{7776000000})
                            ))
                        )),
                        kvp("facets", make_document(
                            kvp("genresFacet", make_document(
                                kvp("path", "genres"),
                                kvp("type", "string")
                            )),
                            kvp("yearFacet", make_document(
                                kvp("path", "year"),
                                kvp("type", "number"),
                                kvp("boundaries", [&boundaries_array](sub_array array_builder) {
                                    array_builder.append(1910);
                                    array_builder.append(1920);
                                    array_builder.append(1930);
                                    array_builder.append(1940);
                                })
                            ))
                        ))
                    ))
                ))
            );

            // Create the facet stage
            auto facet_stage_basic = make_document(
                kvp("$facet", make_document(
                    kvp("meta", [](sub_array array_builder) {
                        array_builder.append(make_document(
                            kvp("$replaceWith", "$$SEARCH_META")
                        ));
                        array_builder.append(make_document(
                            kvp("$limit", 1)
                        ));
                    })
                ))
            );

            // Create the set stage
            auto set_stage_basic = make_document(
                kvp("$set", make_document(
                    kvp("meta", make_document(
                        kvp("$arrayElemAt", [](sub_array array_builder) {
                            array_builder.append("$meta");
                            array_builder.append(0);
                        })
                    ))
                ))
            );

            // Create the pipeline using mongocxx::pipeline
            mongocxx::pipeline pipeline;
            pipeline.append_stage(search_stage_basic.view());
            pipeline.append_stage(facet_stage_basic.view());
            pipeline.append_stage(set_stage_basic.view());

            // Set options (max time 5 seconds = 5000 ms)
            mongocxx::options::aggregate options;
            options.max_time(std::chrono::milliseconds(5000));

            // Execute the aggregation
            mongocxx::cursor cursor = collection.aggregate(pipeline, options);

            // Process and display the results
            for (auto&& doc : cursor) {
                std::cout << bsoncxx::to_json(doc) << std::endl;
            }
        }
        catch (const bsoncxx::exception& e) {
            std::cerr << "BSON Error: " << e.what() << std::endl;
        }

        return EXIT_SUCCESS;
        
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
        return EXIT_FAILURE;
    }
}
