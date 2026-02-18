#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/logger.hpp>
#include <mongocxx/uri.hpp>
#include <bsoncxx/builder/stream/document.hpp>
#include <bsoncxx/json.hpp>
#include <bsoncxx/stdx/string_view.hpp>
#include <bsoncxx/builder/basic/document.hpp>

#include <iostream>
#include <fstream>
#include <memory>
#include <chrono>
#include <iomanip>
#include <sstream>

using bsoncxx::builder::basic::kvp;
using bsoncxx::builder::basic::make_document;

// start-logger
// Creates a filtered logger that only logs messages at or above a specified level
class filtered_logger : public mongocxx::logger {
public:
    // Sets the default minimum log level to WARNING
    explicit filtered_logger(mongocxx::log_level min_level = mongocxx::log_level::k_warning)
        : min_level_(min_level) {}

    void operator()(mongocxx::log_level level,
                   std::string_view domain,
                   std::string_view message) noexcept override {
        // Only log messages at or above the minimum level
        if (level <= min_level_) {
            std::cout << "[" << level_to_string(level) << "] "
                     << domain << ": " << message << std::endl;
        }
    }

private:
    mongocxx::log_level min_level_;

    std::string level_to_string(mongocxx::log_level level) const {
        switch (level) {
            case mongocxx::log_level::k_error: return "ERROR";
            case mongocxx::log_level::k_critical: return "CRITICAL";
            case mongocxx::log_level::k_warning: return "WARNING";
            case mongocxx::log_level::k_message: return "MESSAGE";
            case mongocxx::log_level::k_info: return "INFO";
            case mongocxx::log_level::k_debug: return "DEBUG";
            case mongocxx::log_level::k_trace: return "TRACE";
            default: return "UNKNOWN";
        }
    }
};

// Creates a new logger for the client
void example_filtered_logger() {
    std::cout << "\n=== Filtered Logger (INFO and above) ===" << std::endl;
    
    // Logs INFO, MESSAGE, WARNING, CRITICAL, and ERROR messages
    auto logger = std::make_unique<filtered_logger>(mongocxx::log_level::k_info);
    mongocxx::instance instance{std::move(logger)};
    
    mongocxx::uri uri("mongodb://127.0.0.1:27017");
    mongocxx::client client(uri);
    auto collection = client["test"]["example3"];
    
    bsoncxx::builder::stream::document doc{};
    doc << "name" << "Filtered Test";
    collection.insert_one(doc.view());
    
    std::cout << "Operation completed! (Debug and Trace messages were filtered out)" << std::endl;
}
// end-logger

int main() {
    try {
        example_filtered_logger();

    } catch (const std::exception& e) {
        std::cerr << "Exception: " << e.what() << std::endl;
        return 1;
    }
    
    return 0;
}