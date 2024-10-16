#include <bson/bson.h>
#include <mongoc/mongoc.h>
#include <stdio.h>
#include <stdlib.h>

// start-callback
bool
transaction_callback (mongoc_client_session_t *session, void *ctx, bson_t **reply,
                      bson_error_t *error)
{
    BSON_UNUSED(ctx);
    BSON_UNUSED(reply);

    mongoc_client_t *client = mongoc_client_session_get_client (session);

    mongoc_collection_t *checking = mongoc_client_get_collection (client, "sample_bank", "checking");
    mongoc_collection_t *savings = mongoc_client_get_collection (client, "sample_bank", "savings");
    mongoc_collection_t *receipts = mongoc_client_get_collection (client, "sample_bank", "receipts");

    const char *account_id = "123456";
    int transfer_amount = 1000;

    bson_t *filter = BCON_NEW ("account_id", BCON_UTF8 (account_id));
    bson_t *update_decrement = BCON_NEW ("$inc", "{", "balance", BCON_INT32 (-transfer_amount), "}");
    bson_t *update_increment = BCON_NEW ("$inc", "{", "balance", BCON_INT32 (transfer_amount), "}");
    
    if (!mongoc_collection_update_one (checking, filter, update_decrement, NULL, NULL, &error)) {
        fprintf (stderr, "Failed to update checking account: %s\n", error.message);
        return false;
    }

    if (!mongoc_collection_update_one (savings, filter, update_increment, NULL, NULL, &error)) {
        fprintf (stderr, "Failed to update savings account: %s\n", error.message);
        return false;
    }

    bson_t *receipt = BCON_NEW ("account_id", BCON_UTF8 (account_id),
                                "amount", BCON_INT32 (transfer_amount),
                                "timestamp", BCON_DATE_TIME (bson_get_monotonic_time ()));
    
    if (!mongoc_collection_insert_one (receipts, receipt, NULL, NULL, &error)) {
        fprintf (stderr, "Failed to insert receipt: %s\n", error.message);
        return false;
    }

    mongoc_collection_destroy (checking);
    mongoc_collection_destroy (savings);
    mongoc_collection_destroy (receipts);

    bson_destroy (filter);
    bson_destroy (update_decrement);
    bson_destroy (update_increment);
    bson_destroy (receipt);

    printf ("Transaction successful!");
    return true;
}
// end-callback

int
main (void)
{
    mongoc_client_t *client;
    bson_error_t error;

    mongoc_init ();

    client =
        mongoc_client_new ("<connection string URI>");

    // start-transaction
    mongoc_client_session_t *session = mongoc_client_start_session (client, NULL, NULL);
    if (!session) {
        fprintf (stderr, "Failed to start session\n");

        mongoc_client_destroy (client);
        return EXIT_FAILURE;
    }

    bool result = 
        mongoc_client_session_with_transaction (session,
                                                (mongoc_client_session_with_transaction_cb_t) transaction_callback,
                                                NULL, NULL, NULL, &error);

    if (!result) {
        fprintf (stderr, "Transaction error: %s\n", error.message);
    }

    mongoc_client_session_destroy (session);
    mongoc_client_destroy (client);
    mongoc_cleanup ();
    // end-transaction

    return EXIT_SUCCESS;
}
