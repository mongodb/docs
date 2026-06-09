#include <bsoncxx/builder/basic/document.hpp>
#include <bsoncxx/builder/basic/kvp.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/search_index_view.hpp>

using bsoncxx::builder::basic::kvp;
using bsoncxx::builder::basic::make_document;
using namespace mongocxx;

int main()
{ 
    try
    {
        // Connect to your Atlas deployment
        mongocxx::instance instance{};
        mongocxx::uri uri("<connectionString>");
        mongocxx::client client(uri); 

        // Access your database and collection
        auto db = client["<databaseName>"];
        auto collection = db["<collectionName>"];

        // Create an index model with your index name and definition
        auto siv = collection.search_indexes();
        auto name = "<indexName>";
        auto definition = make_document(kvp("mappings", make_document(kvp("dynamic", true))));
        auto model = search_index_model(name, definition.view());

        // Create the search index
        siv.create_one(model);
        std::cout << "Index created!" << std::endl;
    }
    catch (const std::exception& e) 
    {
        std::cout<< "Exception: " << e.what() << std::endl;
    }

    return 0;
}