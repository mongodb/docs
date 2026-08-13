#include <bsoncxx/builder/basic/array.hpp>
#include <bsoncxx/builder/basic/document.hpp>
#include <bsoncxx/json.hpp>
#include <iostream>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/pipeline.hpp>
#include <mongocxx/uri.hpp>

using bsoncxx::builder::basic::kvp;
using bsoncxx::builder::basic::make_array;
using bsoncxx::builder::basic::make_document;

int main() {
  mongocxx::instance inst;

  // Replace the placeholder with your Atlas connection string
  const auto uri = mongocxx::uri{"<connection-string>"};

  // Connect to your cluster
  auto client = mongocxx::client{uri};
  auto collection = client["sample_mflix"]["movies"];

  // Define the pipeline with vectorSearch query options
  mongocxx::pipeline stages;

  stages
      .append_stage(make_document(kvp(
          "$vectorSearch",
          make_document(
              kvp("index", "autoembed_index"), kvp("path", "fullplot"),
              kvp("filter",
                  make_document(kvp(
                      "$and",
                      make_array(
                          make_document(
                              kvp("year", make_document(kvp("$gt", 1980)))),
                          make_document(
                              kvp("year", make_document(kvp("$lt", 2020)))),
                          make_document(kvp(
                              "genres",
                              make_document(kvp(
                                  "$in", make_array("Action", "Adventure",
                                                    "Family"))))))))),
              kvp("query",
                  make_document(kvp(
                      "text", "epic fantasy journey with reluctant heroes"))),
              kvp("numCandidates", 100), kvp("limit", 10)))))
      .project(make_document(
          kvp("_id", 0), kvp("title", 1), kvp("fullplot", 1), kvp("year", 1),
          kvp("genres", 1),
          kvp("score", make_document(kvp("$meta", "vectorSearchScore")))));

  // Run the query and print the results
  auto cursor = collection.aggregate(stages);

  for (auto&& doc : cursor) {
    std::cout << bsoncxx::to_json(doc) << std::endl;
  }

  return 0;
}
