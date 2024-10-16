
#include <mongoc/mongoc.h>
#include <bson/bson.h>

int main(void)
{

  mongoc_init();

  {
    // start-client-write-concern
    // Create a new client instance
    mongoc_client_t *client = mongoc_client_new ("<connection string>");

    // Create a new write concern
    mongoc_write_concern_t *write_concern = mongoc_write_concern_new ();
    mongoc_write_concern_set_w (write_concern, MONGOC_WRITE_CONCERN_W_MAJORITY);

    // Set the write concern on the client
    mongoc_client_set_write_concern (client, write_concern);
    // end-client-write-concern
    mongoc_write_concern_destroy (write_concern);
    mongoc_client_destroy (client);
  }

  {
    mongoc_client_t *client = mongoc_client_new ("<connection string>");

    // start-collection-write-concern
    mongoc_collection_t *collection = mongoc_client_get_collection (client, "<database name>", "<collection name>");

    // Create a new write concern
    mongoc_write_concern_t *write_concern = mongoc_write_concern_new ();
    mongoc_write_concern_set_w (write_concern, MONGOC_WRITE_CONCERN_W_MAJORITY);

    // Set the write concern on the collection
    mongoc_collection_set_write_concern (collection, write_concern);
    // end-collection-write-concern

    mongoc_write_concern_destroy (write_concern);
    mongoc_collection_destroy (collection);
    mongoc_client_destroy (client);
  }

  {
    // start-client-read-concern
    mongoc_client_t *client = mongoc_client_new ("<connection string>");

    // Create a new read concern
    mongoc_read_concern_t *read_concern = mongoc_read_concern_new ();

    // Set the read concern level
    mongoc_read_concern_set_level (read_concern, MONGOC_READ_CONCERN_LEVEL_MAJORITY);

    // Set the read concern on the client
    mongoc_client_set_read_concern (client, read_concern);
    // end-client-read-concern

    mongoc_read_concern_destroy (read_concern);
    mongoc_client_destroy (client);
  }

  {
    mongoc_client_t *client = mongoc_client_new ("<connection string>");

    // start-collection-read-concern

    mongoc_collection_t *collection = mongoc_client_get_collection (client, "<database name>", "<collection name>");

    // Create a new read concern
    mongoc_read_concern_t *read_concern = mongoc_read_concern_new ();

    // Set the read concern level
    mongoc_read_concern_set_level (read_concern, MONGOC_READ_CONCERN_LEVEL_MAJORITY);

    // Set the read concern on the collection
    mongoc_collection_set_read_concern (collection, read_concern);
    // end-collection-read-concern

    mongoc_read_concern_destroy (read_concern);
    mongoc_collection_destroy (collection);
    mongoc_client_destroy (client);
  }

  {
    // start-client-read-preference
    mongoc_client_t *client = mongoc_client_new ("<connection string>");

    // Create a new read preference
    mongoc_read_prefs_t *read_prefs = mongoc_read_prefs_new (MONGOC_READ_SECONDARY);

    // Set the read preference on the client
    mongoc_client_set_read_prefs (client, read_prefs);
    // end-client-read-preference

    mongoc_read_prefs_destroy (read_prefs);
    mongoc_client_destroy (client);
  }

  {
    mongoc_client_t *client = mongoc_client_new ("<connection string>");

    // start-collection-read-preference
    mongoc_collection_t *collection = mongoc_client_get_collection (client, "<database name>", "<collection name>");

    // Create a new read preference
    mongoc_read_prefs_t *read_prefs = mongoc_read_prefs_new (MONGOC_READ_SECONDARY);

    // Set the read preference on the collection
    mongoc_collection_set_read_prefs (collection, read_prefs);
    // end-collection-read-preference

    mongoc_read_prefs_destroy (read_prefs);
    mongoc_client_destroy (client);
  }
}