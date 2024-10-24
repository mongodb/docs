#include <iostream>

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

    // start-db-coll
    auto db = client["sample_restaurants"];
    auto collection = db["restaurants"];
    // end-db-coll

    {
        // replaces a document that has a "name" value of "Nobu"
        // with a document that has a "name" of "La Bernadin"
        // start-replace-one
        auto query_filter = make_document(kvp("name", "Nobu"));
        auto replace_doc = make_document(kvp("name", "La Bernadin"));

        auto result = collection.replace_one(query_filter.view(), replace_doc.view());
        // end-replace-one
    }

    {
        // Retrieves a document to verify the replacement operation
        // start-replace-one-io
        auto new_doc = collection.find_one(make_document(kvp("name", "La Bernadin")));
        std::cout << "New document: " << bsoncxx::to_json(*new_doc) << std::endl;
        // end-replace-one-io
    }

    {
        // Replaces a document that has a "name" value of "Nobu" and instructs the operation to use the "name" field index
        // start-replace-options-hint
        auto index_specification = make_document(kvp("name", 1));
        collection.create_index(index_specification.view());

        mongocxx::options::replace opts{}; 
        opts.hint(mongocxx::hint{"name_1"});

        auto query_filter = make_document(kvp("name", "Nobu"));
        auto replace_doc = make_document(kvp("name", "La Bernadin"));

        auto result = collection.replace_one(query_filter.view(), replace_doc.view(), opts);
        // end-replace-options-hint 
    }
    
    {
        // Replaces a document that has a "name" value of "In-N-Out Burger" 
        // and instructs the operation to insert a new operation if none match.
        // start-replace-options-upsert
        std::cout << "Total document count before replace_one(): " << collection.count_documents({}) << std::endl;

        mongocxx::options::replace opts{}; 
        opts.upsert(true);

        auto query_filter = make_document(kvp("name", "In-N-Out Burger"));
        auto replace_doc = make_document(kvp("name", "Shake Shack"));

        auto result = collection.replace_one(query_filter.view(), replace_doc.view(), opts);
        
        std::cout << "Total document count after replace_one(): " << collection.count_documents({}) << std::endl;
        // end-replace-options-upsert
    }

    {
        // Replaces the matching document and prints the number of matched documents
        // start-replace-result-matched
        auto query_filter = make_document(kvp("name", "Shake Shack"));
        auto replace_doc = make_document(kvp("name", "In-N-Out Burger"));

        auto result = collection.replace_one(query_filter.view(), replace_doc.view());
        std::cout << "Matched documents: " << result->matched_count() << std::endl;        
        // end-replace-result-matched
    }

    {

        // Replaces a document that has a "name" value of "In-N-Out Burger" and instructs the operation
        // to insert a new document if none match.
        // start-replace-result-upsert
        mongocxx::options::replace opts{}; 
        opts.upsert(true);

        auto query_filter = make_document(kvp("name", "In-N-Out Burger"));
        auto replace_doc = make_document(kvp("name", "Shake Shack"));

        auto result = collection.replace_one(query_filter.view(), replace_doc.view(), opts);
        auto id = result->upserted_id()->get_value();
                
        std::cout << "Upserted ID: " << id.get_oid().value.to_string() << std::endl;
        // end-replace-result-upsert
    }
}