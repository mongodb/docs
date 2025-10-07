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

    auto db = client["sample_mflix"];
    auto collection = db["movies"];

    // instantiate a ``mongocxx::search_index_view`` on your collection
    auto siv = collection.search_indexes();

    {
        auto name = "default";
        auto definition = make_document(
            kvp("mappings", make_document(
                kvp("dynamic", make_document(
                    kvp("typeSet", "moviesStringIndex")
                )),
                kvp("fields", make_document(
                    kvp("poster", bsoncxx::builder::basic::array{}),
                    kvp("languages", bsoncxx::builder::basic::array{}),
                    kvp("rated", bsoncxx::builder::basic::array{}),
                    kvp("lastupdated", bsoncxx::builder::basic::array{}),
                    kvp("fullplot", bsoncxx::builder::basic::array{}),
                    kvp("awards", bsoncxx::builder::basic::array{})
                ))
            )),
            kvp("typeSets", []{
                auto arr = bsoncxx::builder::basic::array{};
                arr.append(make_document(
                    kvp("name", "moviesStringIndex"),
                    kvp("types", []{
                        auto types_arr = bsoncxx::builder::basic::array{};
                        types_arr.append(make_document(
                            kvp("type", "autocomplete")
                        ));
                        return types_arr;
                    }())
                ));
                return arr;
            }())
        );

        auto model = mongocxx::search_index_model(name, definition.view());

        // Create the search index
        auto result = siv.create_one(model);
        std::cout << "New index name: " << result << std::endl;
    }
}
