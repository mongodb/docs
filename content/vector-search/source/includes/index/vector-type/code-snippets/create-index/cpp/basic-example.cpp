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
  mongocxx::instance inst;

  // Connect to your deployment
  const auto uri = mongocxx::uri{"<connectionString>"};
  mongocxx::client conn{uri};

  // Access your database and collection
  auto collection = conn["sample_mflix"]["embedded_movies"];

  auto siv = collection.search_indexes();
  auto name = "vector_index";

  // Index the vector embeddings field for vector search
  auto definition = make_document(
      kvp("fields",
          make_array(make_document(
              kvp("type", "vector"),
              kvp("path", "plot_embedding_voyage_3_large"),
              kvp("numDimensions", 2048),
              kvp("similarity", "dotProduct"),
              kvp("quantization", "scalar")))));
  auto model =
      mongocxx::search_index_model(name, definition.view())
          .type("vectorSearch");

  // Create the search index
  siv.create_one(model);
  std::cout << "New search index named " << name << " is building."
            << std::endl;

  // Wait for initial sync to complete
  std::cout << "Polling to check if the index is ready. This may take up to "
               "a minute."
            << std::endl;
  bool queryable = false;
  while (!queryable) {
    auto indexes = siv.list();
    for (const auto& index : indexes) {
      const auto n = index["name"];
      const auto q = index["queryable"];
      if (n && q && n.get_string().value == name) {
        queryable = q.get_bool().value;
      }
    }
    if (!queryable) {
      std::this_thread::sleep_for(std::chrono::seconds(5));
    }
  }
  std::cout << name << " is ready for querying." << std::endl;
  return 0;
}
