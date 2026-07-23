#include <bsoncxx/json.hpp>
#include <iostream>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/search_index_view.hpp>
#include <mongocxx/uri.hpp>

int main() {
  try {
    mongocxx::instance inst{};

    // Replace the placeholder with your connection string
    const auto uri = mongocxx::uri{"<connectionString>"};

    // Connect to your cluster
    mongocxx::client conn{uri};

    // Access your database and collection
    auto db = conn["<databaseName>"];
    auto collection = db["<collectionName>"];

    // Get a list of the collection's search indexes and print them
    auto siv = collection.search_indexes();
    auto indexes = siv.list();
    for (const auto& index : indexes) {
      std::cout << bsoncxx::to_json(index) << std::endl;
    }
  } catch (const std::exception& e) {
    std::cout << "Exception: " << e.what() << std::endl;
  }
  return 0;
}