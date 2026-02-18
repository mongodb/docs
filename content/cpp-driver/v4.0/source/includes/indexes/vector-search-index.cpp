#include <bsoncxx/builder/basic/document.hpp>
#include <iostream>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/search_index_view.hpp>
#include <mongocxx/uri.hpp>
#include <thread>

using bsoncxx::builder::basic::kvp;
using bsoncxx::builder::basic::make_array;
using bsoncxx::builder::basic::make_document;

int main() {
  try {
    mongocxx::instance inst{};

    // Replace the placeholder with your connection string
    const auto uri = mongocxx::uri{"<connection string>"};

    // Connect to your cluster
    mongocxx::client conn{uri};
    auto db = conn["sample_mflix"];
    auto collection = db["embedded_movies"];

    auto siv = collection.search_indexes();
    // Create a vector search index
    // start-create-vector-search-index
    // Define the index model with an index name and a definition document
    auto model = mongocxx::search_index_model(
      "<vectorSearchIndexName>",
      make_document(
          kvp("fields",
              make_array(make_document(
                  kvp("type", "vector"),
                  kvp("path", "<fieldName>"),
                  kvp("numDimensions", 2048),
                  kvp("similarity", "dotProduct"),
                  kvp("quantization", "scalar"))))));
    model.type("vectorSearch");

    // Creates the vector search index
    auto result = siv.create_one(model);
    std::cout << "New vector search index name: " << result << std::endl;
    // end-create-vector-search-index

    // start-list-all
    auto cursor = siv.list(); 
    for (auto const& doc : siv.list()) {
        std::cout << bsoncxx::to_json(doc) << std::endl;
    }
    // end-list-all

    // start-list-one
    for (auto const& doc : siv.list("vector_index")) {
        std::cout << bsoncxx::to_json(doc) << std::endl;
    }
    // end-list-one

    // start-update-vector-search-index
    auto definition = make_document(
      kvp("fields",
          make_array(make_document(
              kvp("type", "vector"), kvp("path", "plot_embedding_voyage_3_large"),
              kvp("numDimensions", 2048), kvp("similarity", "euclidean"), 
              kvp("quantization", "binary")))));

    siv.update_one("vector_index", definition.view());
    // end-update-vector-search-index

    // start-drop-vector-search-index   
    siv.drop_one("vector_index");
    // end-drop-vector-search-index

}
