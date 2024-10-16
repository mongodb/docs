#include <mongoc/mongoc.h>
#include <bson/bson.h>

int main(void) {

  mongoc_init ();

  {
    // start-connect-stable-api
    bson_t *ping = BCON_NEW ("ping", BCON_INT32 (1));
    bson_t reply = BSON_INITIALIZER;
    bson_error_t error;
    mongoc_client_t *client = NULL;

    // Create a new client 
    client = mongoc_client_new ("mongodb+srv://<db_username>:<db_password>@<hostname:port>/?<options>");

    // Set the version of the Stable API on the client
    mongoc_server_api_t *api = mongoc_server_api_new(MONGOC_SERVER_API_V1);
    
    if (!mongoc_client_set_server_api(client, api, &error)) {
      fprintf(stderr, "error: %s\n", error.message);
      goto cleanup;
    }

    // Send a ping to confirm a successful connection
    if (!mongoc_client_command_simple (client, "admin", ping, NULL, &reply, &error)) {
      fprintf(stderr, "error: %s\n", error.message);
      goto cleanup;
    }

    printf ("Pinged your deployment. You successfully connected to MongoDB!\n");
    
    cleanup:
      bson_destroy (&reply);
      bson_destroy (ping);

      mongoc_server_api_destroy (api);
      mongoc_client_destroy (client);
    // end-connect-stable-api
  }

  {
    // start-connect-local
    bson_t *ping = BCON_NEW ("ping", BCON_INT32 (1));
    bson_t reply = BSON_INITIALIZER;
    bson_error_t error;
    mongoc_client_t *client = NULL;

    // Create a new client 
    mongoc_uri_t *uri = mongoc_uri_new_with_error ("mongodb://localhost:27017", &error);  
    if (!uri) {
      fprintf (stderr, "failed to parse URI, error: %s\n", error.message);
      goto cleanup;
    }

    client = mongoc_client_new_from_uri (uri);
    if (!client) {
      goto cleanup;
    }

    // Send a ping to confirm a successful connection
    if (!mongoc_client_command_simple (client, "admin", ping, NULL, &reply, &error)) {
      fprintf(stderr, "error: %s\n", error.message);
      goto cleanup;
    }
    printf ("Pinged your deployment. You successfully connected to MongoDB!\n");
    
    cleanup:
      bson_destroy (&reply);
      bson_destroy (ping);
      mongoc_client_destroy (client);
      mongoc_uri_destroy (uri);
    // end-connect-local
  }

  {
    // start-connect-replica
    bson_t *ping = BCON_NEW ("ping", BCON_INT32 (1));
    bson_t reply = BSON_INITIALIZER;
    bson_error_t error;
    mongoc_client_t *client = NULL;

    // Create a new client 
    client = mongoc_client_new ("mongodb://host01:27017,host02:27017,host03:27017/?replicaSet=myreplset");
    if (!client) {
      goto cleanup;
    }

    // Send a ping to confirm a successful connection
    if (!mongoc_client_command_simple (client, "admin", ping, NULL, &reply, &error)) {
      fprintf(stderr, "error: %s\n", error.message);
      goto cleanup;
    }

    printf ("Pinged your deployment. You successfully connected to MongoDB!\n");
    
    cleanup:
      bson_destroy (&reply);
      bson_destroy (ping);
      mongoc_client_destroy (client);
    // end-connect-replica
  }

  // Cleanup the C Driver
  mongoc_cleanup ();
}
