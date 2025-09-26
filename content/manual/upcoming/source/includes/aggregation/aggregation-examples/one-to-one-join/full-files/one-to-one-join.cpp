#include <bsoncxx/builder/basic/document.hpp>
#include <bsoncxx/builder/basic/kvp.hpp>
#include <bsoncxx/json.hpp>
#include <chrono>
#include <iostream>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/pipeline.hpp>
#include <mongocxx/uri.hpp>

int main() {
  mongocxx::instance instance;
  mongocxx::uri uri{"<connection string>"};
  mongocxx::client client{uri};

  auto db = client["agg_tutorials_db"];
  db.drop();

  // start-insert-sample-data
  auto orders = db["orders"];
  auto products = db["products"];

  std::vector<bsoncxx::document::value> order_docs = {bsoncxx::from_json(R"({
            "customer_id": "elise_smith@myemail.com",
            "orderdate": {"$date": 1590821752000},
            "product_id": "a1b2c3d4",
            "value": 431.43
        })"),
                                                      bsoncxx::from_json(R"({
            "customer_id": "tj@wheresmyemail.com",
            "orderdate": {"$date": 1559062412},
            "product_id": "z9y8x7w6",
            "value": 5.01
        })"),
                                                      bsoncxx::from_json(R"({
            "customer_id": "oranieri@warmmail.com",
            "orderdate": {"$date": 1577861137},
            "product_id": "ff11gg22hh33",
            "value": 63.13
        })"),
                                                      bsoncxx::from_json(R"({
            "customer_id": "jjones@tepidmail.com",
            "orderdate": {"$date": 1608972946000},
            "product_id": "a1b2c3d4",
            "value": 429.65
        })")};

  orders.insert_many(order_docs);  // Might throw an exception

  std::vector<bsoncxx::document::value> product_docs = {bsoncxx::from_json(R"({
            "id": "a1b2c3d4",
            "name": "Asus Laptop",
            "category": "ELECTRONICS",
            "description": "Good value laptop for students"
        })"),
                                                        bsoncxx::from_json(R"({
            "id": "z9y8x7w6",
            "name": "The Day Of The Triffids",
            "category": "BOOKS",
            "description": "Classic post-apocalyptic novel"
        })"),
                                                        bsoncxx::from_json(R"({
            "id": "ff11gg22hh33",
            "name": "Morphy Richardds Food Mixer",
            "category": "KITCHENWARE",
            "description": "Luxury mixer turning good cakes into great"
        })"),
                                                        bsoncxx::from_json(R"({
            "id": "pqr678st",
            "name": "Karcher Hose Set",
            "category": "GARDEN",
            "description": "Hose + nozzles + winder for tidy storage"
        })")};

  products.insert_many(product_docs);  // Might throw an exception
  // end-insert-sample-data

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

  // start-lookup
  pipeline.lookup(bsoncxx::from_json(R"({
        "from": "products",
        "localField": "product_id",
        "foreignField": "id",
        "as": "product_mapping"
    })"));
  // end-lookup

  // start-set
  pipeline.add_fields(bsoncxx::from_json(R"({
        "product_mapping": {"$first": "$product_mapping"}
    })"));
  pipeline.add_fields(bsoncxx::from_json(R"({
        "product_name": "$product_mapping.name",
        "product_category": "$product_mapping.category"
    })"));
  // end-set

  // start-unset
  pipeline.append_stage(bsoncxx::from_json(R"({
        "$unset": ["_id", "product_id", "product_mapping"]
    })"));
  // end-unset

  // start-run-agg
  auto cursor = orders.aggregate(pipeline);
  // end-run-agg

  for (auto&& doc : cursor) {
    std::cout << bsoncxx::to_json(doc, bsoncxx::ExtendedJsonMode::k_relaxed)
              << std::endl;
  }
}