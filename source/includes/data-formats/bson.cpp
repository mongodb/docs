#include <iostream>
#include <chrono>

#include <bsoncxx/builder/basic/document.hpp>
#include <bsoncxx/builder/list.hpp>
#include <bsoncxx/builder/stream/document.hpp>
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

    {
        // Creates a BSON document using the list builder
        // start-bson-list
        bsoncxx::builder::list course_doc = { "title", "Poetry",
                                              "department", "English" };

        bsoncxx::builder::list courses_array = { "Poetry", "Literature",
                                                 "Creative Writing" };

        bsoncxx::document::value course{course_doc.view().get_document().value};
        // end-bson-list 
    }

    {
        // Creates a BSON document using the make_document() method
        // start-bson-make-document
        using bsoncxx::builder::basic::make_document; 
        using bsoncxx::builder::basic::kvp;

        bsoncxx::document::value course = make_document(
            kvp("title","Poetry"),
            kvp("department","English"));
        // end-bson-make-document
    }

    {
        // Creates a BSON document using the append() method
        // start-bson-append
        using bsoncxx::builder::basic::kvp;

        auto course_builder = bsoncxx::builder::basic::document{};
        course_builder.append(kvp("title", "Literature"),
                              kvp("department", "English"));
                              
        bsoncxx::document::value course{course_builder.extract()};
        // end-bson-append
    }

    {
        // Creates a BSON document using the stream builder
        // start-bson-stream
        auto course_builder = bsoncxx::builder::stream::document{};
        course_builder << "title" << "Creative Writing" << "credits" << bsoncxx::types::b_int32{4};

        bsoncxx::document::value course{course_builder.extract()};
        // end-bson-stream 
    }

    {
        // Creates and fills a builder::stream::document
        // start-bson-stream-finalize 
        using bsoncxx::builder::stream::document;
        using bsoncxx::builder::stream::finalize;

        bsoncxx::document::value doc = document{} << "title" << "Literature" << finalize;
        // end-bson-stream-finalize
    }

    {
        // Prints a BSON document
        // start-bson-print
        bsoncxx::document::value course = make_document(
            kvp("title","Screenwriting"),
            kvp("department","English"));

        std::cout << bsoncxx::to_json(course.view()) << std::endl;
        // end-bson-print
    }
}