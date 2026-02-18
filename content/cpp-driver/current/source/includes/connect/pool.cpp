#include <iostream>
#include <thread>
#include <vector>

#include <bsoncxx/builder/basic/document.hpp>
#include <bsoncxx/builder/basic/kvp.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/pool.hpp>
#include <mongocxx/uri.hpp>

using bsoncxx::builder::basic::kvp;
using bsoncxx::builder::basic::make_document;

int main() {
    mongocxx::instance instance{};
    
    mongocxx::uri uri{"mongodb://localhost:27017"};
    mongocxx::pool pool{uri};
    
    std::vector<std::thread> threads;
    
    // Creates multiple threads that each acquire a client from the pool
    for (int i = 0; i < 3; ++i) {
        threads.emplace_back([&pool, i]() {
            auto client = pool.acquire();
            auto collection = (*client)["db"]["coll"];
            
            // Inserts a sample document
            collection.insert_one(make_document(kvp("thread_id", i)));
            
            std::cout << "Thread " << i << " inserted a document" << std::endl;
        });
    }
    
    // Waits for all threads to complete
    for (auto& thread : threads) {
        thread.join();
    }
    
    std::cout << "All threads completed" << std::endl;
    
    return 0;
}

