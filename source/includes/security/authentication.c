// start-scram-sha-256
const char *uri = "mongodb://<percent-encoded username>:<percent-encoded password>@<hostname>:<port>/?authMechanism=SCRAM-SHA-256&authSource=<authentication database>";
mongoc_client_t *client = mongoc_client_new(uri);
// end-scram-sha-256

// start-scram-sha-1
const char *uri = "mongodb://<percent-encoded username>:<percent-encoded password>@<hostname>:<port>/?authMechanism=SCRAM-SHA-1&authSource=<authentication database>";
mongoc_client_t *client = mongoc_client_new(uri);
// end-scram-sha-1

// start-x509
mongoc_client_t *client;
mongoc_ssl_opt_t ssl_opts = {0};

ssl_opts.pem_file = "mycert.pem";

const char *uri = "mongodb://<percent-encoded username>@<hostname>:<port>/?authMechanism=MONGODB-X509";
mongoc_client_t *client = mongoc_client_new(uri);
mongoc_client_set_ssl_opts(client, &ssl_opts);
// end-x509

// start-aws-connection-uri
const char *uri = "mongodb://<AWS IAM access key ID>:<AWS IAM secret access key>@<hostname>:<port>/?authMechanism=MONGODB-AWS");
mongoc_client_t *client = mongoc_client_new(uri);
// end-aws-connection-uri

// start-aws-connection-uri-session
const char *uri = "mongodb://<AWS IAM access key ID>:<AWS IAM secret access key>@<hostname>:<port>/?authMechanism=MONGODB-AWS&authMechanismProperties=AWS_SESSION_TOKEN:<token>");
mongoc_client_t *client = mongoc_client_new(uri);
// end-aws-connection-uri-session

// start-aws-environment
const char *uri = "mongodb://<hostname>:<port>/?authMechanism=MONGODB-AWS");
mongoc_client_t *client = mongoc_client_new(uri);
// end-aws-environment