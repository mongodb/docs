#include <cstdint>
#include <iostream>
#include <vector>

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
    auto db = client["db"];
    auto collection = db["coll"];

    {
        // Inserts one document that stores the specified value
        // start-insert-one
        auto result = collection.insert_one(make_document(kvp("<field name>", "<value>")));
        // end-insert-one
    }

    {
        // Inserts multiple documents that store the specified values
        // start-insert-multiple
        std::vector<bsoncxx::document::value> documents;
        documents.push_back(make_document(kvp("<field name>", "<value>")));
        documents.push_back(make_document(kvp("<field name>", "<value>")));

        auto result = collection.insert_many(documents);
        // end-insert-multiple
    }

    {
        // Updates a document that matches the specified criteria
        // start-update-one
        auto query_filter = make_document(kvp("<field to match>", "<value to match>"));
        auto update_doc = make_document(kvp("$set", make_document(kvp("<field name>", "<value>"))));

        auto result = collection.update_one(query_filter.view(), update_doc.view());
        // end-update-one
    }

    {
        // Updates all documents that match the specified criteria
        // start-update-multiple
        auto query_filter = make_document(kvp("<field to match>", "<value to match>"));
        auto update_doc = make_document(kvp("$set", make_document(kvp("<field name>", "<value>"))));

        auto result = collection.update_many(query_filter.view(), update_doc.view());
        // end-update-multiple
    }

    {
        // Replaces a document that matches the specified criteria
        // start-replace-one
        auto query_filter = make_document(kvp("<field to match>", "<value to match>"));
        auto replace_doc = make_document(make_document(kvp("<field name>", "<value>")));

        auto result = collection.replace_one(query_filter.view(), replace_doc.view());
        // end-replace-one 
    }

    {
        // Deletes a document that matches the specified criteria
        // start-delete-one
        auto result = collection.delete_one(make_document(kvp("<field name>", "<value>")));
        // end-delete-one
    }

    {
        // Deletes all documents that match the specified criteria
        // start-delete-multiple
        auto result = collection.delete_many(make_document(kvp("<field name>", "<value>")));
        // end-delete-multiple
    }

    {
        // Runs a bulk operation based on the instructions in each write model
        // start-bulk-write
        auto bulk = collection.create_bulk_write();

        auto insert_doc = make_document(kvp("<field name>", "<value>"));
        auto update_filter = make_document(kvp("<field name>", "<value>"));
        auto update_doc = make_document(kvp("$set", make_document(kvp("<field name>", "<value>"))));
        auto delete_filter = make_document(kvp("<field name>", "<value>"));

        mongocxx::model::insert_one insert_op{insert_doc.view()};
        mongocxx::model::update_many update_op{update_filter.view(), update_doc.view()};
        mongocxx::model::delete_one delete_op{delete_filter.view()};

        bulk.append(insert_op);
        bulk.append(update_op);
        bulk.append(delete_op);
        
        auto result = bulk.execute();
        // end-bulk-write
    }

}