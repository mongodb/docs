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

    // start-siv
    auto siv = collection.search_indexes();
    // end-siv
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
    {
        // start-create-static-search-index
        // Create an index model with your index name and definition containing the fields you want to index
        auto name = "myStaticIndex";
        auto fields = make_document(kvp("title", make_document(kvp("type", "string"), kvp("analyzer","lucene.standard"))), kvp("year", make_document(kvp("type","number"))));
        auto definition = make_document(kvp("mappings", make_document(kvp("dynamic", false), kvp("fields", fields))));
        auto model = mongocxx::search_index_model(name, definition.view());

        // Create the search index
        auto result = siv.create_one(model);
        std::cout << "New index name: " << result << std::endl;
        // end-create-static-search-index
    }
    {
        // start-create-dynamic-search-index
        // Create an index model with your index name and definition
        auto name = "myDynamicIndex";
        auto definition = make_document(kvp("mappings", make_document(kvp("dynamic", true))));
        auto model = mongocxx::search_index_model(name, definition.view());

        // Create the search index
        auto result = siv.create_one(model);
        std::cout << "New index name: " << result << std::endl;
        // end-create-dynamic-search-index
    }
    {
        // start-create-multiple-search-indexes
        // Create a vector to store Search index models
        std::vector<mongocxx::search_index_model> models; 

        // Add an index model with dynamic mappings to the input vector
        auto name_1 = "myDynamicIndex";
        auto definition_1 = make_document(kvp("mappings", make_document(kvp("dynamic", true))));
        auto model_1 = mongocxx::search_index_model(name_1, definition_1.view()); 
        models.push_back(model_1);

        // Add an index model with static mappings to the input vector
        auto name_2 = "myStaticIndex";
        auto fields = make_document(kvp("title", make_document(kvp("type", "string"), kvp("analyzer","lucene.standard"))), kvp("year", make_document(kvp("type","number"))));
        auto definition_2 = make_document(kvp("mappings", make_document(kvp("dynamic", false), kvp("fields", fields))));
        auto model_2 = mongocxx::search_index_model(name_2, definition_2.view());
        models.push_back(model_2); 

        // Create the search indexes
        auto result = siv.create_many(models);

        // Print the search index names
        std::cout << "New index names:" << std::endl;
        for (const std::string& name : result) {
            std::cout << name << std::endl;
        }
        // end-create-multiple-search-indexes
    }

    {
        // start-list-search-indexes
        auto cursor = siv.list(); 
        for (mongocxx::cursor::iterator it = cursor.begin(); it != cursor.end(); ++it) {
            std::cout << bsoncxx::to_json(*it) << std::endl;
        }
        // end-list-search-indexes
    }
    {
        // start-list-search-index
        auto cursor = siv.list("myDynamicIndex"); 
        for (mongocxx::cursor::iterator it = cursor.begin(); it != cursor.end(); ++it) {
            std::cout << bsoncxx::to_json(*it) << std::endl;
        }
        // end-list-search-index
        // Print list() output using a range-based for loop
        for (const auto &idx : cursor) {
                std::cout << bsoncxx::to_json(idx) << std::endl;
        }
    }
    {
        // start-update-search-index
        auto update_fields = make_document(kvp("title", make_document(kvp("type", "string"), kvp("analyzer","lucene.simple"))), kvp("year", make_document(kvp("type","number"))));
        auto update_definition = make_document(kvp("mappings", make_document(kvp("dynamic", false), kvp("fields", update_fields))));
        siv.update_one("myStaticIndex", update_definition.view());
        // end-update-search-index
    }
    {
        // start-remove-search-index
        siv.drop_one("myDynamicIndex");
        // end-remove-search-index
    }

}