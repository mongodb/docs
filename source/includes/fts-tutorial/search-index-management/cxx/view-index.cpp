#include <bsoncxx/json.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/search_index_view.hpp>

using namespace mongocxx;

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

        // Access and print the indexes in your collection
        auto siv = collection.search_indexes();
        auto cursor = siv.list();

        for (auto&& doc : cursor) {
            std::cout << bsoncxx::to_json(doc) << std::endl;
        };
    }
    catch (const std::exception& e) 
    {
        std::cout<< "Exception: " << e.what() << std::endl;
    }

    return 0;
}
