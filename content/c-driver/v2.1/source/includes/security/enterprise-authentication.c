// start-kerberos
const char *uri = "mongodb://mongodbuser%40EXAMPLE.COM@<hostname>:<port>/?authMechanism=GSSAPI&authMechanismProperties=SERVICE_NAME:<authentication service name>");
mongoc_client_t *client = mongoc_client_new(uri);
// end-kerberos

// start-plain
const char *uri = "mongodb://<username>:<password>@<hostname>:<port>/?authMechanism=PLAIN");
mongoc_client_t *client = mongoc_client_new(uri);
// end-plain%