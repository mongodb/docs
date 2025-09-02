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

        // Create the search stage with facet
        auto search_stage = document{} << "$searchMeta" << open_document
            << "index" << "facet-tutorial"
            << "facet" << open_document
                << "operator" << open_document
                    << "near" << open_document
                        << "path" << "released"
                        << "origin" << bsoncxx::types::b_date{origin_date}
                        << "pivot" << bsoncxx::types::b_int64{7776000000}
                    << close_document
                << close_document
                << "facets" << open_document
                    << "genresFacet" << open_document
                        << "path" << "genres"
                        << "type" << "string"
                    << close_document
                    << "yearFacet" << open_document
                        << "path" << "year"
                        << "type" << "number"
                        << "boundaries" << boundaries_array.view()
                    << close_document
                << close_document
            << close_document
        << close_document << finalize;

        // Create the pipeline using mongocxx::pipeline
        mongocxx::pipeline pipeline;
        pipeline.append_stage(search_stage.view());

        // Set options (max time 5 seconds = 5000 ms)
        mongocxx::options::aggregate options;
        options.max_time(std::chrono::milliseconds(5000));

        // Execute the aggregation
        mongocxx::cursor cursor = collection.aggregate(pipeline, options);

        // Process and display the results
        for (auto&& doc : cursor) {
            std::cout << bsoncxx::to_json(doc) << std::endl;
        }

        return EXIT_SUCCESS;
        
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
        return EXIT_FAILURE;
    }
}