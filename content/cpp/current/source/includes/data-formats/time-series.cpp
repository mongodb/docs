#include <iostream>
#include <chrono>

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

    {
        // Creates a time series collection to store precipitation data
        // start-create-ts
        auto db = client["precipitation"];
        
        auto ts_info = make_document(
            kvp("timeseries", make_document(
                kvp("timeField", "timestamp"),
                kvp("metaField", "location"),
                kvp("granularity", "minutes")
        )));

        auto collection = db.create_collection("sept2023", ts_info.view());
        // end-create-ts
    }

    {
        // Lists the collections in the "precipitation" database
        auto db = client["precipitation"];
        // start-list-colls
        auto cursor = db.list_collections();

        for(auto&& doc : cursor) {
            std::cout << bsoncxx::to_json(doc) << std::endl;
        }
        // end-list-colls
    }

    {
        // Inserts precipitation time series data about New York City into the collection
        auto db = client["precipitation"];
        // start-insert-ts
        auto collection = db["sept2023"];
        std::vector<bsoncxx::document::value> ts_data;
        ts_data.push_back(make_document(kvp("precipitation_mm", 0.5),
                                        kvp("location", "New York City"),
                                        kvp("timestamp", bsoncxx::types::b_date{std::chrono::milliseconds{1694829060000}})));
        ts_data.push_back(make_document(kvp("precipitation_mm", 2.8),
                                        kvp("location", "New York City"),
                                        kvp("timestamp", bsoncxx::types::b_date{std::chrono::milliseconds{1695594780000}})));

        auto result = collection.insert_many(ts_data);
        // end-insert-ts
    }
}