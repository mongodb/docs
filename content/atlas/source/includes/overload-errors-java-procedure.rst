.. procedure::
   :style: normal

   .. step:: Detect overload errors

      Create a function to identify server overload errors. The function
      checks for the ``SystemOverloadedError`` label. You can use this
      check to apply retry logic only to operations that
      MongoDB rejected based on the ``SystemOverloadedError`` label:

      .. code-block:: java

         private static final String RETRYABLE_ERROR_LABEL = "RetryableError";
         private static final String SYSTEM_OVERLOADED_ERROR_LABEL = "SystemOverloadedError";

         // Only an overload error that is also labelled retryable is safe to retry.
         static boolean isRetryableOverloadError(final Throwable error) {
             return error instanceof MongoException
                     && ((MongoException) error).hasErrorLabel(SYSTEM_OVERLOADED_ERROR_LABEL)
                     && ((MongoException) error).hasErrorLabel(RETRYABLE_ERROR_LABEL);
         }

   .. step:: Implement operation "retry" logic using exponential backoff and jitter

      Create a retrier function that wraps any operation you
      want to protect. The function does the following:

      - Retries only overload errors that are safe to retry.

      - Waits longer between each attempt using `exponential backoff
        <https://en.wikipedia.org/wiki/Exponential_backoff>`_
        with `jitter <https://en.wikipedia.org/wiki/Jitter>`_.

      .. note::

         The following code uses arbitrary values for ``BASE_BACKOFF_MS``,
         ``MAX_BACKOFF_MS``, and the exponential growth factor in
         ``calculateExponentialBackoffMs()``. Adjust these values to tune the
         retry behavior for your application.

      .. code-block:: java

         private static final double BASE_BACKOFF_MS = 100.0;
         private static final double MAX_BACKOFF_MS = 10_000.0;

         private static double calculateExponentialBackoffMs(final int attempt, final double baseBackoffMs) {
             double jitter = ThreadLocalRandom.current().nextDouble(); // [0.0, 1.0)
             return jitter * Math.min(MAX_BACKOFF_MS, baseBackoffMs * Math.pow(2, attempt));
         }

         // The server may attach a positive `baseBackoffMS` to an overload error to replace
         // the default base backoff. A value of 0 or absent means "use your own default".
         private static double getBaseBackoffMs(final Throwable error) {
             if (error instanceof MongoCommandException) {
                 BsonDocument response = ((MongoCommandException) error).getResponse();
                 if (response.containsKey("baseBackoffMS")) {
                     double baseBackoffMs = response.getNumber("baseBackoffMS").doubleValue();
                     return baseBackoffMs;
                 }
             }
             return BASE_BACKOFF_MS;
         }

         static <T> T executeWithRetries(final Callable<T> body, final int maxRetryAttempts) throws Exception {
             if (maxRetryAttempts < 0) {
                 throw new IllegalArgumentException("maxRetryAttempts cannot be negative");
             }
             Exception lastError = null;
             for (int attempt = 0; attempt <= maxRetryAttempts; attempt++) {
                 try {
                     return body.call();
                 } catch (Exception error) {
                     lastError = error;
                     if (!isRetryableOverloadError(error) || attempt >= maxRetryAttempts) {
                         break;
                     }
                     // Back off before the next attempt, using the server-supplied base backoff if any.
                     double delayMs = calculateExponentialBackoffMs(attempt + 1, getBaseBackoffMs(error));
                     Thread.sleep((long) delayMs);
                 }
             }
             throw lastError;
         }

   .. step:: Use the retrier for collection operations

      Call the retrier from your application code. Wrap individual
      operations, such as ``insertOne()`` or ``find()`` calls, with the
      ``executeWithRetries()`` function so that MongoDB retries overload
      errors with backoff and surfaces all other errors immediately.

      For example, the following operation fetches a document from the
      ``users`` collection:

      .. code-block:: java

         Document document = collection.find(Filters.empty()).first();

      The following code then executes this operation with retry logic:

      .. code-block:: java

         private static final int MAX_RETRY_ATTEMPTS = 2;

         executeWithRetries(() -> collection.find(Filters.empty()).first(), MAX_RETRY_ATTEMPTS);
