.. procedure::
   :style: normal

   .. step:: Detect overload errors

      Create a function to identify server overload errors. The function 
      checks for the ``SystemOverloadedError`` label. You can use this 
      check to apply retry logic only to operations that 
      MongoDB rejected based on the ``SystemOverloadedError`` label:

      .. code-block:: javascript

         function isRetryableError(error: unknown): boolean {
            return error instanceof MongoError && error.hasErrorLabel('SystemOverloadedError') && error.hasErrorLabel('RetryableError');
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
         and the exponential growth factor in ``calculateExponentialBackoff()``.
         Adjust these values to tune the retry behavior for your application.

      .. code-block:: javascript

         import { setTimeout } from 'node:timers/promises';

         const BASE_BACKOFF_MS = 100;
         const MAX_BACKOFF_MS = 10_000;

         function calculateExponentialBackoff(attempt: number): number {
            return Math.random() * Math.min(MAX_BACKOFF_MS, BASE_BACKOFF_MS * 2 ** (attempt - 1));
         }

         async function executeWithRetries<T>(fn: () => Promise<T>, maxAttempts = 2): Promise<T> {
            let lastError: unknown;
            for (let attempt = 0; attempt < maxAttempts; attempt++) {
               if (attempt > 0) {
                  await setTimeout(calculateExponentialBackoff(attempt));
               }

               try {
                  return await fn();
               } catch (error) {
                  lastError = error;
                  const canRetry = isRetryableError(error) && attempt + 1 < maxAttempts;
                  if (!canRetry) throw error;
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
