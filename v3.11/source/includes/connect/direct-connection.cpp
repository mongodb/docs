#include <mongocxx/instance.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/uri.hpp>

int main()
{
    mongocxx::instance instance;
    mongocxx::uri uri("mongodb://<hostname>:<port>/?directConnection=true");
    mongocxx::client client(uri);
}