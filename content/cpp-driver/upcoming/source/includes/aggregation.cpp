#include <iostream>

#include <bsoncxx/builder/basic/document.hpp>
#include <bsoncxx/builder/basic/kvp.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/pipeline.hpp>
#include <mongocxx/uri.hpp>

using bsoncxx::builder::basic::kvp;
using bsoncxx::builder::basic::make_document;

int main() {
    mongocxx::instance instance;
    mongocxx::uri uri("<connection string>");
    mongocxx::client client(uri);

    auto db = client["sample_restaurants"];
    auto collection = db["restaurants"];

    {
        // Retrieves documents with a cuisine value of "Bakery", groups them by "borough", and
        // counts each borough's matching documents
        // start-match-group
        mongocxx::pipeline stages;

        stages.match(make_document(kvp("cuisine", "Bakery")))
              .group(make_document(kvp("_id", "$borough"), kvp("count", make_document(kvp("$sum", 1)))));

        auto cursor = collection.aggregate(stages);

        for (auto&& doc : cursor) {
            std::cout << bsoncxx::to_json(doc) << std::endl;
        }
        // end-match-group
    }

    {
        // Performs the same aggregation operation as above but asks MongoDB to explain it
        // start-explain
        mongocxx::pipeline stages;

        stages.match(make_document(kvp("cuisine", "Bakery")))
              .group(make_document(kvp("_id", "$borough"), kvp("count", make_document(kvp("$sum", 1)))));

        auto command = make_document(
            kvp("explain", make_document(
                                kvp("aggregate", "restaurants"),
                                kvp("pipeline", stages.view_array()),
                                kvp("cursor", make_document()))));

        auto result = db.run_command(command.view());
        std::cout << bsoncxx::to_json(result) << std::endl;
        // end-explain
    }
}