#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>
#include <bsoncxx/builder/stream/document.hpp>
#include <bsoncxx/builder/stream/helpers.hpp>
#include <bsoncxx/json.hpp>
#include <bsoncxx/types.hpp>
#include <iostream>
#include <chrono>
#include <thread>
#include <ctime>

using bsoncxx::builder::stream::close_array;
using bsoncxx::builder::stream::close_document;
using bsoncxx::builder::stream::document;
using bsoncxx::builder::stream::finalize;
using bsoncxx::builder::stream::open_array;
using bsoncxx::builder::stream::open_document;

// Function to update the materialized view
void update_monthly_phone_transactions(mongocxx::client& client, mongocxx::collection collection) {
    // Create the aggregation pipeline
    auto pipeline = mongocxx::pipeline{};
    pipeline.match(document{} << "purchaseMethod" << "Phone" << finalize);
    pipeline.unwind("$items");
    pipeline.group(document{} << "_id" << open_document 
                              << "$dateToString" << open_document 
                              << "format" << "%Y-%m" 
                              << "date" << "$saleDate" 
                              << close_document << close_document
                              << "sales_quantity" << open_document 
                              << "$sum" << "$items.quantity" 
                              << close_document
                              << "sales_price" << open_document 
                              << "$sum" << "$items.price" 
                              << close_document << finalize);
    pipeline.add_fields(document{} << "sales_price" << open_document 
                                  << "$toDouble" << "$sales_price" 
                                  << close_document << finalize);
    pipeline.merge(document{} << "into" << "monthlyPhoneTransactions" 
                             << "whenMatched" << "replace" << finalize);
    
    // Run the aggregation
    auto cursor = collection.aggregate(pipeline);
    
    for (auto&& doc : cursor) {
        //  Consume the cursor to execute the pipeline
    }
}

int main() {
    // Initialize the MongoDB C++ Driver
    mongocxx::instance instance{};
    
    // Connect to MongoDB
    mongocxx::uri uri("<connection-string>");
    mongocxx::client client(uri);
    
    auto sales = client["sample_supplies"]["sales"];
    auto purchase_orders = client["sample_supplies"]["purchaseOrders"];
    
    // Update immediately on startup
    update_monthly_phone_transactions(client, sales);
    update_monthly_phone_transactions(client, purchase_orders);
    std::cout << "Initial update completed. Materialized view is ready." << std::endl;
    
    // Example of a simple scheduler that updates monthly
    int day_of_month = 1; // Update on the 1st of each month
    
    while (true) {
        auto now = std::chrono::system_clock::now();
        std::time_t now_c = std::chrono::system_clock::to_time_t(now);
        std::tm* local_time = std::localtime(&now_c);
        
        if (local_time->tm_mday == day_of_month && local_time->tm_hour == 0 && local_time->tm_min == 0) {
            // It's midnight on the 1st of the month - update the view
            update_monthly_phone_transactions(client, sales);
            update_monthly_phone_transactions(client, purchase_orders);
            std::cout << "Scheduled update completed at " << std::ctime(&now_c);
            
            // Sleep for an hour to avoid multiple updates
            std::this_thread::sleep_for(std::chrono::hours(1));
        } else {
            // Check again in a minute
            std::this_thread::sleep_for(std::chrono::minutes(1));
        }
    }
    
    return 0;
}