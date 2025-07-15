// start-all-compression
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>
#include <mongocxx/client.hpp>

int main()
{
    mongocxx::instance instance;
    mongocxx::uri uri("mongodb://<hostname>:<port>/?compressors=snappy,zstd,zlib");
    mongocxx::client client(uri);
}
// end-all-compression

// start-zlib-compression
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>
#include <mongocxx/client.hpp>

int main()
{
    mongocxx::instance instance;
    mongocxx::uri uri("mongodb://<hostname>:<port>/?compressors=zlib&zlibCompressionLevel=1");
    mongocxx::client client(uri);
}
// end-zlib-compression