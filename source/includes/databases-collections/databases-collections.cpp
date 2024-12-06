#include <iostream>

#include <bsoncxx/builder/basic/document.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>

using bsoncxx::builder::basic::kvp;
using bsoncxx::builder::basic::make_document;
using bsoncxx::builder::basic::make_array;


int main() {
    mongocxx::instance instance;
    mongocxx::uri uri("<connection string>");
    mongocxx::client client(uri);
    mongocxx::database database = client["db"];

    {
        // Accesses the test_database database using a method
        // start-access-database-method
        auto db = client.database("test_database");
        // end-access-database-method
    }

    {
        // Accesses the test_database database using a shorthand operator
        // start-access-database-operator
        auto db = client["test_database"];
        // end-access-database-operator
    }

    {
        // Accesses the test_collection collection using a method
        // start-access-collection-method
        auto coll = database.collection("test_collection");
        // end-access-collection-method
    }

    {
        // Accesses the test_collection collection using a shorthand operator
        // start-access-collection-operator
        auto coll = database["test_collection"];
        // end-access-collection-operator
    }

    {
        // Explicitly creates a collection in the database
        // start-create-collection
        auto coll = database.create_collection("example_collection");
        // end-create-collection
    }

    {
        // Retrieves information about each collection in the database
        // start-find-collections
        auto cursor = database.list_collections();

        for(auto&& doc : cursor) {
            std::cout << bsoncxx::to_json(doc) << std::endl;
        }
        // end-find-collections
    }

    {
        // Retrieves the name of each collection in the database
        // start-find-collection-names
        auto list = database.list_collection_names();

        for(auto&& name : list) {
            std::cout << name << std::endl;
        }
        // end-find-collection-names
    }

    {
        // Deletes the test_collection collection
        // start-delete-collection
        auto coll = database["test_collection"];
        coll.drop();
        // end-delete-collection
    }

    {
        // Sets read settings for the "test_database" database
        // start-database-read-settings
        auto db = client["test_database"];

        mongocxx::read_preference rp;
        rp.mode(mongocxx::read_preference::read_mode::k_secondary);
        mongocxx::read_concern rc;
        rc.acknowledge_level(mongocxx::read_concern::level::k_majority);

        db.read_preference(rp);
        db.read_concern(rc);
        // end-database-read-settings
    }

    {
        // Sets read and write settings for the "test_collection" collection
        // start-collection-read-write-settings
        auto coll = client["test_database"]["test_collection"];

        mongocxx::read_concern rc;
        rc.acknowledge_level(mongocxx::read_concern::level::k_local);
        mongocxx::write_concern wc;
        wc.acknowledge_level(mongocxx::write_concern::level::k_acknowledged);

        coll.read_concern(rc);
        coll.write_concern(wc);
        // end-collection-read-write-settings
    }

    {
        // Instructs the driver to prefer reads from secondary replica set members
        // located in New York, falling back to secondaries in San Francisco
        // start-tags
        auto tag_set_ny = make_document(kvp("dc", "ny"));
        auto tag_set_sf = make_document(kvp("dc", "sf"));

        mongocxx::read_preference rp;
        rp.mode(mongocxx::read_preference::read_mode::k_secondary);
        rp.tags(make_array(tag_set_ny, tag_set_sf).view());
        // end-tags
    }

    {
        // Instructs the driver to distribute reads between members within 35 milliseconds
        // of the closest member's ping time
        // start-local-threshold
        mongocxx::uri uri("mongodb://localhost:27017/?localThresholdMS=35");
        mongocxx::client client(uri);
        // end-local-threshold
    }
}