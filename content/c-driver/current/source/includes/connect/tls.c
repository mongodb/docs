#include <mongoc/mongoc.h>
#include <bson/bson.h>

int main (void) {

  mongoc_init ();

  {
    // Set TLS using connection string
    // start-connect-str
    mongoc_client_t *client = mongoc_client_new ("mongodb+srv://<db_username>:<db_password>@<hostname>/?tls=true");

    // Do database work here 

    mongoc_client_destroy (client);
    // end-connect-str
  }

  {
    // Set TLS using connection uri options
    // start-connect-uri-opt
    mongoc_uri_t *uri = mongoc_uri_new ("mongodb://localhost:27017");  
    mongoc_uri_set_option_as_bool (uri, MONGOC_URI_TLS, true);

    mongoc_client_t *client = mongoc_client_new_from_uri (uri);

    // Do database work here
    
    mongoc_client_destroy (client);
    mongoc_uri_destroy (uri);
    // end-connect-uri-opt
  }

  {
    // Set TLS and provide CA file using connection string
    // start-connect-ca-file-str
    mongoc_client_t *client = mongoc_client_new ("mongodb+srv://<db_username>:<db_password>@<hostname>/?tls=true&tlscertificatekeyfile=/path/to/certs/client-certificate.pem");

    // Do database work here 

    mongoc_client_destroy (client);
    // end-connect-ca-file-str
  }

  {
    // Set TLS and provide CA file using uri options
    // start-connect-ca-file-uri  
    mongoc_uri_t *uri = mongoc_uri_new ("mongodb://localhost:27017");  
    mongoc_uri_set_option_as_bool (uri, MONGOC_URI_TLS, true);
    mongoc_uri_set_option_as_utf8 (uri, MONGOC_URI_TLSCERTIFICATEKEYFILE, "/path/to/client-certificate.pem");  

    mongoc_client_t *client = mongoc_client_new_from_uri (uri);
    
    // Do database work here
    
    mongoc_client_destroy (client);
    mongoc_uri_destroy (uri);
    // end-connect-ca-file-uri
  }

  mongoc_cleanup ();
}
