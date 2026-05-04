#include <iostream>
#include <bsoncxx/builder/basic/document.hpp>
#include <bsoncxx/builder/basic/kvp.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/pipeline.hpp>
#include <mongocxx/uri.hpp>
#include <chrono>

using bsoncxx::builder::basic::kvp;
using bsoncxx::builder::basic::make_document;
using bsoncxx::builder::basic::make_array;

int main() {
    mongocxx::instance instance;
    mongocxx::uri uri{"<connection string>"};
	mongocxx::client client{uri};

    auto db = client["agg_tutorials_db"];
    db.drop();

    // start-insert-sample-data
    auto products = db["products"];
    auto orders = db["orders"];

    std::vector<bsoncxx::document::value> product_docs = {
        bsoncxx::from_json(R"({
            "name": "Asus Laptop",
            "variation": "Ultra HD",
            "category": "ELECTRONICS",
            "description": "Great for watching movies"
        })"),
        bsoncxx::from_json(R"({
            "name": "Asus Laptop",
            "variation": "Standard Display",
            "category": "ELECTRONICS",
            "description": "Good value laptop for students"
        })"),
        bsoncxx::from_json(R"({
            "name": "The Day Of The Triffids",
            "variation": "1st Edition",
            "category": "BOOKS",
            "description": "Classic post-apocalyptic novel"
        })"),
        bsoncxx::from_json(R"({
            "name": "The Day Of The Triffids",
            "variation": "2nd Edition",
            "category": "BOOKS",
            "description": "Classic post-apocalyptic novel"
        })"),
        bsoncxx::from_json(R"({
            "name": "Morphy Richards Food Mixer",
            "variation": "Deluxe",
            "category": "KITCHENWARE",
            "description": "Luxury mixer turning good cakes into great"
        })")
    };

    products.insert_many(product_docs); // Might throw an exception

    std::vector<bsoncxx::document::value> order_docs = {
        bsoncxx::from_json(R"({
            "customer_id": "elise_smith@myemail.com",
            "orderdate": {"$date": 1590821752000},
            "product_name": "Asus Laptop",
            "product_variation": "Standard Display",
            "value": 431.43
        })"),
        bsoncxx::from_json(R"({
            "customer_id": "tj@wheresmyemail.com",
            "orderdate": {"$date": 1559062412000},
            "product_name": "The Day Of The Triffids",
            "product_variation": "2nd Edition",
            "value": 5.01
        })"),
        bsoncxx::from_json(R"({
            "customer_id": "oranieri@warmmail.com",
            "orderdate": {"$date": 1577861137000},
            "product_name": "Morphy Richards Food Mixer",
            "product_variation": "Deluxe",
            "value": 63.13
        })"),
        bsoncxx::from_json(R"({
            "customer_id": "jjones@tepidmail.com",
            "orderdate": {"$date": 1608972946000},
            "product_name": "Asus Laptop",
            "product_variation": "Standard Display",
            "value": 429.65
        })")
    };

    orders.insert_many(order_docs); // Might throw an exception
    // end-insert-sample-data

    // Create the aggregation pipeline
    mongocxx::pipeline pipeline;

    // start-embedded-pl-match1
    auto embed_match_stage1 = bsoncxx::from_json(R"({
        "$match": {
            "$expr": {
                "$and": [
                    { "$eq": ["$product_name", "$$prdname"] },
                    { "$eq": ["$product_variation", "$$prdvartn"] }
                ]
            }
        }
    })");
    // end-embedded-pl-match1

    // start-embedded-pl-match2
    auto embed_match_stage2 = bsoncxx::from_json(R"({
        "$match": {
            "orderdate": {
                "$gte": { "$date": 1577836800000 },
                "$lt": { "$date": 1609459200000 }
            }
        }
    })");
    // end-embedded-pl-match2

    // start-embedded-pl-unset
    auto embed_unset_stage = bsoncxx::from_json(R"({
        "$unset": ["_id", "product_name", "product_variation"]
    })");
    // end-embedded-pl-unset

    // start-lookup
    pipeline.lookup(make_document(
        kvp("from", "orders"),
        kvp("let", make_document(
            kvp("prdname", "$name"),
            kvp("prdvartn", "$variation")
        )),
        kvp("pipeline", make_array(embed_match_stage1, embed_match_stage2, embed_unset_stage)),
        kvp("as", "orders")
    ));
    // end-lookup

    // start-match
    pipeline.match(bsoncxx::from_json(R"({
        "orders": { "$ne": [] }
    })"));
    // end-match

    // start-unset
    pipeline.append_stage(bsoncxx::from_json(R"({
        "$unset": ["_id", "description"]
    })"));
    // end-unset

    // start-run-agg
    auto cursor = products.aggregate(pipeline);
    // end-run-agg

    for (auto&& doc : cursor) {
        std::cout << bsoncxx::to_json(doc, bsoncxx::ExtendedJsonMode::k_relaxed) << std::endl;
    }
}