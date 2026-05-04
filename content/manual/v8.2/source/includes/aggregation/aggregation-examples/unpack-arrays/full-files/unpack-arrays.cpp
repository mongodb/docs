#include <iostream>
#include <bsoncxx/builder/basic/document.hpp>
#include <bsoncxx/builder/basic/kvp.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/pipeline.hpp>
#include <mongocxx/uri.hpp>
#include <chrono>

int main() {
    mongocxx::instance instance;
    mongocxx::uri uri{"<connection string>"};
    mongocxx::client client{uri};

    auto db = client["agg_tutorials_db"];
    db.drop();

    // start-insert-orders
    auto orders = db["orders"];

    std::vector<bsoncxx::document::value> order_docs = {
        bsoncxx::from_json(R"({
            "order_id": 6363763262239,
            "products": [
                {
                    "prod_id": "abc12345",
                    "name": "Asus Laptop",
                    "price": 431
                },
                {
                    "prod_id": "def45678",
                    "name": "Karcher Hose Set",
                    "price": 22
                }
            ]
        })"),
        bsoncxx::from_json(R"({
            "order_id": 1197372932325,
            "products": [
                {
                    "prod_id": "abc12345",
                    "name": "Asus Laptop",
                    "price": 429
                }
            ]
        })"),
        bsoncxx::from_json(R"({
            "order_id": 9812343774839,
            "products": [
                {
                    "prod_id": "pqr88223",
                    "name": "Morphy Richards Food Mixer",
                    "price": 431
                },
                {
                    "prod_id": "def45678",
                    "name": "Karcher Hose Set",
                    "price": 21
                }
            ]
        })"),
        bsoncxx::from_json(R"({
            "order_id": 4433997244387,
            "products": [
                {
                    "prod_id": "def45678",
                    "name": "Karcher Hose Set",
                    "price": 23
                },
                {
                    "prod_id": "jkl77336",
                    "name": "Picky Pencil Sharpener",
                    "price": 1
                },
                {
                    "prod_id": "xyz11228",
                    "name": "Russell Hobbs Chrome Kettle",
                    "price": 16
                }
            ]
        })")
    };
    orders.insert_many(order_docs); // Might throw an exception
    // end-insert-orders

    // Create the aggregation pipeline
    mongocxx::pipeline pipeline;

    // start-unwind
    pipeline.unwind("$products");
    // end-unwind

    // start-match
    pipeline.match(bsoncxx::from_json(R"({
        "products.price": { "$gt": 15 }
    })"));
    // end-match

    // start-group
    pipeline.group(bsoncxx::from_json(R"({
        "_id": "$products.prod_id",
        "product": { "$first": "$products.name" },
        "total_value": { "$sum": "$products.price" },
        "quantity": { "$sum": 1 }
    })"));
    // end-group

    // start-set
    pipeline.add_fields(bsoncxx::from_json(R"({
        "product_id": "$_id"
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