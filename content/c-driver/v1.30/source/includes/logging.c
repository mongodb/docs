// begin-logger
#include <mongoc/mongoc.h>  
#include <stdio.h>  
  
static void log_handler(const mongoc_structured_log_entry_t *entry, void *user_data) {  
    printf("Log: %s - %s\n",  
           mongoc_structured_log_get_component_name(mongoc_structured_log_entry_get_component(entry)),  
           mongoc_structured_log_entry_get_message_string(entry));  
}  
  
int main(void) {  
    mongoc_init();  
      
    // Create logging options  
    mongoc_structured_log_opts_t *log_opts = mongoc_structured_log_opts_new();  
    mongoc_structured_log_opts_set_max_level_for_all_components(log_opts, MONGOC_STRUCTURED_LOG_LEVEL_INFO);  
    mongoc_structured_log_opts_set_handler(log_opts, log_handler, NULL);  
      
    // Create client and set logging  
    mongoc_client_t *client = mongoc_client_new("<connection-string>");  
    mongoc_client_set_structured_log_opts(client, log_opts);  
      
    // Perform operation to generate logs  
    bson_t *command = BCON_NEW("ping", BCON_INT32(1));  
    bson_t reply;  
    bson_error_t error;  
    mongoc_client_command_simple(client, "admin", command, NULL, &reply, &error);  
      
    // Cleanup  
    bson_destroy(command);  
    bson_destroy(&reply);  
    mongoc_structured_log_opts_destroy(log_opts);  
    mongoc_client_destroy(client);  
    mongoc_cleanup();  
    return 0;  
}  

// end-logger
    
// begin-logger-debug 

mongoc_structured_log_opts_t *log_opts = mongoc_structured_log_opts_new();  
mongoc_structured_log_opts_set_max_level_for_all_components(  
    log_opts, MONGOC_STRUCTURED_LOG_LEVEL_DEBUG);  
mongoc_structured_log_opts_set_handler(log_opts, debug_log_handler, NULL);  
  
// Create client with DEBUG logging enabled  
mongoc_client_t *client = mongoc_client_new("<connection-string>");  
mongoc_client_set_structured_log_opts(client, log_opts);

// end-logger-debug


mongoc_database_t *database = mongoc_client_get_database(client, "db");
mongoc_collection_t *collection = mongoc_database_get_collection(database, "test_coll");

// start-logger-debug-ex

bson_t *doc = BCON_NEW("x", BCON_INT32(1));
bson_error_t error;
if (!mongoc_collection_insert_one(collection, doc, NULL, NULL, &error)) {
    fprintf(stderr, "Insert failed: %s\n", error.message);
}

// end-logger-debug-ex

bson_destroy(doc);
mongoc_collection_destroy(collection);
mongoc_database_destroy(database);
