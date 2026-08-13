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
  const auto uri = mongocxx::uri{"<connection-string>"};
  mongocxx::client conn{uri};

  // Access your database and collection
  auto collection = conn["<database-name>"]["<collection-name>"];

  auto siv = collection.search_indexes();
  auto name = "<index-name>";

  // Specify the new index definition with automated embedding and
  // filter fields
  auto definition = make_document(
      kvp("fields",
          make_array(
              make_document(kvp("type", "autoEmbed"),
                            kvp("modality", "text"),
                            kvp("path", "<indexed-field>"),
                            kvp("model", "<embedding-model>")),
              make_document(kvp("type", "filter"),
                            kvp("path", "<field-to-index>")))));

  // Update the search index
  siv.update_one(name, definition.view());
  std::cout << "Search index named " << name << " is updating."
            << std::endl;

  return 0;
}
