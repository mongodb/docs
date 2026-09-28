#include <iostream>

#include <bsoncxx/builder/basic/document.hpp>
#include <bsoncxx/builder/basic/kvp.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/pipeline.hpp>
#include <mongocxx/uri.hpp>

int main() {
    mongocxx::instance instance;
    mongocxx::uri uri{"<connection string>"};
	mongocxx::client client{uri};

    auto db = client["agg_tutorials_db"];
    db.drop();

    // start-insert-persons
    auto persons = db["persons"];

    std::vector<bsoncxx::document::value> docs = {
        bsoncxx::from_json(R"({
            "person_id": "6392529400",
            "firstname": "Elise",
            "lastname": "Smith",
            "dateofbirth": {"$date": 620947927},
            "vocation": "ENGINEER",
            "address": {
                "number": 5625,
                "street": "Tipa Circle",
                "city": "Wojzinmoj"
            }
        })"),
        bsoncxx::from_json(R"({
            "person_id": "1723338115",
            "firstname": "Olive",
            "lastname": "Ranieri",
            "dateofbirth": {"$date": 485529270000},
            "gender": "FEMALE",
            "vocation": "ENGINEER",
            "address": {
                "number": 9303,
                "street": "Mele Circle",
                "city": "Tobihbo"
            }
        })"),
        bsoncxx::from_json(R"({
            "person_id": "8732762874",
            "firstname": "Toni",
            "lastname": "Jones",
            "dateofbirth": {"$date": 690978836000},
            "vocation": "POLITICIAN",
            "address": {
                "number": 1,
                "street": "High Street",
                "city": "Upper Abbeywoodington"
            }
        })"),
        bsoncxx::from_json(R"({
            "person_id": "7363629563",
            "firstname": "Bert",
            "lastname": "Gooding",
            "dateofbirth": {"$date": -88368048000},
            "vocation": "FLORIST",
            "address": {
                "number": 13,
                "street": "Upper Bold Road",
                "city": "Redringtonville"
            }
        })"),
        bsoncxx::from_json(R"({
            "person_id": "1029648329",
            "firstname": "Sophie",
            "lastname": "Celements",
            "dateofbirth": {"$date": -31561935000},
            "vocation": "ENGINEER",
            "address": {
                "number": 5,
                "street": "Innings Close",
                "city": "Basilbridge"
            }
        })"),
        bsoncxx::from_json(R"({
            "person_id": "7363626383",
            "firstname": "Carl",
            "lastname": "Simmons",
            "dateofbirth": {"$date": 915148835000},
            "vocation": "ENGINEER",
            "address": {
                "number": 187,
                "street": "Hillside Road",
                "city": "Kenningford"
            }
        })")
    };

    auto result = persons.insert_many(docs); // Might throw an exception
    // end-insert-persons

    // Create the aggregation pipeline
    mongocxx::pipeline pipeline;

    // start-match
    pipeline.match(bsoncxx::from_json(R"({
        "vocation": "ENGINEER"
    })"));
    // end-match

    // start-sort
    pipeline.sort(bsoncxx::from_json(R"({
        "dateofbirth": -1
    })"));
    // end-sort

    // start-limit
    pipeline.limit(3);
    // end-limit

    // start-unset
    pipeline.append_stage(bsoncxx::from_json(R"({
        "$unset": ["_id", "address"]
    })"));
    // end-unset

    // start-run-agg
    auto cursor = persons.aggregate(pipeline);
    // end-run-agg

    for (auto&& doc : cursor) {
        std::cout << bsoncxx::to_json(doc, bsoncxx::ExtendedJsonMode::k_relaxed) << std::endl;
    }
}