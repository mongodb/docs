// start-specify-v1
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>
#include <mongocxx/client.hpp>

int main()
{
    mongocxx::instance instance;
    mongocxx::uri uri("mongodb://<hostname>:<port>");

    mongocxx::options::server_api server_api_options(mongocxx::options::server_api::version::k_version_1);
    mongocxx::options::client client_options;
    client_options.server_api_opts(server_api_options);
    mongocxx::client client(uri, client_options);
}
// end-specify-v1

// start-stable-api-options
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>
#include <mongocxx/client.hpp>

int main()
{
    mongocxx::instance instance;
    mongocxx::uri uri("mongodb://<hostname>:<port>");

    mongocxx::options::server_api server_api_options(mongocxx::options::server_api::version::k_version_1);
    server_api_options.strict(true);
    server_api_options.deprecation_errors(true);
    mongocxx::options::client client_options;
    client_options.server_api_opts(server_api_options);
    mongocxx::client client(uri, client_options);
}
// end-stable-api-options