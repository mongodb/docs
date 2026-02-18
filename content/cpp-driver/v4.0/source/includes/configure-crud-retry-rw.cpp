#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>
#include <mongocxx/client.hpp>

int main_uri_example() {
    mongocxx::instance instance{};

    // Set localThresholdMS in the connection string to 35 milliseconds
    // start-retry-rw-uri
    mongocxx::uri uri{"mongodb://localhost:27017/?retryReads=false&retryWrites=false"};
    mongocxx::client client{uri};
    // end-retry-rw-uri

    return 0;
}