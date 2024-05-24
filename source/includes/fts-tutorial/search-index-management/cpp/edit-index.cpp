#include <bsoncxx/builder/basic/document.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/search_index_view.hpp>

using namespace mongocxx;
using bsoncxx::builder::basic::make_document;

int main()
{ 
    mongocxx::instance instance{};
    try
    {
        // Connect to your Atlas deployment
        mongocxx::uri uri("<connectionString>");
        mongocxx::client client(uri); 

        // Access your database and collection
        auto db = client["<databaseName>"];
        auto collection = db["<collectionName>"];

        // Access the indexes in your collection
        auto siv = collection.search_indexes();

        // Specify a new definiton and update your search index
        auto newDefinition = make_document(kvp("mappings", make_document(kvp("dynamic", true))));
        siv.update_one("<indexName>", newDefinition.view());
        
    }
    catch (const std::exception& e) 
    {
        std::cout<< "Exception: " << e.what() << std::endl;
    }

    return 0;
}