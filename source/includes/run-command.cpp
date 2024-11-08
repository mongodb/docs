#include <iostream>

#include <bsoncxx/builder/basic/document.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>

using bsoncxx::builder::basic::kvp;
using bsoncxx::builder::basic::make_document;

int main() {
    mongocxx::instance instance;
    mongocxx::uri uri("<connection string>");
    mongocxx::client client(uri);
  

    {
        // start-run-hello
        auto db = client["my_database"];

        auto command = make_document(kvp("hello" , 1));
        auto result = db.run_command(command.view());       

        std::cout << bsoncxx::to_json(result) << std::endl; 
        // end-run-hello 
    }
    {
        // start-run-connectionStatus
        auto db = client["my_database"];

        auto command = make_document(kvp("connectionStatus" , 1), kvp("showPrivileges", true));
        auto result = db.run_command(command.view());

        std::cout << bsoncxx::to_json(result) << std::endl;
        // end-run-connectionStatus
    }
}