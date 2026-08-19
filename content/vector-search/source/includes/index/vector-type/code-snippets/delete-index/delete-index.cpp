#include <iostream>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/search_index_view.hpp>
#include <mongocxx/uri.hpp>

int main() {
  mongocxx::instance inst;

  // Connect to your deployment
  const auto uri = mongocxx::uri{"<connectionString>"};
  mongocxx::client conn{uri};

  // Access your database and collection
  auto collection = conn["<databaseName>"]["<collectionName>"];

  auto siv = collection.search_indexes();
  auto name = "<indexName>";

  // Delete the search index
  siv.drop_one(name);
  std::cout << "Search index named " << name << " is deleted."
            << std::endl;
  return 0;
}
