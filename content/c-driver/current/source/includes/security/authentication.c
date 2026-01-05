// start-scram-sha-256
const char *uri = "mongodb://<percentEncodedUsername>:<percentEncodedPassword>@<hostname>:<port>/?authMechanism=SCRAM-SHA-256&authSource=<authenticationDatabase>";
mongoc_client_t *client = mongoc_client_new(uri);
// end-scram-sha-256

// start-scram-sha-1
const char *uri = "mongodb://<percentEncodedUsername>:<percentEncodedPassword>@<hostname>:<port>/?authMechanism=SCRAM-SHA-1&authSource=<authenticationDatabase>";
mongoc_client_t *client = mongoc_client_new(uri);
// end-scram-sha-1

// start-x509
mongoc_client_t *client;
mongoc_ssl_opt_t ssl_opts = {0};

ssl_opts.pem_file = "mycert.pem";

const char *uri = "mongodb://<percentEncodedUsername>@<hostname>:<port>/?authMechanism=MONGODB-X509";
mongoc_client_t *client = mongoc_client_new(uri);
mongoc_client_set_ssl_opts(client, &ssl_opts);
// end-x509

// start-aws-connection-uri
const char *uri = "mongodb://<awsIamAccessKeyId>:<awsIamSecretAccessKey>@<hostname>:<port>/?authMechanism=MONGODB-AWS";
mongoc_client_t *client = mongoc_client_new(uri);
// end-aws-connection-uri

// start-aws-connection-uri-session
const char *uri = "mongodb://<awsIamAccessKeyId>:<awsIamSecretAccessKey>@<hostname>:<port>/?authMechanism=MONGODB-AWS&authMechanismProperties=AWS_SESSION_TOKEN:<token>";
mongoc_client_t *client = mongoc_client_new(uri);
// end-aws-connection-uri-session

// start-aws-environment
const char *uri = "mongodb://<hostname>:<port>/?authMechanism=MONGODB-AWS";
mongoc_client_t *client = mongoc_client_new(uri);
// end-aws-environment

// start-scram-sha-256-uri-api
mongoc_uri_t *uri = mongoc_uri_new("mongodb://<percentEncodedUsername>:<percentEncodedPassword>@<hostname>:<port>/");

// Set the authentication mechanism and properties
mongoc_uri_set_auth_mechanism(uri, "SCRAM-SHA-256");
mongoc_uri_set_auth_source(uri, "<authenticationDatabase>");

// Create a client from the URI
mongoc_client_t *client = mongoc_client_new_from_uri(uri);
// end-scram-sha-256-uri-api

// start-scram-sha-1-uri-api
mongoc_uri_t *uri = mongoc_uri_new("mongodb://<percentEncodedUsername>:<percentEncodedPassword>@<hostname>:<port>/");

// Set the authentication mechanism and properties
mongoc_uri_set_auth_mechanism(uri, "SCRAM-SHA-1");
mongoc_uri_set_auth_source(uri, "<authenticationDatabase>");

// Create a client from the URI
mongoc_client_t *client = mongoc_client_new_from_uri(uri);
// end-scram-sha-1-uri-api

// start-x509-uri-api
mongoc_client_t *client;
mongoc_ssl_opt_t ssl_opts = {0};

ssl_opts.pem_file = "mycert.pem";

mongoc_uri_t *uri = mongoc_uri_new("mongodb://<percentEncodedUsername>:<percentEncodedPassword>@<hostname>:<port>/");

// Set the authentication mechanism
mongoc_uri_set_auth_mechanism(uri, "MONGODB-X509");

// Create a client from the URI
mongoc_client_t *client = mongoc_client_new_from_uri(uri);

mongoc_client_set_ssl_opts(client, &ssl_opts);
// end-x509-uri-api

// start-aws-connection-uri-api
mongoc_uri_t *uri = mongoc_uri_new("mongodb://<awsIamAccessKeyId>:<awsIamSecretAccessKey>@<hostname>:<port>/");

// Set the authentication mechanism
mongoc_uri_set_auth_mechanism(uri, "MONGODB-AWS");

// Create a client from the URI
mongoc_client_t *client = mongoc_client_new_from_uri(uri);
// end-aws-connection-uri-api

// start-aws-connection-uri-api-session
mongoc_uri_t *uri = mongoc_uri_new("mongodb://<awsIamAccessKeyId>:<awsIamSecretAccessKey>@<hostname>:<port>/");

// Set the authentication mechanism and properties
mongoc_uri_set_auth_mechanism(uri, "MONGODB-AWS");
bson_t mechanism_properties = BSON_INITIALIZER;
BSON_APPEND_UTF8(&mechanism_properties, "AWS_SESSION_TOKEN", "<token>");
mongoc_uri_set_mechanism_properties(uri, &mechanism_properties)

// Create a client from the URI
mongoc_client_t *client = mongoc_client_new_from_uri(uri);
// end-aws-connection-uri-api-session

// start-aws-environment-uri-api
mongoc_uri_t *uri = mongoc_uri_new("mongodb://<hostname>:<port>/");

// Set the authentication mechanism
mongoc_uri_set_auth_mechanism(uri, "MONGODB-AWS");

// Create a client from the URI
mongoc_client_t *client = mongoc_client_new_from_uri(uri);
// end-aws-environment-uri-api