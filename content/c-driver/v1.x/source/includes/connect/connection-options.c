#include <mongoc/mongoc.h>
#include <bson/bson.h>
#include <stdio.h>

// Connection URI Example
void connection_uri_example(void) {
    // start-connection-uri
    mongoc_init();

    // Specifies the connection options in the connection string
    const char *uri = "mongodb+srv://localhost:27017/?connectTimeoutMS=60000&tls=true";

    // Creates a new client
    mongoc_client_t *client = mongoc_client_new_from_uri_with_error(uri, &error);

    if (!client) {
        fprintf(stderr, "%s\n", error.message);
        goto cleanup;
    }

    // Use client...
    
    cleanup:
        mongoc_client_destroy(client);
        mongoc_uri_destroy(uri);
    // end-connection-uri
}

// URI Options
void mongo_client_uri_example(void) {
    // start-mongoc-uri
    mongoc_uri_t *uri = mongoc_uri_new_with_error("mongodb+srv://localhost:27017/", &error);

    if (!uri) {
        fprintf(stderr, "%s\n", error.message);
        goto cleanup;
    }

    // Specifies the connection options by using the URI options API
    if (!mongoc_uri_set_option_as_int32(uri, MONGOC_URI_CONNECTTIMEOUTMS, 60000)) {
        fprintf(stderr, "Failed to set '%s'\n", MONGOC_URI_CONNECTTIMEOUTMS);
        goto cleanup;
    }

    if (!mongoc_uri_set_option_as_bool(uri, MONGOC_URI_TLS, true)) {
        fprintf(stderr, "Failed to set '%s'\n", MONGOC_URI_TLS);
        goto cleanup;
    }

    // Creates a new client
    client = mongoc_client_new_from_uri_with_error(uri, &error);

    if (!client) { 
        fprintf(stderr, "%s\n", error.message);
        goto cleanup;
     }
    
    // Use client...
    
    cleanup:
        mongoc_client_destroy(client);
        mongoc_uri_destroy(uri);
    // end-mongoc-uri
}

// Replica Set Name
void replica_set_name_example(void) {
    // start-uri-replica-set-name
    mongoc_uri_t *uri = mongoc_uri_new("mongodb+srv://localhost:27017/?replicaSet=yourReplicaSet");
    // end-uri-replica-set-name

    mongoc_client_t *client = mongoc_client_new_from_uri(uri);
    
    // start-mongoc-replica-set
    mongoc_uri_set_option_as_utf8(uri, MONGOC_URI_REPLICASET, "yourReplicaSet");
    // end-mongoc-replica-set

    mongoc_client_destroy(client);
    mongoc_uri_destroy(uri);
}

// Direct Connection
void direct_connection_example(void) {
    // start-uri-direct-connection
    mongoc_uri_t *uri = mongoc_uri_new("mongodb://localhost:27017/?directConnection=true");
    // end-uri-direct-connection

    mongoc_client_t *client = mongoc_client_new_from_uri(uri);

    // start-mongoc-direct-connection
    mongoc_uri_set_option_as_bool(uri, MONGOC_URI_DIRECTCONNECTION, true);
    // end-mongoc-direct-connection
    
    mongoc_client_destroy(client);
    mongoc_uri_destroy(uri);
}

// TLS Disable Certificate Revocation Check
void disable_tls_certificate_revocation_check_example(void) {
    // start-uri-disable-tls-cert
    mongoc_uri_t *uri = mongoc_uri_new("mongodb+srv://localhost:27017/?tls=true&tlsDisableCertificateRevocationCheck=true");
    // end-uri-disable-tls-cert

    mongoc_client_t *client = mongoc_client_new_from_uri(uri);

    // start-mongoc-disable-tls-cert
    mongoc_uri_set_option_as_bool(uri, MONGOC_URI_TLSDISABLECERTIFICATEREVOCATIONCHECK, true);
    // end-mongoc-disable-tls-cert
    
    mongoc_client_destroy(client);
    mongoc_uri_destroy(uri);
}

// Allow Insecure TLS
void allow_insecure_tls_example(void) {
    // start-uri-allow-insecure-tls
    mongoc_uri_t *uri = mongoc_uri_new("mongodb+srv://localhost:27017/?tls=true&tlsAllowInvalidCertificates=true");
    // end-uri-allow-insecure-tls

    mongoc_client_t *client = mongoc_client_new_from_uri(uri);

    // start-mongoc-allow-insecure-tls
    mongoc_uri_set_option_as_bool(uri, MONGOC_URI_TLSINSECURE, true);
    // end-mongoc-allow-insecure-tls
    
    mongoc_client_destroy(client);
    mongoc_uri_destroy(uri);
}

// Use TLS
void use_tls_example(void) {
    // start-uri-use-tls
    mongoc_uri_t *uri = mongoc_uri_new("mongodb+srv://localhost:27017/?tls=true");
    // end-uri-use-tls

    mongoc_client_t *client = mongoc_client_new_from_uri(uri);

    // start-mongoc-use-tls
    mongoc_uri_set_option_as_bool(uri, MONGOC_URI_TLS, true);
    // end-mongoc-use-tls
    
    mongoc_client_destroy(client);
    mongoc_uri_destroy(uri);
}

// TLS/SSL Options
void ssl_options_example(void) {
    // start-ssl-options
    mongoc_client_t *client;
    mongoc_ssl_opt_t ssl_opts = {0};
    
    ssl_opts.pem_file = "/path/to/client-cert.pem";
    ssl_opts.pem_pwd = "password";
    ssl_opts.ca_file = "/path/to/ca.pem";
    ssl_opts.allow_invalid_hostname = false;
    
    mongoc_uri_t *uri = mongoc_uri_new("mongodb+srv://localhost:27017/?tls=true");
    client = mongoc_client_new_from_uri(uri);
    mongoc_client_set_ssl_opts(client, &ssl_opts);
    // end-ssl-options
    
    mongoc_client_destroy(client);
    mongoc_uri_destroy(uri);
}

// Connect Timeout
void connect_timeout_example(void) {
    // start-uri-connect-timeout
    mongoc_uri_t *uri = mongoc_uri_new("mongodb+srv://localhost:27017/?connectTimeoutMS=60000");
    // end-uri-connect-timeout

    mongoc_client_t *client = mongoc_client_new_from_uri(uri);

    // start-mongoc-connect-timeout
    mongoc_uri_set_option_as_int32(uri, MONGOC_URI_CONNECTTIMEOUTMS, 60000);
    // end-mongoc-connect-timeout
    
    mongoc_client_destroy(client);
    mongoc_uri_destroy(uri);
}

// Socket Timeout
void socket_timeout_example(void) {
    // start-uri-socket-timeout
    mongoc_uri_t *uri = mongoc_uri_new("mongodb+srv://localhost:27017/?socketTimeoutMS=60000");
    // end-uri-socket-timeout

    mongoc_client_t *client = mongoc_client_new_from_uri(uri);

    // start-mongoc-socket-timeout
    mongoc_uri_set_option_as_int32(uri, MONGOC_URI_SOCKETTIMEOUTMS, 60000);
    // end-mongoc-socket-timeout
    
    mongoc_client_destroy(client);
    mongoc_uri_destroy(uri);
}

// Compressors
void compressors_example(void) {
    // start-uri-compressors
    mongoc_uri_t *uri = mongoc_uri_new("mongodb+srv://localhost:27017/?compressors=zlib,snappy");
    // end-uri-compressors

    mongoc_client_t *client = mongoc_client_new_from_uri(uri);

    // start-mongoc-compressors
    mongoc_uri_set_option_as_utf8(uri, MONGOC_URI_COMPRESSORS, "zlib,snappy");
    // end-mongoc-compressors

    mongoc_client_destroy(client);
    mongoc_uri_destroy(uri);
}

// Max Connection Pool Size 
void max_connection_pool_size_uri(void) {
    // start-uri-max-connection-pool-size
    mongoc_uri_t *uri = mongoc_uri_new("mongodb+srv://localhost:27017/?maxPoolSize=150");
    // end-uri-max-connection-pool-size

    mongoc_client_t *client = mongoc_client_new_from_uri(uri);
    
    mongoc_client_destroy(client);
    mongoc_uri_destroy(uri);
}

void max_connection_pool_size_opt(void) {
    mongoc_uri_t *uri = mongoc_uri_new("mongodb+srv://localhost:27017/");

    // start-mongoc-max-connection-pool
    mongoc_uri_set_option_as_int32(uri, MONGOC_URI_MAXPOOLSIZE, 150)
    // end-mongoc-max-connection-pool

    // start-mongoc-pool-max-connection-pool
    mongoc_client_pool_t *pool = mongoc_client_pool_new(uri);
    
    // Specifies max pool size 
    mongoc_client_pool_max_size(pool, 150);
    // end-mongoc-pool-max-connection-pool

    mongoc_client_t *client = mongoc_client_pool_pop(pool);
    
    mongoc_client_destroy(client);
    mongoc_uri_destroy(uri);
}

// Wait Queue Timeout
void wait_queue_timeout_example(void) {
    // start-uri-wait-queue-timeout
    mongoc_uri_t *uri = mongoc_uri_new("mongodb+srv://localhost:27017/?waitQueueTimeoutMS=30000");
    // end-uri-wait-queue-timeout

    mongoc_client_t *client = mongoc_client_new_from_uri(uri);

    // start-mongoc-wait-queue-timeout
    mongoc_uri_set_option_as_int32(uri, MONGOC_URI_WAITQUEUETIMEOUTMS, 30000);
    // end-mongoc-wait-queue-timeout
    
    mongoc_client_destroy(client);
    mongoc_uri_destroy(uri);
}

// Read Concern
void read_concern_example(void) {
    // start-uri-read-concern
    mongoc_uri_t *uri = mongoc_uri_new("mongodb+srv://localhost:27017/?readConcernLevel=local");
    // end-uri-read-concern

    mongoc_client_t *client = mongoc_client_new_from_uri(uri);
    
    // start-mongoc-read-concern
    mongoc_read_concern_t *read_concern = mongoc_read_concern_new();

    // Set the read concern level to "local"
    mongoc_read_concern_set_level(read_concern, MONGOC_READ_CONCERN_LEVEL_LOCAL);

    mongoc_client_set_read_concern(client, read_concern); 
    // end-mongoc-read-concern

    // start-mongoc-uri-read-concern
    mongoc_uri_set_option_as_utf8(uri, MONGOC_URI_READCONCERNLEVEL, "local")
    // end-mongoc-uri-read-concern
    
    mongoc_client_destroy(client);
    mongoc_uri_destroy(uri);
}

// Read Preference
void read_preference_example(void) {
    // start-uri-read-preference
    mongoc_uri_t *uri = mongoc_uri_new("mongodb+srv://localhost:27017/?readPreference=primaryPreferred");
    // end-uri-read-preference

    mongoc_client_t *client = mongoc_client_new_from_uri(uri);

    // start-mongoc-uri-read-preference
    mongoc_uri_set_option_as_utf8(uri, MONGOC_URI_READPREFERENCE, "primaryPreferred")
    // end-mongoc-uri-read-preference
    
    mongoc_client_destroy(client);
    mongoc_uri_destroy(uri);
}

// Read Preference (for read_prefs struct)
void read_preference_struct_example(void) {
    // start-mongoc-read-preference
    mongoc_client_t *client = mongoc_client_new("mongodb+srv://localhost:27017/");

    // Specifies the read preference 
    mongoc_read_prefs_t *read_prefs = mongoc_read_prefs_new(MONGOC_READ_PRIMARY_PREFERRED);

    mongoc_client_set_read_prefs(client, read_prefs);
    // end-mongoc-read-preference
    
    mongoc_client_destroy(client);
    mongoc_uri_destroy(uri);
}

// Max Staleness
void max_staleness_example(void) {
    // start-uri-max-staleness
    mongoc_uri_t *uri = mongoc_uri_new("mongodb+srv://localhost:27017/?readPreference=secondary&maxStalenessSeconds=120");
    // end-uri-max-staleness

    mongoc_client_t *client = mongoc_client_new_from_uri(uri);

    mongoc_uri_set_option_as_utf8(uri, MONGOC_URI_READPREFERENCE, "secondary");

    // Specifies max staleness
    // start-mongoc-uri-max-staleness
    mongoc_uri_set_option_as_int32(uri, MONGOC_URI_MAXSTALENESSSECONDS, 120);
    // end-mongoc-uri-max-staleness
    
    mongoc_client_destroy(client);
    mongoc_uri_destroy(uri);
}

// Max Staleness (for read_prefs struct)
void max_staleness_example(void) {
    // start-mongoc-max-staleness
    mongoc_client_t *client = mongoc_client_new("mongodb+srv://localhost:27017/");

    mongoc_read_prefs_t *read_prefs = mongoc_read_prefs_new(MONGOC_READ_SECONDARY);
    
    // Specifies max staleness to 120 seconds
    mongoc_read_prefs_set_max_staleness_seconds(read_prefs, 120);

    mongoc_client_set_read_prefs(client, read_prefs);
    // end-mongoc-max-staleness
    
    mongoc_client_destroy(client);
    mongoc_uri_destroy(uri);
}

// Credential / Authentication
void credential_example(void) {
    // start-uri-auth
    mongoc_uri_t *uri = mongoc_uri_new("mongodb+srv://localhost:27017/?authSource=admin&authMechanism=GSSAPI");
    // end-uri-auth

    mongoc_client_t *client = mongoc_client_new_from_uri(uri);

    // start-mongoc-auth
    mongoc_uri_set_auth_mechanism(uri, "GSSAPI");
    // end-mongoc-auth
    
    mongoc_client_destroy(client);
    mongoc_uri_destroy(uri);
}

// Authentication with mechanism properties
void authentication_mechanism_example(void) {
    // start-uri-auth-properties
    mongoc_uri_t *uri = mongoc_uri_new("mongodb+srv://localhost:27017/?authMechanism=GSSAPI&authMechanismProperties=SERVICE_NAME:other,CANONICALIZE_HOST_NAME:true&authSource=db");
    // end-uri-auth-properties

    mongoc_client_t *client = mongoc_client_new_from_uri(uri);

    // start-mongoc-auth-properties
    mongoc_uri_set_auth_mechanism(uri, "SCRAM-SHA-256");
    // end-mongoc-auth-properties
    
    mongoc_client_destroy(client);
    mongoc_uri_destroy(uri);
}

// Heartbeat Frequency
void heartbeat_frequency_example(void) {
    // start-uri-heartbeat-freq
    mongoc_uri_t *uri = mongoc_uri_new("mongodb+srv://localhost:27017/?heartbeatFrequencyMS=5000");
    // end-uri-heartbeat-freq

    mongoc_client_t *client = mongoc_client_new_from_uri(uri);

    // start-mongoc-heartbeat-freq
    mongoc_uri_set_option_as_int32(uri, MONGOC_URI_HEARTBEATFREQUENCYMS, 5000);
    // end-mongoc-heartbeat-freq
    
    mongoc_client_destroy(client);
    mongoc_uri_destroy(uri);
}

// Local Threshold
void local_threshold_example(void) {
    // start-uri-local-threshold
    mongoc_uri_t *uri = mongoc_uri_new("mongodb+srv://localhost:27017/?localThresholdMS=150");
    // end-uri-local-threshold

    mongoc_client_t *client = mongoc_client_new_from_uri(uri);

    // start-mongoc-local-threshold
    mongoc_uri_set_option_as_int32(uri, MONGOC_URI_LOCALTHRESHOLDMS, 150);
    // end-mongoc-local-threshold
    
    mongoc_client_destroy(client);
    mongoc_uri_destroy(uri);
}

// Server Selection Timeout
void server_selection_timeout_example(void) {
    // start-uri-server-selection-timeout
    mongoc_uri_t *uri = mongoc_uri_new("mongodb+srv://localhost:27017/?serverSelectionTimeoutMS=40000");
    // end-uri-server-selection-timeout

    mongoc_client_t *client = mongoc_client_new_from_uri(uri);

    // start-mongoc-server-selection-timeout
    mongoc_uri_set_option_as_int32(uri, MONGOC_URI_SERVERSELECTIONTIMEOUTMS, 40000);
    // end-mongoc-server-selection-timeout
    
    mongoc_client_destroy(client);
    mongoc_uri_destroy(uri);
}

// Socket Check Interval
void socket_check_interval_example(void) {
    // start-uri-socket-check
    mongoc_uri_t *uri = mongoc_uri_new("mongodb+srv://localhost:27017/?socketCheckIntervalMS=10000");
    // end-uri-socket-check

    mongoc_client_t *client = mongoc_client_new_from_uri(uri);

    // start-mongoc-socket-check
    mongoc_uri_set_option_as_int32(uri, MONGOC_URI_SOCKETCHECKINTERVALMS, 10000);
    // end-mongoc-socket-check
    
    mongoc_client_destroy(client);
    mongoc_uri_destroy(uri);
}

// Application Name
void application_name_example(void) {
    // start-uri-application-name
    mongoc_uri_t *uri = mongoc_uri_new("mongodb+srv://localhost:27017/?appName=yourAppName");
    // end-uri-application-name

    mongoc_client_t *client = mongoc_client_new_from_uri(uri);

    // start-mongoc-application-name
    mongoc_uri_set_option_as_utf8(uri, MONGOC_URI_APPNAME, "yourAppName");
    // end-mongoc-application-name
    
    mongoc_client_destroy(client);
    mongoc_uri_destroy(uri);
}

// Load Balanced
void load_balanced_example(void) {
    // start-uri-load-balanced
    mongoc_uri_t *uri = mongoc_uri_new("mongodb+srv://localhost:27017/?loadBalanced=true");
    // end-uri-load-balanced

    mongoc_client_t *client = mongoc_client_new_from_uri(uri);

    // start-mongoc-load-balanced
    mongoc_uri_set_option_as_bool(uri, MONGOC_URI_LOADBALANCED, true);
    // end-mongoc-load-balanced
    
    mongoc_client_destroy(client);
    mongoc_uri_destroy(uri);
}

// Retry Reads
void retry_reads_example(void) {
    // start-uri-retry-reads
    mongoc_uri_t *uri = mongoc_uri_new("mongodb+srv://localhost:27017/?retryReads=false");
    // end-uri-retry-reads

    mongoc_client_t *client = mongoc_client_new_from_uri(uri);

    // start-mongoc-retry-reads
    mongoc_uri_set_option_as_bool(uri, MONGOC_URI_RETRYREADS, false)
    // end-mongoc-retry-reads
    
    mongoc_client_destroy(client);
    mongoc_uri_destroy(uri);
}

// Retry Writes
void retry_writes_example(void) {
    // start-uri-retry-writes
    mongoc_uri_t *uri = mongoc_uri_new("mongodb+srv://localhost:27017/?retryWrites=false");
    // end-uri-retry-writes

    mongoc_client_t *client = mongoc_client_new_from_uri(uri);

    // start-mongoc-retry-writes
    mongoc_uri_set_option_as_bool(uri, MONGOC_URI_RETRYWRITES, false);
    // end-mongoc-retry-writes
    
    mongoc_client_destroy(client);
    mongoc_uri_destroy(uri);
}

// SRV Max Hosts
void srv_max_hosts_example(void) {
    // start-uri-srv-max-hosts
    mongoc_uri_t *uri = mongoc_uri_new("mongodb+srv://localhost:27017/?srvMaxHosts=5");
    // end-uri-srv-max-hosts

    mongoc_client_t *client = mongoc_client_new_from_uri(uri);

    // start-mongoc-srv-max-hosts
    mongoc_uri_set_option_as_int32(uri, MONGOC_URI_SRVMAXHOSTS, 5);
    // end-mongoc-srv-max-hosts
    
    mongoc_client_destroy(client);
    mongoc_uri_destroy(uri);
}

// Journal
void journal_example(void) {
    // start-uri-journal
    mongoc_uri_t *uri = mongoc_uri_new("mongodb+srv://localhost:27017/?journal=true");
    // end-uri-journal

    mongoc_client_t *client = mongoc_client_new_from_uri(uri);

    // start-mongoc-journal
    // Creates a write concern structure
    mongoc_write_concern_t *write_concern = mongoc_write_concern_new();
    
    // Sets journal to true
    mongoc_write_concern_set_journal(write_concern, true);

    // Apply write concern to client
    mongoc_client_set_write_concern(client, write_concern);
    // end-mongoc-journal

    // start-mongoc-uri-journal
    mongoc_uri_set_option_as_bool(uri, MONGOC_URI_JOURNAL, true);
    // end-mongoc-uri-journal
    
    mongoc_client_destroy(client);
    mongoc_uri_destroy(uri);
}

// Write Concern W
void w_example(void) {
    // start-uri-w
    mongoc_uri_t *uri = mongoc_uri_new("mongodb+srv://localhost:27017/?w=2");
    // end-uri-w

    mongoc_client_t *client = mongoc_client_new_from_uri(uri);

    // start-mongoc-w
    // Creates a write concern structure
    mongoc_write_concern_t *write_concern = mongoc_write_concern_new();
    
    // Sets w=2
    mongoc_write_concern_set_w(write_concern, 2);

    mongoc_client_set_write_concern(client, write_concern);
    // end-mongoc-w

    // start-mongoc-uri-w
    // Use the int32 version of the mongoc_uri_t set function to set integer values
    mongoc_uri_set_option_as_int32(uri, MONGOC_URI_W, 2); 

    // Use the utf8 version of the mongoc_uri_t set function to set string values 
    mongoc_uri_set_option_as_utf8(uri, MONGOC_URI_W, "majority"); 
    // end-mongoc-uri-w
    
    mongoc_client_destroy(client);
    mongoc_uri_destroy(uri);
}

// Write Concern Timeout
void w_timeout_example(void) {
    // start-uri-w-timeout
    mongoc_uri_t *uri = mongoc_uri_new("mongodb+srv://localhost:27017/?wTimeoutMS=5000");
    // end-uri-w-timeout

    mongoc_client_t *client = mongoc_client_new_from_uri(uri);

    // start-mongoc-w-timeout
    // Creates a write concern structure
    mongoc_write_concern_t *write_concern = mongoc_write_concern_new();
    
    // Sets w=2
    mongoc_write_concern_set_wtimeout(write_concern, 5000);

    // Apply write concern to client
    mongoc_client_set_write_concern(client, write_concern);
    // end-mongoc-w-timeout
    
    // start-mongoc-uri-w-timeout
    mongoc_uri_set_option_as_int32(uri, MONGOC_URI_WTIMEOUTMS, 5000); 
    // end-mongoc-uri-w-timeout

    mongoc_client_destroy(client);
    mongoc_uri_destroy(uri);
}


