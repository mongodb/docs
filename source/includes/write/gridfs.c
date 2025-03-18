#include <stdio.h>
#include <bson/bson.h>
#include <mongoc/mongoc.h>

int
main (void)
{
    mongoc_client_t *client;
    mongoc_init ();

    client = mongoc_client_new ("<connection string URI>");
    
    {
        // Creates a GridFS bucket
        // start-create-bucket
        mongoc_database_t *db = mongoc_client_get_database (client, "db");

        bson_error_t error;
        mongoc_gridfs_bucket_t *bucket = mongoc_gridfs_bucket_new (db, NULL, NULL, &error);
        if (!bucket) {
            fprintf (stderr, "Failed to create bucket: %s\n", error.message);
        }
        // end-create-bucket
    }

    {
        // Creates a GridFS bucket and specifies a custom name
        // start-create-custom-bucket
        mongoc_database_t *db = mongoc_client_get_database (client, "db");
        bson_t opts = BSON_INITIALIZER;
        BSON_APPEND_UTF8 (&opts, "bucketName", "myCustomBucket");

        bson_error_t error;
        if (!mongoc_gridfs_bucket_new (db, &opts, NULL, &error)) {
            fprintf (stderr, "Failed to create bucket: %s\n", error.message);
        }
        // end-create-custom-bucket
    }

    {
        // Opens an upload stream for a given file name
        // start-open-upload-stream
        bson_error_t error;
        mongoc_stream_t *upload_stream = mongoc_gridfs_bucket_open_upload_stream (bucket, "my_file", NULL, NULL, &error);
        if (upload_stream == NULL) {
                fprintf (stderr, "Failed to create upload stream: %s\n", error.message);
        } else {
                const char *data = "Data to store";
                mongoc_stream_write (upload_stream, data, strlen(data), -1);
        }

        mongoc_stream_close (upload_stream);
        mongoc_stream_destroy (upload_stream);
        // end-open-upload-stream
    }

    {
        // Uploads the contents of a stream to a GridFS file
        // start-upload-from-stream
        mongoc_stream_t *file_stream = mongoc_stream_file_new_for_path ("/path/to/input_file", O_RDONLY, 0);
        
        bson_error_t error;
        if (!mongoc_gridfs_bucket_upload_from_stream (bucket, "new_file", file_stream, NULL, NULL, &error)) {
            fprintf (stderr, "Failed to upload file: %s\n", error.message);
        }

        mongoc_stream_close (file_stream);
        mongoc_stream_destroy (file_stream);
        // end-upload-from-stream
    }

    {
        // Retrieves information about GridFS files
        // start-retrieve-file-info
        mongoc_cursor_t *cursor = mongoc_gridfs_bucket_find(bucket, bson_new(), NULL);
        const bson_t *file_doc;

        while (mongoc_cursor_next(cursor, &file_doc)) {
            char *json = bson_as_relaxed_extended_json(file_doc, NULL);
            printf("%s\n", json);
            bson_free(json);
        }
        
        mongoc_cursor_destroy (cursor);
        // end-retrieve-file-info
    }

    {
        // Creates a download stream for a given file ID
        // start-open-download-stream
        char buf[512];
        bson_value_t file_id;
        file_id.value_type = BSON_TYPE_OID;
        bson_oid_init_from_string (&file_id.value.v_oid, "66fb1b8ea0f84a74ee099e71");

        bson_error_t error;
        mongoc_stream_t *download_stream = mongoc_gridfs_bucket_open_download_stream (bucket, &file_id, &error);
        if (!download_stream) {
            fprintf (stderr, "Failed to create download stream: %s\n", error.message);
        }
        mongoc_stream_read (download_stream, buf, 1, 1, 0);
        
        mongoc_stream_close (download_stream);
        mongoc_stream_destroy (download_stream);
        // end-open-download-stream
    }

    {
        // Downloads a GridFS file to a local file
        // start-download-to-stream
        mongoc_stream_t *file_stream = mongoc_stream_file_new_for_path ("/path/to/output_file", O_RDWR, 0);
        bson_error_t error;
        if (!file_stream) {
            fprintf (stderr, "Error opening file stream: %s\n", error.message);
        }

        bson_value_t file_id;
        file_id.value_type = BSON_TYPE_OID;
        bson_oid_init_from_string (&file_id.value.v_oid, "66fb1b8ea0f84a74ee099e71");

        if (!mongoc_gridfs_bucket_download_to_stream (bucket, &file_id, file_stream, &error)) {
            fprintf (stderr, "Failed to download file: %s\n", error.message);
        }
        
        mongoc_stream_close (file_stream);
        mongoc_stream_destroy (file_stream);
        // end-download-to-stream
    }

    {
        // Deletes a GridFS file
        // start-delete-files
        bson_error_t error;
        bson_oid_t oid;
        bson_oid_init_from_string (&oid, "66fb1b365fd1cc348b031b01");

        if (!mongoc_gridfs_bucket_delete_by_id (bucket, &oid, &error)) {
            fprintf (stderr, "Failed to delete file: %s\n", error.message);
        }
        // end-delete-files
    }

    mongoc_client_destroy (client);
    mongoc_cleanup ();

    return EXIT_SUCCESS;
}