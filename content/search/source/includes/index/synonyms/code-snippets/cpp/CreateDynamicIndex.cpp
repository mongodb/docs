#include <iostream>

#include <bsoncxx/builder/basic/document.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>

using bsoncxx::builder::basic::kvp;
using bsoncxx::builder::basic::make_document;

int main() {
    // Initialize the MongoDB C++ driver
    mongocxx::instance instance{};

    // Connect to your MongoDB deployment
    mongocxx::uri uri("<connection-string>");
    mongocxx::client client(uri);

    auto db = client["sample_mflix"];
    auto collection = db["movies"];
    auto siv = collection.search_indexes();

    // Define the synonym mapping for the lucene.standard analyzer
    auto name = "default";
    auto synonyms = bsoncxx::builder::basic::make_array(
        make_document(
            kvp("analyzer", "lucene.standard"),
            kvp("name", "my_synonyms"),
            kvp("source", make_document(
                kvp("collection", "synonymous_terms")
            ))
        )
    );

    // Create the MongoDB Search index definition
    auto definition = make_document(
        kvp("mappings", make_document(
            kvp("dynamic", true))
        ),
        kvp("synonyms", synonyms)
    );
    auto model = mongocxx::search_index_model(name, definition.view());

    try {
        // Execute the command to create the index
        auto result = siv.create_one(model);
        std::cout << "New index name: " << result << std::endl;
    } catch (const std::exception& e) {
        std::cerr << "Error creating Atlas Search index: " << e.what() << std::endl;
    }

}