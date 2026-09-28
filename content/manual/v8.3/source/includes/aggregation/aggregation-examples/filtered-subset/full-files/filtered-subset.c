#include <stdio.h>
#include <bson/bson.h>
#include <mongoc/mongoc.h>

int main(void)
{
    mongoc_init();

    char *uri = "<connection string>";
    mongoc_client_t *client = mongoc_client_new(uri);
    // start-insert-persons
    mongoc_collection_t *persons = mongoc_client_get_collection(client, "agg_tutorials_db", "persons");

    {
        bson_t *filter = bson_new();
        bson_error_t error;
        if (!mongoc_collection_delete_many(persons, filter, NULL, NULL, &error))
        {
            fprintf(stderr, "Delete error: %s\n", error.message);
        }
        bson_destroy(filter);
    }

    {
        size_t num_docs = 6;
        bson_t *docs[num_docs];

        docs[0] = BCON_NEW(
            "person_id", "6392529400",
            "firstname", "Elise",
            "lastname", "Smith",
            "dateofbirth", BCON_DATE_TIME(653616727000UL), // 1972-01-13T09:32:07Z
            "vocation", "ENGINEER",
            "address", "{",
            "number", BCON_INT32(5625),
            "street", "Tipa Circle",
            "city", "Wojzinmoj",
            "}");

        docs[1] = BCON_NEW(
            "person_id", "1723338115",
            "firstname", "Olive",
            "lastname", "Ranieri",
            "dateofbirth", BCON_DATE_TIME(485113500000UL), // 1985-05-12T23:14:30Z
            "gender", "FEMALE",
            "vocation", "ENGINEER",
            "address", "{",
            "number", BCON_INT32(9303),
            "street", "Mele Circle",
            "city", "Tobihbo",
            "}");

        docs[2] = BCON_NEW(
            "person_id", "8732762874",
            "firstname", "Toni",
            "lastname", "Jones",
            "dateofbirth", BCON_DATE_TIME(690559710000UL), // 1991-11-23T16:53:56Z
            "vocation", "POLITICIAN",
            "address", "{",
            "number", BCON_INT32(1),
            "street", "High Street",
            "city", "Upper Abbeywoodington",
            "}");

        docs[3] = BCON_NEW(
            "person_id", "7363629563",
            "firstname", "Bert",
            "lastname", "Gooding",
            "dateofbirth", BCON_DATE_TIME(449595112000UL), // 1941-04-07T22:11:52Z
            "vocation", "FLORIST",
            "address", "{",
            "number", BCON_INT32(13),
            "street", "Upper Bold Road",
            "city", "Redringtonville",
            "}");

        docs[4] = BCON_NEW(
            "person_id", "1029648329",
            "firstname", "Sophie",
            "lastname", "Celements",
            "dateofbirth", BCON_DATE_TIME(316265745000UL), // 1959-07-06T17:35:45Z
            "vocation", "ENGINEER",
            "address", "{",
            "number", BCON_INT32(5),
            "street", "Innings Close",
            "city", "Basilbridge",
            "}");

        docs[5] = BCON_NEW(
            "person_id", "7363626383",
            "firstname", "Carl",
            "lastname", "Simmons",
            "dateofbirth", BCON_DATE_TIME(915250045000UL), // 1998-12-26T13:13:55Z
            "vocation", "ENGINEER",
            "address", "{",
            "number", BCON_INT32(187),
            "street", "Hillside Road",
            "city", "Kenningford",
            "}");

        bson_error_t error;
        if (!mongoc_collection_insert_many(persons, (const bson_t **)docs, num_docs, NULL, NULL, &error))
        {
            fprintf(stderr, "Insert error: %s\n", error.message);
        }

        for (int i = 0; i < num_docs; i++)
        {
            bson_destroy(docs[i]);
        }
    }
    // end-insert-persons

    {
        const bson_t *doc;
        bson_t *pipeline = BCON_NEW(
            "pipeline", "[",
            // start-match
            "{", "$match", "{", "vocation", BCON_UTF8("ENGINEER"), "}", "}",
            // end-match
            // start-sort
            "{", "$sort", "{", "dateofbirth", BCON_INT32(-1), "}", "}",
            // end-sort
            // start-limit
            "{", "$limit", BCON_INT32(3), "}",
            // end-limit
            // start-unset
            "{", "$unset", "[", BCON_UTF8("_id"), BCON_UTF8("address"), "]", "}",
            // end-unset
            "]");

        // start-run-agg
        mongoc_cursor_t *results =
            mongoc_collection_aggregate(persons, MONGOC_QUERY_NONE, pipeline, NULL, NULL);

        bson_destroy(pipeline);
        // end-run-agg

        while (mongoc_cursor_next(results, &doc))
        {
            char *str = bson_as_canonical_extended_json(doc, NULL);
            printf("%s\n", str);
            bson_free(str);
        }
        bson_error_t error;
        if (mongoc_cursor_error(results, &error))
        {
            fprintf(stderr, "Aggregation error: %s\n", error.message);
        }

        mongoc_cursor_destroy(results);
    }

    // start-cleanup
    mongoc_collection_destroy(persons);
    // end-cleanup
    mongoc_client_destroy(client);
    mongoc_cleanup();

    return EXIT_SUCCESS;
}
