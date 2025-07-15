#include <cstdint>
#include <iostream>
#include <vector>

#include <bsoncxx/builder/basic/document.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>

using bsoncxx::builder::basic::kvp;
using bsoncxx::builder::basic::make_document;

int main() {
    mongocxx::instance instance;
    mongocxx::uri uri("<connection string>");
    mongocxx::client client(uri);
    auto db = client["sample_mflix"];
    auto collection = db["movies"];

    auto result = collection.find_one(make_document(kvp("title", "The Shawshank Redemption")));
    if (result) {
        std::cout << bsoncxx::to_json(*result) << std::endl;
    } else {
        std::cout << "No result found" << std::endl;
    }
}