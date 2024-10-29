#include <iostream>

#include <bsoncxx/builder/basic/document.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>

using bsoncxx::builder::basic::kvp;
using bsoncxx::builder::basic::make_document;


int main(){

    mongocxx::instance instance;
    mongocxx::uri uri("<connection string>");
    mongocxx::client client(uri);

    // start-db-coll
    auto db = client["sample_mflix"];
    auto collection = db["movies"];
    // end-db-coll

    {
        // start-index-single
        auto index_specification = make_document(kvp("title", 1));
        auto result = collection.create_index(index_specification.view());
        // end-index-single
    }
    {
        // start-index-single-query
        auto document = collection.find_one(make_document(kvp("title","Peter Pan")));
        std::cout << bsoncxx::to_json(*document) << std::endl;
        // end-index-single-query 
    }

    {
        // start-index-compound
        auto index_specification = make_document(kvp("title", 1), kvp("year", 1));
        auto result = collection.create_index(index_specification.view());
        // end-index-compound
    }

    {
        // start-index-compound-query
        auto document = collection.find_one(make_document(kvp("title","Peter Pan"), kvp("year", 1924)));
        std::cout << bsoncxx::to_json(*document) << std::endl;
        // end-index-compound-query 
    }

    {
        // start-remove-index
        collection.indexes().drop_one("title_1");
        // end-remove-index
    }

    {
        // start-remove-all-indexes
        collection.indexes().drop_all();
        // end-remove-all-indexes
    }
    
    {
        // start-remove-all-wildcard
        collection.indexes().drop_one("*");
        // end-remove-all-wildcard    
    }

}