#include <iostream>

#include <bsoncxx/builder/basic/document.hpp>
#include <bsoncxx/builder/basic/array.hpp>
#include <bsoncxx/json.hpp>
#include <bsoncxx/types.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>
#include <mongocxx/options/find.hpp>

using bsoncxx::builder::basic::kvp;
using bsoncxx::builder::basic::make_document;
using bsoncxx::builder::basic::make_array;
using bsoncxx::types::b_date;

int main() {
    // Initialize the MongoDB C++ driver
    mongocxx::instance instance{};
    
    // Connect to your MongoDB deployment
    mongocxx::uri uri("<connection-string>");
    mongocxx::client client(uri);

    auto db = client["sample_supplies"];
    auto collection = db["purchaseOrders"];
    
    // Create the first document
    auto doc1 = make_document(
        kvp("saleDate", b_date(std::chrono::milliseconds(1516741609506))), // 2018-01-23T21:06:49.506Z
        kvp("items", make_array(
            make_document(
                kvp("name", "printer paper"),
                kvp("tags", make_array("office", "stationary")),
                kvp("price", 40.01),
                kvp("quantity", 2)
            ),
            make_document(
                kvp("name", "notepad"),
                kvp("tags", make_array("office", "writing", "school")),
                kvp("price", 35.29),
                kvp("quantity", 2)
            ),
            make_document(
                kvp("name", "pens"),
                kvp("tags", make_array("writing", "office", "school", "stationary")),
                kvp("price", 56.12),
                kvp("quantity", 5)
            ),
            make_document(
                kvp("name", "backpack"),
                kvp("tags", make_array("school", "travel", "kids")),
                kvp("price", 77.71),
                kvp("quantity", 2)
            ),
            make_document(
                kvp("name", "notepad"),
                kvp("tags", make_array("office", "writing", "school")),
                kvp("price", 18.47),
                kvp("quantity", 2)
            ),
            make_document(
                kvp("name", "envelopes"),
                kvp("tags", make_array("stationary", "office", "general")),
                kvp("price", 19.95),
                kvp("quantity", 8)
            ),
            make_document(
                kvp("name", "envelopes"),
                kvp("tags", make_array("stationary", "office", "general")),
                kvp("price", 8.08),
                kvp("quantity", 3)
            ),
            make_document(
                kvp("name", "binder"),
                kvp("tags", make_array("school", "general", "organization")),
                kvp("price", 14.16),
                kvp("quantity", 3)
            )
        )),
        kvp("storeLocation", "Denver"),
        kvp("customer", make_document(
            kvp("gender", "M"),
            kvp("age", 42),
            kvp("email", "cauho@witwuta.sv"),
            kvp("satisfaction", 4)
        )),
        kvp("couponUsed", true),
        kvp("purchaseMethod", "Phone")
    );
    
    // Create the second document
    auto doc2 = make_document(
        kvp("saleDate", b_date(std::chrono::milliseconds(1516874462918))), // 2018-01-25T10:01:02.918Z
        kvp("items", make_array(
            make_document(
                kvp("name", "envelopes"),
                kvp("tags", make_array("stationary", "office", "general")),
                kvp("price", 8.05),
                kvp("quantity", 10)
            ),
            make_document(
                kvp("name", "binder"),
                kvp("tags", make_array("school", "general", "organization")),
                kvp("price", 28.31),
                kvp("quantity", 9)
            ),
            make_document(
                kvp("name", "notepad"),
                kvp("tags", make_array("office", "writing", "school")),
                kvp("price", 20.95),
                kvp("quantity", 3)
            ),
            make_document(
                kvp("name", "laptop"),
                kvp("tags", make_array("electronics", "school", "office")),
                kvp("price", 866.5),
                kvp("quantity", 4)
            ),
            make_document(
                kvp("name", "notepad"),
                kvp("tags", make_array("office", "writing", "school")),
                kvp("price", 33.09),
                kvp("quantity", 4)
            ),
            make_document(
                kvp("name", "printer paper"),
                kvp("tags", make_array("office", "stationary")),
                kvp("price", 37.55),
                kvp("quantity", 1)
            ),
            make_document(
                kvp("name", "backpack"),
                kvp("tags", make_array("school", "travel", "kids")),
                kvp("price", 83.28),
                kvp("quantity", 2)
            ),
            make_document(
                kvp("name", "pens"),
                kvp("tags", make_array("writing", "office", "school", "stationary")),
                kvp("price", 42.9),
                kvp("quantity", 4)
            ),
            make_document(
                kvp("name", "envelopes"),
                kvp("tags", make_array("stationary", "office", "general")),
                kvp("price", 16.68),
                kvp("quantity", 2)
            )
        )),
        kvp("storeLocation", "Seattle"),
        kvp("customer", make_document(
            kvp("gender", "M"),
            kvp("age", 50),
            kvp("email", "keecade@hem.uy"),
            kvp("satisfaction", 5)
        )),
        kvp("couponUsed", false),
        kvp("purchaseMethod", "Phone")
    );
    
    try {
        // Insert the documents
        auto result1 = collection.insert_one(doc1.view());
        auto result2 = collection.insert_one(doc2.view());
        
        std::cout << "Successfully inserted purchase order documents." << std::endl;
        
        // Query the new collection
        mongocxx::options::find options;
        options.sort(make_document(kvp("saleDate", -1)));
        
        auto cursor = collection.find({}, options);
        
        std::cout << "\nQuery results:" << std::endl;
        for (auto&& doc : cursor) {
            std::cout << bsoncxx::to_json(doc) << std::endl;
        }
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
    }
    
    return 0;
}
