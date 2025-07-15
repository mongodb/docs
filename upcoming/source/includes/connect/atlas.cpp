#include <mongocxx/instance.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/uri.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/exception/exception.hpp>

using bsoncxx::builder::basic::kvp;
using bsoncxx::builder::basic::make_document;

int main()
{
    mongocxx::instance instance;

    // Replace the placeholder with your Atlas connection string
    mongocxx::uri uri("<connection string>");

    // Create a mongocxx::client with a mongocxx::options::client object to set the Stable API version
    mongocxx::options::client client_options;
    mongocxx::options::server_api server_api_options(mongocxx::options::server_api::version::k_version_1);
    client_options.server_api_opts(server_api_options);
    mongocxx::client client(uri, client_options);

    try
    {
        // Ping the server to verify that the connection works
        auto admin = client["admin"];
        auto command = make_document(kvp("ping", 1));
        auto result = admin.run_command(command.view());
        std::cout << bsoncxx::to_json(result) << "\n";
        std::cout << "Pinged your deployment. You successfully connected to MongoDB!\n";
    }
    catch (const mongocxx::exception &e)
    {
        std::cerr << "An exception occurred: " << e.what() << "\n";
        return EXIT_FAILURE;
    }
}