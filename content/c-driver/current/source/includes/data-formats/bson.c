#include <bson/bson.h>
#include <mongoc/mongoc.h>
#include <stdio.h>

int
main(int argc, char *argv[]) {
    {
        // start-create-bson
        bson_t *doc = BCON_NEW( "address", "{",
            "street", BCON_UTF8("Pizza St"),
            "zipcode", BCON_UTF8("10003"), "}",
            "coord", "[", BCON_DOUBLE(-73.982419), BCON_DOUBLE(41.579505), "]",
            "cuisine", BCON_UTF8("Pizza"),
            "name", BCON_UTF8("Mongo's Pizza")
        );
        // end-create-bson

        // start-append-bson
        BCON_APPEND(doc, "yearEstablished", BCON_INT32(1996));
        // end-append-bson

        // start-append-bson-alt
        bson_append_int32(doc, "yearEstablished", -1, 1996);
        // end-append-bson-alt

        bson_destroy(doc);
    }

    {
        bson_t *doc = BCON_NEW( "address", "{",
            "street", BCON_UTF8("Pizza St"),
            "zipcode", BCON_UTF8("10003"), "}",
            "coord", "[", BCON_DOUBLE(-73.982419), BCON_DOUBLE(41.579505), "]",
            "cuisine", BCON_UTF8("Pizza"),
            "name", BCON_UTF8("Mongo's Pizza")
        );

        // start-write-bson
        FILE *fp;

        if ((fp = fopen("output.bson", "wb"))) {
            fwrite(bson_get_data(doc), 1, doc->len, fp);
            fclose(fp);
        } else {
            fprintf(stderr, "Failed to open file for writing.\n");
            return EXIT_FAILURE;
        }
        // end-write-bson
        bson_destroy(doc);
    }


    {
        // start-read-bson
        bson_reader_t *reader;
        bson_error_t error;
        const bson_t *b;
        char *str;

        if (!((reader = bson_reader_new_from_file("example.json", &error)))) {
            fprintf(stderr, "Failed to open file: %s\n", error.message);
            return EXIT_FAILURE;
        }

        while ((b = bson_reader_read(reader, NULL))) {
            str = bson_as_canonical_extended_json(b, NULL);
            fprintf(stdout, "%s\n", str);
            bson_free(str);
        }

        bson_reader_destroy(reader);
        // end-read-bson
    }

    {
        // start-read-json
        bson_json_reader_t *reader;
        int b;
        bson_error_t error;
        bson_t doc = BSON_INITIALIZER;

        if (!((reader = bson_json_reader_new_from_file("example.json", &error)))) {
            fprintf(stderr, "Failed to open file: %s\n", error.message);
            return EXIT_FAILURE;
        }

        while ((b = bson_json_reader_read(reader, &doc, &error))) {
            if (b < 0) {
                fprintf(stderr, "Failed to parse JSON: %s\n", error.message);
                abort();
            }

            if (fwrite(bson_get_data(&doc), 1, doc.len, stdout) != doc.len) {
                fprintf(stderr, "Failed to write BSON to stdout, exiting.\n");
                exit(1);
            }
            bson_reinit(&doc);
        }

        bson_json_reader_destroy(reader);
        bson_destroy(&doc);
        // end-read-json
    }

    mongoc_cleanup();

    return EXIT_SUCCESS;
}