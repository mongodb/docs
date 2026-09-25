.. procedure::
   :style: normal

   .. step:: Detect overload errors

      Create a function to identify server overload errors. The function 
      checks for the ``SystemOverloadedError`` label. You can use this 
      check to apply retry logic only to operations that 
      MongoDB rejected based on the ``SystemOverloadedError`` label:

      .. code-block:: javascript

         const RETRYABLE_ERROR_LABEL = 'RetryableError';
         const SYSTEM_OVERLOADED_ERROR = 'SystemOverloadedError';

         function isSystemOverloadedError(error: unknown): error is MongoError {
         return error instanceof MongoError && error.hasErrorLabel(SYSTEM_OVERLOADED_ERROR);
         }
   
   .. step:: Implement operation "retry" logic using exponential backoff and jitter

      Create a retrier function that wraps any async operation you 
      want to protect. The function does the following: 
         
      - Retries only overload errors that are safe to retry.
      - Waits longer between each attempt using `exponential backoff <https://en.wikipedia.org/wiki/Exponential_backoff>`_ 
        with `jitter <https://en.wikipedia.org/wiki/Jitter>`_.

      .. note:: 

         The following code uses arbitrary values for ``BASE_BACKOFF_MS``, ``MAX_BACKOFF_MS``, 
         and the exponential growth factor in ``calculateExponentialBackoff()``.
         Adjust these values to tune the retry behavior for your application.

      .. code-block:: javascript

         import { setTimeout } from 'node:timers/promises';
         import { MongoServerError } from 'mongodb';

         const BASE_BACKOFF_MS = 100;
         const MAX_BACKOFF_MS = 10_000;

         // Only an overload error that is also labelled retryable is safe to retry.
         function isRetryableOverloadError(error: unknown): boolean {
         return isSystemOverloadedError(error) && error.hasErrorLabel(RETRYABLE_ERROR_LABEL);
         }

         // The server may attach a positive `baseBackoffMS` to an overload error to replace
         // the default base backoff. A value of 0 means "use your own default".
         function getBaseBackoffMS(error: unknown): number {
         // `errorResponse` exposes the raw server reply. It was added in driver 6.5.0, so guard
         // for it -- on older drivers the property is simply absent.
         if (!(error instanceof MongoServerError) || error.errorResponse == null) {
            return BASE_BACKOFF_MS;
         }

         // `baseBackoffMS` is an int64 on the wire, so its runtime type depends on your BSON
         // options: `number` by default, `Long` under `promoteLongs: false`, `bigint` under
         // `useBigInt64: true`. `Number()` handles all three, and yields NaN when absent.
         const baseBackoffMS = Number(error.errorResponse.baseBackoffMS);
         return Number.isFinite(baseBackoffMS) && baseBackoffMS > 0 ? baseBackoffMS : BASE_BACKOFF_MS;
         }

         async function executeWithRetries<T>(fn: () => Promise<T>, maxAttempts = 2): Promise<T> {
         let lastError: unknown;

         for (let attempt = 0; attempt < maxAttempts; attempt++) {
            try {
               return await fn();
            } catch (error) {
               lastError = error;

               if (!isRetryableOverloadError(error) || attempt + 1 >= maxAttempts) throw error;

               const baseBackoffMS = getBaseBackoffMS(error);
               const backoffMS =
               Math.random() * Math.min(MAX_BACKOFF_MS, baseBackoffMS * 2 ** (attempt + 1));

               await setTimeout(backoffMS);
            }
         }

         throw lastError;
         }

   .. step:: Use the retrier for collection operations

      Call the retrier from your application code. Wrap individual operations,
      such as ``insert()`` or ``find()`` queries, with the ``executeWithRetries()`` function
      so that MongoDB retries overload errors with backoff and surfaces all 
      other errors immediately.

      For example, consider the following query which fetches all users 
      from the ``users`` collection and returns them as an array: 

      .. code-block:: javascript

         const users = await usersCollection.find().toArray();

      You can modify this code to use the new ``executeWithRetries`` function: 

      .. code-block:: javascript

         const users = await executeWithRetries(() => usersCollection.find().toArray());
