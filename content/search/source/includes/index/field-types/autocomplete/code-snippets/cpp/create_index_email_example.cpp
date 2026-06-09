#include <iostream>

#include <bsoncxx/builder/basic/document.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>
#include <mongocxx/search_index.hpp>

using bsoncxx::builder::basic::kvp;
using bsoncxx::builder::basic::make_document;

int main(){

    mongocxx::instance instance;
    mongocxx::uri uri("<connection-string>");
    mongocxx::client client(uri);

    auto db = client["sample_mflix"];
    auto collection = db["users"];

    // instantiate a ``mongocxx::search_index_view`` on your collection
    auto siv = collection.search_indexes();

    {
        auto name = "default";
        auto definition = make_document(
            kvp("mappings", make_document(
                kvp("dynamic", true),
                kvp("fields", make_document(
                    kvp("email", make_document(
                        kvp("type", "autocomplete"),
                        kvp("analyzer", "lucene.keyword"),
                        kvp("tokenization", "nGram"),
                        kvp("minGrams", 3),
                        kvp("maxGrams", 15),
                        kvp("foldDiacritics", false)
                    ))
                ))
            ))
        );

        auto model = mongocxx::search_index_model(name, definition.view());
        // Create the search index
        auto result = siv.create_one(model);
        if (result) {
            std::cout << "New index name: " << *result << std::endl;
        } else {
            std::cout << "Failed to create search index." << std::endl;
        }
    }
}
}
