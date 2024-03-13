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

        // Create index models and add them to a vector
        auto siv = collection.search_indexes();
        std::vector<search_index_model> models;

        auto name1 = "<firstIndexName>";
        auto definition1 = make_document(/* Add search index definition fields here */);
        auto model1 = search_index_model(name1, definition1.view());
        models.push_back(model1);
        
        auto name2 = "<secondIndexName>";
        auto definition2 = make_document(/* Add search index definition fields here */);
        auto model2 = search_index_model(name2, definition2.view());
        models.push_back(model2);

        // Create the search indexes
        siv.create_many(models);
        std::cout << "Indexes created!" << std::endl;
    }
    catch (const std::exception& e) 
    {
        std::cout<< "Exception: " << e.what() << std::endl;
    }

    return 0;
}