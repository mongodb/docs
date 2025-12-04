#include <bson/bson.h>
#include <mongoc/mongoc.h>
#include <stdio.h>

int
main(int argc, char *argv[]) {
    mongoc_init();

    mongoc_client_t *client = mongoc_client_new(
        "<connection URI>");
    mongoc_collection_t *collection = mongoc_client_get_collection(client, "sample_mflix", "movies");

    // start-search
    const bson_t *doc;
    bson_t *pipeline = BCON_NEW("pipeline",
        "[",
        "{", "$search", "{", "index", BCON_UTF8("<index name>"), "text", "{", "query", BCON_UTF8("Alabama"), "path", BCON_UTF8("title"), "}", "}", "}",
        "{", "$project", "{", "title", BCON_INT32(1), "}", "}",
        "]");

    mongoc_cursor_t *results =
        mongoc_collection_aggregate(collection, MONGOC_QUERY_NONE, pipeline, NULL, NULL);

    while (mongoc_cursor_next(results, &doc)) {
        char *str = bson_as_canonical_extended_json(doc, NULL);
        printf("%s\n", str);
        bson_free(str);
    }

    bson_destroy(pipeline);
    mongoc_cursor_destroy(results);
    // end-search

    mongoc_collection_destroy(collection);
    mongoc_client_destroy(client);
    mongoc_cleanup();

    return EXIT_SUCCESS;
}
