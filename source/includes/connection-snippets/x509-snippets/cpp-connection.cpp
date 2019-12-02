// begin x509 connection
#include <iostream>
#include <mongocxx/client.hpp>
#include <mongocxx/uri.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/options/client.hpp>

int main(int, char**) {
  mongocxx::instance inst{};

  mongocxx::options::ssl ssl_opts{};
  ssl_opts.pem_file("/etc/certs/mongodb/client.pem");

  mongocxx::options::client client_opts{};
  client_opts.ssl_opts(ssl_opts);

  mongocxx::uri uri("mongodb+srv://<cluster-url>/test?authSource=$external&retryWrites=true&w=majority&authMechanism=MONGODB-X509&tls=true");

  auto client = mongocxx::client{uri, client_opts};
  mongocxx::database db = client["testDB"];
  mongocxx::collection collection = db["testCol"];
  
  std::cout << collection.count_documents({});
}
// end x509 connection