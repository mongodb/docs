#include <iostream>

#include <bsoncxx/builder/basic/document.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>

using bsoncxx::builder::basic::kvp;
using bsoncxx::builder::basic::make_document;

int main(){

    mongocxx::instance instance;
    mongocxx::uri uri("<connection-string>");
    mongocxx::client client(uri);

    auto db = client["<database>"];
    auto collection = db["<collection>"];

    // instantiate a ``mongocxx::search_index_view`` on your collection
    auto siv = collection.search_indexes();

    {
        auto name = "default";
        auto definition = make_document(
            kvp("mappings", make_document(
                kvp("dynamic", true|false),
                kvp("fields", make_document(
                    kvp("<field-name>", make_document(
                        kvp("type", "autocomplete"),
                        kvp("analyzer", "<lucene.analyzer>"),
                        kvp("tokenization", "edgeGram|rightEdgeGram|nGram"),
                        kvp("minGrams", <2>),
                        kvp("maxGrams", <15>),
                        kvp("foldDiacritics", true|false),
                        kvp("similarity", make_document(
                            kvp("type", "bm25|boolean|stableTfl")
                        ))
                    ))
                ))
            ))
        );

        auto model = mongocxx::search_index_model(name, definition.view());

        // Create the search index
        auto result = siv.create_one(model);
        std::cout << "New index name: " << result << std::endl;
    }
}
