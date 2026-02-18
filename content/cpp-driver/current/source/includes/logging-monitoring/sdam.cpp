#include <iostream>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>
#include <mongocxx/options/apm.hpp>

int main() {
    mongocxx::instance instance{};
    
    int server_opening_events = 0;
    
    mongocxx::options::apm apm_opts;
    apm_opts.on_server_opening([&server_opening_events](const mongocxx::events::server_opening_event& event) {
        server_opening_events++;
        std::cout << "Server opening: " << event.host() << ":" << event.port() << std::endl;
    });
    
    mongocxx::uri uri("<connection string URI>");
    mongocxx::options::client client_opts;
    client_opts.apm_opts(apm_opts);
    
    mongocxx::client client{uri, client_opts};
    
    // Perform database operations
    
    std::cout << "Observed " << server_opening_events << " server opening events" << std::endl;
    
    return 0;
}