#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>
#include <mongocxx/client.hpp>

int main_uri_example() {
    mongocxx::instance instance{};

    // Set localThresholdMS in the connection string to 35 milliseconds
    // start-local-threshold-uri
    mongocxx::uri uri{"mongodb://localhost:27017/?replicaSet=repl0&localThresholdMS=35"};
    mongocxx::client client{uri};
    // end-local-threshold-uri

    // start-collation
    mongocxx::options::find opts{};
    opts.collation(bsoncxx::from_json(R"({"locale": "fr", "strength": 1})"));

    auto cursor = collection.find(make_document(kvp("category", "cafe")), opts);
    for(auto&& doc : cursor) {
        std::cout << bsoncxx::to_json(doc) << std::endl;
    }
    // end-collation

    return 0;
}
