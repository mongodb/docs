#include <iostream>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>
#include <mongocxx/options/apm.hpp>

int main() {
    mongocxx::instance instance{};
    
    int command_started_events = 0;
    
    mongocxx::options::apm apm_opts;
    apm_opts.on_command_started([&command_started_events](const mongocxx::events::command_started_event& event) {
        command_started_events++;
        std::cout << "Command started: " << event.command_name() 
                  << " (request_id: " << event.request_id() << ")" << std::endl;
    });
    
    mongocxx::uri uri("<connection string URI>");
    mongocxx::options::client client_opts;
    client_opts.apm_opts(apm_opts);
    
    mongocxx::client client{uri, client_opts};
    
    // Perform database operations
    
    std::cout << "Observed " << command_started_events << " command started events" << std::endl;
    
    return 0;
}
