// start-scram-sha-256
auto uri = mongocxx::uri("mongodb://<db_username>:<db_password>@<hostname>:<port>/?"
                         "authSource=admin&authMechanism=SCRAM-SHA-256");
auto client = mongocxx::client(uri);
// end-scram-sha-256

// start-scram-sha-256-tls
mongocxx::options::client client_options;
mongocxx::options::tls tls_options;
tls_options.pem_file("path/to/ca-or-client.pem");
client_options.tls_opts(tls_options);

auto uri = mongocxx::uri(
    "mongodb://<db_username>:<db_password>@<hostname>:<port>/?"
    "authSource=admin&authMechanism=SCRAM-SHA-256&tls=true");
auto client = mongocxx::client(uri, client_options);
// end-scram-sha-256-tls

// start-scram-sha-1
auto uri = mongocxx::uri("mongodb://<db_username>:<db_password>@<hostname>:<port>/?"
                         "authSource=admin&authMechanism=SCRAM-SHA-1");
auto client = mongocxx::client(uri);
// end-scram-sha-1

// start-scram-sha-1-tls
mongocxx::options::client client_options;
mongocxx::options::tls tls_options;
tls_options.pem_file("path/to/ca-or-client.pem");
client_options.tls_opts(tls_options);

auto uri = mongocxx::uri(
    "mongodb://<db_username>:<db_password>@<hostname>:<port>/?"
    "authSource=admin&authMechanism=SCRAM-SHA-1&tls=true");
auto client = mongocxx::client(uri, client_options);
// end-scram-sha-1-tls

// start-x509
auto uri = mongocxx::uri("mongodb://<hostname>:<port>/?"
                         "tls=true&tlsCertificateKeyFile=path/to/client.pem&authMechanism=MONGODB-X509");
auto client = mongocxx::client(uri);
// end-x509

// start-aws-connection-uri
auto uri = mongocxx::uri("mongodb://<aws_access_key_id>:<aws_secret_access_key>@<hostname>:<port>/?"
                         "authMechanism=MONGODB-AWS");
auto client = mongocxx::client(uri);
// end-aws-connection-uri

// start-aws-connection-tls
mongocxx::options::client client_options;
mongocxx::options::tls tls_options;

tls_options.ca_file("/path/to/ca.pem");
client_options.tls_opts(tls_options);

auto uri = mongocxx::uri("mongodb://<aws_access_key_id>:<aws_secret_access_key>@<hostname>:<port>/?"
                         "authMechanism=MONGODB-AWS&tls=true");
auto client = mongocxx::client(uri, client_options);
// end-aws-connection-tls


// start-aws-connection-uri-session
auto uri = mongocxx::uri("mongodb://<aws_access_key_id>:<aws_secret_access_key>@<hostname>:<port>/?"
                         "authMechanism=MONGODB-AWS&authMechanismProperties=AWS_SESSION_TOKEN:<aws_session_token>");
auto client = mongocxx::client(uri);
// end-aws-connection-uri-session

// start-aws-connection-tls-session
mongocxx::options::client client_options;
mongocxx::options::tls tls_options;

tls_options.ca_file("/path/to/ca.pem");
client_options.tls_opts(tls_options);

auto uri = mongocxx::uri("mongodb://<aws_access_key_id>:<aws_secret_access_key>@<hostname>:<port>/?"
                         "authMechanism=MONGODB-AWS"
                         "&authMechanismProperties=AWS_SESSION_TOKEN:<aws_session_token>&tls=true");
auto client = mongocxx::client(uri, client_options);
// end-aws-connection-tls-session

// start-aws-environment
auto uri = mongocxx::uri("mongodb://<hostname>:<port>/?"
                         "authMechanism=MONGODB-AWS");
auto client = mongocxx::client(uri);
// end-aws-environment

// start-aws-tls-environment
mongocxx::options::client client_options;
mongocxx::options::tls tls_options;

tls_options.ca_file("/path/to/ca.pem");
client_options.tls_opts(tls_options);

auto uri = mongocxx::uri("mongodb://<hostname>:<port>/?"
                         "authMechanism=MONGODB-AWS&tls=true");
auto client = mongocxx::client(uri, client_options);
// end-aws-tls-environment

// start-kerberos
auto uri = mongocxx::uri("mongodb://<kerberos_principal>@<hostname>:<port>/?"
                         "authMechanism=GSSAPI"
                         "&authMechanismProperties=SERVICE_NAME:<authentication service name>");
auto client = mongocxx::client(uri);
// end-kerberos

// start-plain
auto uri = mongocxx::uri("mongodb://<db_username>:<db_password>@<hostname>:<port>/?"
                         "authMechanism=PLAIN&tls=true");
auto client = mongocxx::client(uri);
// end-plain

// start-auth-err
try {
    auto uri = mongocxx::uri("<connection string>");
    auto client = mongocxx::client(uri);

    client["db"].run_command(<any command requiring authorization>);

} catch (const mongocxx::exception& ex) {
    std::cerr << "Error: " << ex.what() << std::endl;
}
// end-auth-err