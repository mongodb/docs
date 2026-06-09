#include <iostream>

#include <bsoncxx/builder/basic/document.hpp>
#include <bsoncxx/builder/basic/array.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>

using bsoncxx::builder::basic::kvp;
using bsoncxx::builder::basic::make_document;
using bsoncxx::builder::basic::make_array;

int main(){

    mongocxx::instance instance;
    mongocxx::uri uri("<connection-string>");
    mongocxx::client client(uri);

    auto db = client["sample_mflix"];
    auto collection = db["movies"];

    // instantiate a ``mongocxx::search_index_view`` on your collection
    auto siv = collection.search_indexes();

    {
        auto name = "default";
        auto definition = make_document(
            kvp("mappings", make_document(
                kvp("dynamic", false),
                kvp("fields", make_document(
                    kvp("title", make_document(
                        kvp("analyzer", "lucene.english"),
                        kvp("type", "string")
                    ))
                ))
            )),
            kvp("synonyms", make_array(
                make_document(
                    kvp("analyzer", "lucene.english"),
                    kvp("name", "transportSynonyms"),
                    kvp("source", make_document(
                        kvp("collection", "transport_synonyms")
                    ))
                ),
                make_document(
                    kvp("analyzer", "lucene.english"),
                    kvp("name", "attireSynonyms"),
                    kvp("source", make_document(
                        kvp("collection", "attire_synonyms")
                    ))
                )
            ))
        );

        auto model = mongocxx::search_index_model(name, definition.view());

        // Create the search index
        auto result = siv.create_one(model);
        std::cout << "New index name: " << result << std::endl;
    }
}