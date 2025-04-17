#include <aws/core/Aws.h>
#include <aws/lambda-runtime/runtime.h>
#include <bsoncxx/json.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>
#include <mongocxx/options/client.hpp>
#include <mongocxx/options/server_api.hpp>
#include <mongocxx/exception/exception.hpp>
#include <cstdlib>
#include <iostream>

using namespace aws::lambda_runtime;

class ExampleAwsHandler
{
private:
    mongocxx::client mongo_client;

    client CreateMongoClient()
    {
        mongocxx::uri uri("mongodb://<hostname>:<port>/?authMechanism=MONGODB-AWS");
        mongocxx::options::server_api server_api_options(mongocxx::options::server_api::version::k_version_1);
        mongocxx::options::client client_options;
        client_options.server_api_opts(server_api_options);
        return client(uri, client_options);
    }

public:
    ExampleAwsHandler()
        : mongo_client(CreateMongoClient())
    {
    }

    std::string HandleRequest()
    {
        try
        {
            using bsoncxx::builder::basic::kvp;
            using bsoncxx::builder::basic::make_document;

            auto db = mongo_client["my_database"];
            auto command = make_document(kvp("hello", 1));
            auto result = db.run_command(command.view());
            return bsoncxx::to_json(result);
        }
        catch (const mongocxx::exception &e)
        {
            std::cerr << "MongoDB Exception: " << e.what() << std::endl;
            return "{}";
        }
    }
};

static invocation_response my_handler(invocation_request const &)
{
    ExampleAwsHandler handler;
    std::string response = handler.HandleRequest();
    return invocation_response::success(response, "application/json");
}

int main()
{
    Aws::SDKOptions options;
    Aws::InitAPI(options);
    {
        mongocxx::instance instance{};
        run_handler(my_handler);
    }
    Aws::ShutdownAPI(options);
    return 0;
}