.. procedure::
   :style: normal

   .. step:: Detect overload errors

      Create a function to identify server overload errors. The function 
      checks for the ``SystemOverloadedError`` label. You can use this 
      check to apply retry logic only to operations that 
      MongoDB rejected based on the ``SystemOverloadedError`` label:

      .. code-block:: c

         const char *retryable_error_label = "RetryableError";
         const char *system_overload_error = "SystemOverloadedError";

         static bool
         is_system_overloaded_error(const bson_t *error_reply)
         {
            return mongoc_error_has_label(error_reply, system_overload_error);
         }
   
   .. step:: Implement operation "retry" logic using exponential backoff and jitter

      Create a retrier function that wraps any async operation you 
      want to protect. The function does the following: 
         
      - Retries only overload errors that are safe to retry.

        .. include:: /includes/admonitions/importants/query-sentinel-retryable.rst

      - Waits longer between each attempt using `exponential backoff <https://en.wikipedia.org/wiki/Exponential_backoff>`_ 
        with `jitter <https://en.wikipedia.org/wiki/Jitter>`_.

      .. note:: 

         The following code uses arbitrary values for ``BASE_BACKOFF_MS``, ``MAX_BACKOFF_MS``, 
         and the exponential growth factor in ``calculate_exponential_backoff()``.
         Adjust these values to tune the retry behavior for your application.

      .. code-block:: c

         const double BASE_BACKOFF_MS = 100;
         const double MAX_BACKOFF_MS = 10000;
         const int MAX_ATTEMPTS_DEFAULT = 2;

         static double
         calculate_exponential_backoff(int attempt)
         {
            unsigned int *seed = get_seed();
            double rand01 = rand_r(seed) / (double)RAND_MAX;
            return rand01 * BSON_MIN(MAX_BACKOFF_MS, BASE_BACKOFF_MS * pow(2, attempt - 1));
         }

         // retryable_fn returns false and sets `error_reply` on error.
         typedef bool (*retryable_fn)(void *ctx, bson_t *error_reply);

         static bool execute_with_retries(retryable_fn fn, void *ctx, int max_attempts) {
         for (int attempt = 0; attempt < max_attempts; attempt++) {
            bool is_retry = attempt > 0;

            if (is_retry) {
               double delay = calculate_exponential_backoff(attempt);
               usleep((useconds_t)(delay * 1000)); // Convert ms to microseconds
            }

            bson_t error_reply = BSON_INITIALIZER;
            bool ok = fn(ctx, &error_reply);
            if (ok) {
               return true;
            } else {
               bool is_retryable_overload_error =
                  is_system_overloaded_error(&error_reply) &&
                  mongoc_error_has_label(&error_reply, retryable_error_label);
               is_retryable_overload_error = true;
               bool can_retry =
                  is_retryable_overload_error && attempt + 1 < max_attempts;

               if (!can_retry) {
               return false;
               }
            }
         }
         return false;
         }


   .. step:: Use the retrier for collection operations

      Call the retrier from your application code. Wrap individual operations,
      such as ``insert()`` or ``find()`` queries, with the ``execute_with_retries()`` function
      so that MongoDB retries overload errors with backoff and surfaces all 
      other errors immediately.

      For example, the following code defines a ``do_find`` function that fetches
      all users from the ``users`` collection and processes each result.

      .. code-block:: c

         static bool do_find(void *ctx, bson_t *error_reply) {
            mongoc_collection_t *users_collection = (mongoc_collection_t *)ctx;

            // Find and process results:
            const bson_t *result;
            bson_t filter = BSON_INITIALIZER;
            mongoc_cursor_t *cursor =
                  mongoc_collection_find_with_opts(users_collection, &filter, NULL, NULL);
            while (mongoc_cursor_next(cursor, &result)) {
               process_result(result);
            }

            // Check for error:
            const bson_t *error_reply_local;
            if (mongoc_cursor_error_document(cursor, NULL, &error_reply_local)) {
               if (error_reply) {
                  bson_copy_to(error_reply_local, error_reply);
               }
               mongoc_cursor_destroy(cursor);
               return false;
            }

            mongoc_cursor_destroy(cursor);
            return true;
         }

      The following code then executes this operation with retry logic:

      .. code-block:: c

         int main() {
         mongoc_init();

         mongoc_client_t *client = mongoc_client_new("mongodb://localhost:27017");
         mongoc_collection_t *coll = mongoc_client_get_collection(client, "db", "users");

         // With retry:
         execute_with_retries(do_find, coll, MAX_ATTEMPTS_DEFAULT);

         mongoc_collection_destroy(coll);
         mongoc_client_destroy(client);
         mongoc_cleanup();
         }

