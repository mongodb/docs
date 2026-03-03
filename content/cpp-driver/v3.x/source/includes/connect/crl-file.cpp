mongocxx::options::client client_options;
mongocxx::options::tls tls_options;

tls_options.crl_file("/path/to/file.pem");
client_options.tls_opts(tls_options);

mongocxx::uri uri("mongodb://<hostname>:<port>/?tls=true");
mongocxx::client client(uri, client_options);