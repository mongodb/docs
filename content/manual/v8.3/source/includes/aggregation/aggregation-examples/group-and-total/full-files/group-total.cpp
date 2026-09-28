#include <iostream>
#include <bsoncxx/builder/basic/document.hpp>
#include <bsoncxx/builder/basic/kvp.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/pipeline.hpp>
#include <mongocxx/uri.hpp>
#include <mongocxx/exception/exception.hpp>
#include <chrono>

int main() {
    mongocxx::instance instance;
    mongocxx::uri uri{"<connection string>"};
	mongocxx::client client{uri};

    auto db = client["agg_tutorials_db"];
    db.drop();

    // start-insert-orders
    auto orders = db["orders"];

    std::vector<bsoncxx::document::value> docs = {
        bsoncxx::from_json(R"({
            "customer_id": "elise_smith@myemail.com",
            "orderdate": {"$date": 1590821752000},
            "value": 231
        })"),
        bsoncxx::from_json(R"({
            "customer_id": "elise_smith@myemail.com",
            "orderdate": {"$date": 1578901927},
            "value": 99
        })"),
        bsoncxx::from_json(R"({
            "customer_id": "oranieri@warmmail.com",
            "orderdate": {"$date": 1577861137},
            "value": 63
        })"),
        bsoncxx::from_json(R"({
            "customer_id": "tj@wheresmyemail.com",
            "orderdate": {"$date": 1559076812},
            "value": 2
        })"),
        bsoncxx::from_json(R"({
            "customer_id": "tj@wheresmyemail.com",
            "orderdate": {"$date": 1606172213},
            "value": 187
        })"),
        bsoncxx::from_json(R"({
            "customer_id": "tj@wheresmyemail.com",
            "orderdate": {"$date": 1597794288},
            "value": 4
        })"),
        bsoncxx::from_json(R"({
            "customer_id": "elise_smith@myemail.com",
            "orderdate": {"$date": 1608972946000},
            "value": 4
        })"),
        bsoncxx::from_json(R"({
            "customer_id": "tj@wheresmyemail.com",
            "orderdate": {"$date": 1614570572},
            "value": 1024
        })"),
        bsoncxx::from_json(R"({
            "customer_id": "elise_smith@myemail.com",
            "orderdate": {"$date": 1601722184000},
            "value": 102
        })")
    };

    auto result = orders.insert_many(docs); // Might throw an exception
    // end-insert-orders

    // Create the aggregation pipeline
    mongocxx::pipeline pipeline;

    // start-match
    pipeline.match(bsoncxx::from_json(R"({
        "orderdate": {
            "$gte": {"$date": 1577836800},
            "$lt": {"$date": 1609459200000}
        }
    })"));
    // end-match

    // start-sort1
    pipeline.sort(bsoncxx::from_json(R"({
        "orderdate": 1
    })"));
    // end-sort1

    // start-group
    pipeline.group(bsoncxx::from_json(R"({
        "_id": "$customer_id",
        "first_purchase_date": {"$first": "$orderdate"},
        "total_value": {"$sum": "$value"},
        "total_orders": {"$sum": 1},
        "orders": {"$push": {
            "orderdate": "$orderdate",
            "value": "$value"
        }}
    })"));
    // end-group

    // start-sort2
    pipeline.sort(bsoncxx::from_json(R"({
        "first_purchase_date": 1
    })"));
    // end-sort2

    // start-set
    pipeline.add_fields(bsoncxx::from_json(R"({
        "customer_id": "$_id"
    })"));
    // end-set

    // start-unset
    pipeline.append_stage(bsoncxx::from_json(R"({
        "$unset": ["_id"]
    })"));
    // end-unset

    // start-run-agg
    auto cursor = orders.aggregate(pipeline);
    // end-run-agg

    for (auto&& doc : cursor) {
        std::cout << bsoncxx::to_json(doc, bsoncxx::ExtendedJsonMode::k_relaxed) << std::endl;
    }
}