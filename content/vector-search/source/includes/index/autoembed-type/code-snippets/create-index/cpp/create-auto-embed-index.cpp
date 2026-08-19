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

    // Connect to your deployment
    const auto uri = mongocxx::uri{"<connectionString>"};
    mongocxx::client conn{uri};

    // Access your database and collection
    auto db = conn["<databaseName>"];
    auto collection = db["<collectionName>"];

    auto siv = collection.search_indexes();
    std::string name = "<indexName>";

    // Define the index with automated embedding and filter fields
    auto definition = make_document(
        kvp("fields",
            make_array(make_document(
                kvp("type", "autoEmbed"), kvp("modality", "text"),
                kvp("path", "<fieldToIndex>"),
                kvp("model", "<embeddingModel>")))));
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
