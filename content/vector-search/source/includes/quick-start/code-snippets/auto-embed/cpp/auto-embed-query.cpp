#include <bsoncxx/builder/basic/document.hpp>
#include <bsoncxx/json.hpp>
#include <iostream>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/pipeline.hpp>
#include <mongocxx/uri.hpp>

using bsoncxx::builder::basic::kvp;
using bsoncxx::builder::basic::make_document;

int main() {
  try {
    mongocxx::instance inst{};

    // Replace the placeholder with your connection string
    const auto uri = mongocxx::uri{"<connection-string>"};

    // Connect to your cluster
    auto client = mongocxx::client{uri};
    auto db = client["sample_mflix"];
    auto collection = db["movies"];

    // Define the pipeline with vectorSearch query options
    mongocxx::pipeline stages;

    stages
        .append_stage(make_document(kvp(
            "$vectorSearch",
            make_document(
                kvp("index", "autoembed_index"), kvp("path", "fullplot"),
                kvp("query", make_document(kvp(
                                 "text", "journey through the country side"))),
                kvp("numCandidates", 100), kvp("model", "voyage-4"),
                kvp("limit", 10)))))
        .project(make_document(
            kvp("_id", 0), kvp("title", 1), kvp("fullplot", 1),
            kvp("score", make_document(kvp("$meta", "vectorSearchScore")))));

    auto cursor = collection.aggregate(stages);

    for (auto&& doc : cursor) {
      std::cout << bsoncxx::to_json(doc) << std::endl;
    }
  } catch (const std::exception& e) {
    std::cout << "Exception: " << e.what() << std::endl;
  }
  return 0;
}
