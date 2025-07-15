#include <iostream>

#include <bsoncxx/builder/basic/document.hpp>
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
    auto db = client["sample_training"];
    auto collection = db["companies"];
    // end-db-coll
 
    {
        // Counts all documents in the collection
        // start-count-all
        auto result = collection.count_documents({});
        std::cout << "Number of documents: " << result << std::endl;
        // end-count-all
    }

    {
        // Counts documents that have a "founded_year" value of 2010
        // start-count-accurate
        auto result = collection.count_documents(make_document(kvp("founded_year", 2010)));
        std::cout << "Number of companies founded in 2010: " << result << std::endl;
        // end-count-accurate
    }

    {
        // Counts a maximum of 100 documents that have a "number_of_employees" value of 50
        // start-modify-accurate
        mongocxx::options::count opts;
        opts.limit(100); 
        auto result = collection.count_documents(make_document(kvp("number_of_employees", 50)), opts);
        std::cout << "Number of companies with 50 employees: " << result << std::endl;
        // end-modify-accurate
    }

    {
        // Estimates the number of documents in the collection
        // start-count-estimate
        auto result = collection.estimated_document_count();
        std::cout << "Estimated number of documents: " << result << std::endl;
        // end-count-estimate
    }

    {
        // Estimates the number of documents in the collection and sets a time limit on the operation
        // start-modify-estimate
        mongocxx::options::estimated_document_count opts;
        opts.max_time(std::chrono::milliseconds{1000}); 
        auto result = collection.estimated_document_count(opts);
        std::cout << "Estimated number of documents: " << result << std::endl;
        // end-modify-estimate
    }
}