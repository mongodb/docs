#include <mongocxx/client.hpp>
#include <mongocxx/instance.hpp>
#include <mongocxx/uri.hpp>

int main()
{
    mongocxx::instance instance;

    {
        // Connects to a local MongoDB deployment
        // start-local
        mongocxx::uri uri("mongodb://localhost:27017/");
        mongocxx::client client(uri);
        // end-local
    }

    {
        // Connects to a MongoDB Atlas deployment
        // start-atlas
        mongocxx::uri uri("<Atlas connection string>");
        mongocxx::client client(uri);
        // end-atlas
    }

    {
        // Connects to a replica set
        // start-replica-set
        mongocxx::uri uri("mongodb://<replica set member>:<port>/?replicaSet=<replica set name>");
        mongocxx::client client(uri);
        // end-replica-set
    }

    {
        // Connects to a MongoDB deployment and enables TLS
        // start-enable-tls
        mongocxx::uri uri("mongodb://<hostname>:<port>/?tls=true");
        mongocxx::client client(uri);
        // end-enable-tls
    }

    {
        // Connects to a MongoDB deployment, enables TLS, and prevents OCSP endpoint checks
        // start-disable-ocsp
        mongocxx::uri uri("mongodb://<hostname>:<port>/?tls=true&tlsDisableOCSPEndpointCheck=true");
        mongocxx::client client(uri);
        // end-disable-ocsp
    }

    {
        // Connects to a TLS-enabled deployment and instructs the driver to check the
        // server certificate against a CRL
        // start-crl
        mongocxx::options::client client_options;
        mongocxx::options::tls tls_options;

        tls_options.crl_file("<path to your CRL file>");
        client_options.tls_opts(tls_options);

        mongocxx::uri uri("mongodb://<hostname>:<port>/?tls=true");
        mongocxx::client client(uri, client_options);
        // end-crl
    }

    {
        // Connects to a TLS-enabled deployment and disables server certificate verification
        // start-insecure-tls
        mongocxx::uri uri("mongodb://<hostname>:<port>/?tls=true&tlsInsecure=true");
        mongocxx::client client(uri);
        // end-insecure-tls
    }

    {
        // Connects to a TLS-enabled deployment and disables hostname verification
        // start-disable-hostname
        mongocxx::uri uri("mongodb://<hostname>:<port>/?tls=true&tlsAllowInvalidHostnames=true");
        mongocxx::client client(uri);
        // end-disable-hostname
    }

    {
        // Enables compression for a MongoDB connection and specifies each compression algorithm
        // start-compression-all
        mongocxx::uri uri("mongodb://<hostname>:<port>/?compressors=snappy,zstd,zlib");
        mongocxx::client client(uri);
        // end-compression-all
    }

    {
        // Enables zlib compression for a MongoDB connection
        // start-compression-zlib
        mongocxx::uri uri("mongodb://<hostname>:<port>/?compressors=zlib&zlibCompressionLevel=1");
        mongocxx::client client(uri);
        // end-compression-zlib
    }

    {
        // Connects to a MongoDB deployment and enables the stable API
        // start-stable-api
        mongocxx::uri uri("<connection string>");
        
        mongocxx::options::client client_options;
        mongocxx::options::server_api server_api_options(mongocxx::options::server_api::version::k_version_1);
        client_options.server_api_opts(server_api_options);
        mongocxx::client client(uri, client_options);
        // end-stable-api
    }
}