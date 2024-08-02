#include <iostream>

#include <bsoncxx/builder/basic/document.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/exception/exception.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>

using bsoncxx::builder::basic::kvp;
using bsoncxx::builder::basic::make_document;

int main() {
    try {
        mongocxx::instance instance;

        mongocxx::uri uri("<connection string>");
        mongocxx::client client(uri);

        auto database = client["<database name>"];
        auto collection = database["<collection name>"];

        // Start example code here

        // End example code here

    } catch (const mongocxx::exception& e) {
        std::cout << "An exception occurred: " << e.what() << "\n";
        return EXIT_FAILURE;
    }
    
    return EXIT_SUCCESS;
}