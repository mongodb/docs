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

    // Create the Atlas Search index definition for the document field
    auto name = "default";
    auto definition = make_document(
        kvp("mappings", make_document(
            kvp("dynamic", false),
            kvp("fields", make_document(
                kvp("awards", make_document(
                    kvp("type", "document"),
                    kvp("dynamic", make_document(
                        kvp("typeSet", "onlyNumbers")
                    ))
                ))
            ))
        )),
        kvp("typeSets", []{
            auto arr = bsoncxx::builder::basic::array{};
            arr.append(make_document(
                kvp("name", "onlyNumbers"),
                kvp("types", []{
                    auto types_arr = bsoncxx::builder::basic::array{};
                    types_arr.append(make_document(
                        kvp("type", "number")
                    ));
                    return types_arr;
                }())
            ));
            return arr;
        }())
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