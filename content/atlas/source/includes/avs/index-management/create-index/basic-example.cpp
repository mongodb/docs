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

    // Replace the placeholder with your Atlas connection string
    const auto uri = mongocxx::uri{"<connection-string>"};

    // Connect to your Atlas cluster
    mongocxx::client conn{uri};
    auto db = conn["sample_mflix"];
    auto collection = db["embedded_movies"];

    auto siv = collection.search_indexes();
    std::string name = "vector_index";
    auto type = "vectorSearch";
    auto definition = make_document(
        kvp("fields",
            make_array(make_document(
                kvp("type", "vector"), kvp("path", "plot_embedding"),
                kvp("numDimensions", 1536), kvp("similarity", "dotProduct"), 
                kvp("quantization", "scalar")))));
    auto model =
        mongocxx::search_index_model(name, definition.view()).type(type);
    siv.create_one(model);
    std::cout << "New search index named " << name << " is building."
              << std::endl;

    // Polling for index status
    std::cout << "Polling to check if the index is ready. This may take up to "
                 "a minute."
              << std::endl;
    bool queryable = false;
    while (!queryable) {
      auto indexes = siv.list();
      for (const auto& index : indexes) {
        if (index["name"].get_value() == name) {
          queryable = index["queryable"].get_bool();
        }
      }
      if (!queryable) {
        std::this_thread::sleep_for(std::chrono::seconds(5));
      }
    }
    std::cout << name << " is ready for querying." << std::endl;
  } catch (const std::exception& e) {
    std::cout << "Exception: " << e.what() << std::endl;
  }
  return 0;
}
