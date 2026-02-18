// start-search
#include <iostream>
#include <bsoncxx/json.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/exception/exception.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/pipeline.hpp>

int main() {
    const mongocxx::instance instance{};
    
    try {
        const mongocxx::client client{mongocxx::uri{"<connection-string>"}};
        auto collection = client["sample_mflix"]["movies"];

        mongocxx::pipeline pipeline{};
        
        auto search_stage = bsoncxx::from_json(R"(
        {
            "$search": {
                "index": "test_index",
                "compound": {
                    "mustNot": [
                        {
                            "text": {
                                "query": [ "Comedy" ],
                                "path": "genres"
                            }
                        }
                    ],
                    "must": [
                        {
                            "text": {
                                "query": [ "New York" ],
                                "path": "title"
                            }
                        }
                    ]
                }
            }
        }
        )");
        
        pipeline.append_stage(search_stage.view());
        pipeline.limit(10);
        
        pipeline.project(bsoncxx::from_json(R"(
        { "_id" : 0, "title" : 1, "score" : { "$meta" : "searchScore" } }
        )"));

        auto cursor = collection.aggregate(pipeline);

        for (const auto& doc : cursor) {
            std::cout << bsoncxx::to_json(doc) << std::endl;
        }

    } catch (const mongocxx::exception& e) {
        std::cerr << "MongoDB error: " << e.what() << std::endl;
        return EXIT_FAILURE;
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
        return EXIT_FAILURE;
    }

    return EXIT_SUCCESS;
}
// end-search