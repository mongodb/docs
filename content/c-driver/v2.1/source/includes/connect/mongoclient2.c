#include <mongoc/mongoc.h>
#include <bson/bson.h>

int main(void) {

  //start-connect-to-atlas
  // Intialize the MongoDB C Driver
  mongoc_init();

  // Create a new client and connect to the server
  mongoc_client_t *client = mongoc_client_new ("mongodb+srv://<db_username>:<db_password>@<hostname:port>/?<options>");

  // Set the version of the Stable API on the client
  mongoc_server_api_t *api = mongoc_server_api_new(MONGOC_SERVER_API_V1);

  bson_t *ping = BCON_NEW ("ping", BCON_INT32 (1));
  bson_t reply = BSON_INITIALIZER;
  bson_error_t error;

  if (!mongoc_client_set_server_api (client, api, &error)) {
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

    // Cleanup the C Driver
    mongoc_cleanup ();
  //end-connect-to-atlas
}
