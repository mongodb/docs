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

    // start-db-coll
    auto db = client["sample_restaurants"];
    auto collection = db["restaurants"];
    // end-db-coll

    // Creates a bulk_write instance to contain the write models
    // start-create-bulk-write
    auto bulk = collection.create_bulk_write();
    // end-create-bulk-write

    {
        // Creates a write model to specify an insert operation and adds it to the bulk operation
        // start-bulk-insert-one
        auto insert_doc = make_document(kvp("name", "Mongo's Deli"),
                                        kvp("cuisine", "Sandwiches"),
                                        kvp("borough", "Manhattan"),
                                        kvp("restaurant_id", "1234"));
        
        mongocxx::model::insert_one insert_op{insert_doc.view()};
        bulk.append(insert_op);
        // end-bulk-insert-one
    }

    {
        // Creates a write model to specify an update one operation and adds it to the bulk operation
        // start-bulk-update-one
        auto filter_doc = make_document(kvp("name", "Mongo's Deli"));
        auto update_doc = make_document(kvp("$set", make_document(kvp("cuisine", "Sandwiches and Salads"))));
        
        mongocxx::model::update_one update_op{filter_doc.view(), update_doc.view()};
        bulk.append(update_op);
        // end-bulk-update-one
    }

    {
        // Creates a write model to specify an update many operation and adds it to the bulk operation
        // start-bulk-update-many
        auto filter_doc = make_document(kvp("name", "Mongo's Deli"));
        auto update_doc = make_document(kvp("$set", make_document(kvp("cuisine", "Sandwiches and Salads"))));
        
        mongocxx::model::update_many update_op{filter_doc.view(), update_doc.view()};
        bulk.append(update_op);
        // end-bulk-update-many
    }

    {
        // Creates a write model to specify a replace operation and adds it to the bulk operation
        // start-bulk-replace-one
        auto filter_doc = make_document(kvp("restaurant_id", "1234"));
        auto replace_doc = make_document(kvp("name", "Mongo's Deli"),
                                        kvp("cuisine", "Sandwiches and Salads"),
                                        kvp("borough", "Brooklyn"),
                                        kvp("restaurant_id", "5678"));
        
        mongocxx::model::replace_one replace_op{filter_doc.view(), replace_doc.view()};
        bulk.append(replace_op);
        // end-bulk-replace-one
    }

    {
        // Creates a write model to specify a delete one operation and adds it to the bulk operation
        // start-bulk-delete-one
        auto filter_doc = make_document(kvp("restaurant_id", "5678"));
        
        mongocxx::model::delete_one delete_op{filter_doc.view()};
        bulk.append(delete_op);
        // end-bulk-delete-one
    }

    {
        // Creates a write model to specify a delete many operation and adds it to the bulk operation
        // start-bulk-delete-many
        auto filter_doc = make_document(kvp("borough", "Manhattan"));
        
        mongocxx::model::delete_many delete_op{filter_doc.view()};
        bulk.append(delete_op);
        // end-bulk-delete-many
    }

    {
        // Runs the bulk operation based on the instructions in each write model
        // start-bulk-run
        auto bulk = collection.create_bulk_write();

        // Specifies documents to insert, update, replace, or delete
        auto insert_doc = make_document(kvp("name", "Mongo's Deli"),
                                        kvp("cuisine", "Sandwiches"),
                                        kvp("borough", "Manhattan"),
                                        kvp("restaurant_id", "1234"));
        auto update_filter = make_document(kvp("name", "Mongo's Deli"));
        auto update_doc = make_document(kvp("$set", make_document(kvp("cuisine", "Sandwiches and Salads"))));
        auto replace_filter = make_document(kvp("restaurant_id", "1234"));
        auto replace_doc = make_document(kvp("name", "Mongo's Deli"),
                                        kvp("cuisine", "Sandwiches and Salads"),
                                        kvp("borough", "Brooklyn"),
                                        kvp("restaurant_id", "5678"));
        auto delete_filter = make_document(kvp("borough", "Manhattan"));

        // Creates write models for each write operation using the preceding documents
        mongocxx::model::insert_one insert_op{insert_doc.view()};
        mongocxx::model::update_many update_op{update_filter.view(), update_doc.view()};
        mongocxx::model::replace_one replace_op{replace_filter.view(), replace_doc.view()};
        mongocxx::model::delete_many delete_op{delete_filter.view()};

        // Appends each write model to the bulk operation
        bulk.append(insert_op);
        bulk.append(update_op);
        bulk.append(replace_op);
        bulk.append(delete_op);
        
        // Runs the bulk operation
        auto result = bulk.execute();
        std::cout << "Modified documents: " << result->modified_count() << std::endl;
        // end-bulk-run
    }

    {
        // Creates a bulk_write instance and instructs the operation to not run in order
        // start-bulk-write-unordered
        mongocxx::options::bulk_write opts;
        opts.ordered(false);
        auto bulk = collection.create_bulk_write(opts);
        // end-bulk-write-unordered
    }
}