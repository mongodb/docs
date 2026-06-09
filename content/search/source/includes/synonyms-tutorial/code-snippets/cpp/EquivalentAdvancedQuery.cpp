#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>
#include <mongocxx/pipeline.hpp>
#include <bsoncxx/json.hpp>
#include <bsoncxx/builder/stream/document.hpp>
#include <bsoncxx/builder/stream/array.hpp>
#include <bsoncxx/exception/exception.hpp>
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

        // Use C++ stream builders for BSON documents
        using bsoncxx::builder::stream::document;
        using bsoncxx::builder::stream::open_document;
        using bsoncxx::builder::stream::close_document;
        using bsoncxx::builder::stream::open_array;
        using bsoncxx::builder::stream::close_array;
        using bsoncxx::builder::stream::finalize;
        using bsoncxx::builder::stream::array;

        // Create the first text search clause for automobile
        auto text1 = document{} << "text" << open_document
            << "path" << "title"
            << "query" << "automobile"
            << "synonyms" << "transportSynonyms"
            << close_document << finalize;

        // Create the second text search clause for attire
        auto text2 = document{} << "text" << open_document
            << "path" << "title"
            << "query" << "attire"
            << "synonyms" << "attireSynonyms"
            << close_document << finalize;

        // Create the should array for compound search
        auto should_array = array{} 
            << text1.view()
            << text2.view()
            << finalize;

        // Create pipeline stages
        auto search_stage = document{} << "$search" << open_document
            << "index" << "default"
            << "compound" << open_document
                << "should" << should_array.view()
            << close_document
        << close_document << finalize;

        auto limit_stage = document{} << "$limit" << 10 << finalize;

        auto project_stage = document{} << "$project" << open_document
            << "title" << 1
            << "_id" << 0
            << "score" << open_document
                << "$meta" << "searchScore"
            << close_document
        << close_document << finalize;

        // Create the pipeline using mongocxx::pipeline
        mongocxx::pipeline pipeline;
        pipeline.append_stage(search_stage.view());
        pipeline.append_stage(limit_stage.view());
        pipeline.append_stage(project_stage.view());

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