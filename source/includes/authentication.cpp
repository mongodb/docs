// start-scram-sha-256
auto uri = mongocxx::uri("mongodb://<db_username>:<db_password>@<hostname>:<port>/?"
                         "authSource=admin&authMechanism=SCRAM-SHA-256");
auto client = mongocxx::client(uri);
// end-scram-sha-256

// start-scram-sha-1
auto uri = mongocxx::uri("mongodb://<db_username>:<db_password>@<hostname>:<port>/?"
                         "authSource=admin&authMechanism=SCRAM-SHA-1");
auto client = mongocxx::client(uri);
// end-scram-sha-1

// start-x509
auto uri = mongocxx::uri("mongodb://<hostname>:<port>/?"
                         "tls=true&tlsCertificateKeyFile=path/to/client.pem&authMechanism=MONGODB-X509");
auto client = mongocxx::client(uri);
// end-x509

// start-aws-connection-uri
auto uri = mongocxx::uri("mongodb://<AWS IAM access key ID>:<AWS IAM secret access key>@<hostname>:<port>/?"
                         "authMechanism=MONGODB-AWS");
auto client = mongocxx::client(uri);
// end-aws-connection-uri

// start-aws-connection-uri-session
auto uri = mongocxx::uri("mongodb://<AWS IAM access key ID>:<AWS IAM secret access key>@<hostname>:<port>/?"
                         "authMechanism=MONGODB-AWSS&authMechanismProperties=AWS_SESSION_TOKEN:<token>");
auto client = mongocxx::client(uri);
// end-aws-connection-uri-session

// start-aws-environment
auto uri = mongocxx::uri("mongodb://<hostname>:<port>/?"
                         "authMechanism=MONGODB-AWS");
auto client = mongocxx::client(uri);
// end-aws-environment

// start-kerberos
auto uri = mongocxx::uri("mongodb://<Kerberos principal>@<hostname>:<port>/?"
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