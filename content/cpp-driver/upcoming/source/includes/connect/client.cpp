#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>
#include <mongocxx/client.hpp>

int main()
{
    mongocxx::instance instance;
    mongocxx::uri uri("mongodb://localhost:27017");
    mongocxx::client client(uri);
}