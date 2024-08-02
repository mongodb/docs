#include <bsoncxx/json.hpp>

#include <mongocxx/client.hpp>
#include <mongocxx/exception/exception.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>

#include <iostream>

int main()
{
    mongocxx::instance instance;

    try
    {
        // Start example code here

        // End example code here

        auto admin = client["admin"];
        admin.run_command(bsoncxx::from_json(R"({ "ping": 1 })"));

        std::cout << "Successfully pinged the MongoDB server." << std::endl;
    }
    catch (const mongocxx::exception &e)
    {
        std::cout << "An exception occurred: " << e.what() << std::endl;
        return EXIT_FAILURE;
    }

    return EXIT_SUCCESS;
}