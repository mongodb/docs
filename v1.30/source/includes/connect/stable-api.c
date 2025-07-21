// start-stable-api
#include <mongoc/mongoc.h>

int main ()
{
    bson_error_t error;

    mongoc_init ();

    mongoc_server_api_t *stable_api = mongoc_server_api_new (MONGOC_SERVER_API_V1);

    mongoc_client_t *client = mongoc_client_new ("<connection string>");
    if (!mongoc_client_set_server_api (client, stable_api, &error))
    {
        fprintf (stderr, "Failed to set Stable API: %s\n", error.message);
        return EXIT_FAILURE;
    }

    // Use the client for operations...

    mongoc_server_api_destroy (stable_api);
    mongoc_cleanup ();

    return EXIT_SUCCESS;
}
// end-stable-api

// start-stable-api-options
mongoc_server_api_t *stable_api = mongoc_server_api_new (MONGOC_SERVER_API_V1);
mongoc_server_api_strict (stable_api, true);
mongoc_server_api_deprecation_errors (stable_api, true);

mongoc_client_t *client = mongoc_client_new ("<connection string>");
if (!mongoc_client_set_server_api (client, stable_api, &error)) {
    fprintf (stderr, "Failed to set Stable API: %s\n", error.message);
    return EXIT_FAILURE;
}
// end-stable-api-options