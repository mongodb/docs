#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>
#include <mongocxx/pipeline.hpp>
#include <bsoncxx/builder/stream/document.hpp>
#include <bsoncxx/json.hpp>
#include <iostream>
#include <string>
#include <vector>

int main(int argc, char* argv[]) {
    try {
        // Initialize the MongoDB C++ driver
        mongocxx::instance instance{};

        // Connect to MongoDB
        mongocxx::uri uri("<connection-string>");
        mongocxx::client client(uri);

        // Get a handle on the collection
        mongocxx::database db = client["sample_mflix"];
        mongocxx::collection collection = db["movies"];

        // Build the aggregation pipeline using the stream builder
        using namespace bsoncxx::builder::stream;

        // Create pipeline stages
        auto search_stage = document{} << "$search" << open_document
            << "index" << "default"
            << "text" << open_document
                << "path" << "title"
                << "query" << "automobile"
                << "synonyms" << "transportSynonyms"
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

        // Execute the aggregation
        mongocxx::cursor cursor = collection.aggregate(pipeline);

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