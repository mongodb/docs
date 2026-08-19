#include <bsoncxx/builder/basic/document.hpp>
#include <iostream>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/search_index_view.hpp>
#include <mongocxx/uri.hpp>

using bsoncxx::builder::basic::kvp;
using bsoncxx::builder::basic::make_array;
using bsoncxx::builder::basic::make_document;

int main() {
  mongocxx::instance inst;

  // Connect to your deployment
  const auto uri = mongocxx::uri{"<connectionString>"};
  mongocxx::client conn{uri};

  // Access your database and collection
  auto collection = conn["<databaseName>"]["<collectionName>"];

  auto siv = collection.search_indexes();
  auto name = "<indexName>";

  // Specify the new index definition with automated embedding and
  // filter fields
  auto definition = make_document(
      kvp("fields",
          make_array(
              make_document(kvp("type", "autoEmbed"),
                            kvp("modality", "text"),
                            kvp("path", "<indexedField>"),
                            kvp("model", "<embeddingModel>")),
              make_document(kvp("type", "filter"),
                            kvp("path", "<fieldToIndex>")))));

  // Update the search index
  siv.update_one(name, definition.view());
  std::cout << "Search index named " << name << " is updating."
            << std::endl;

  return 0;
}
