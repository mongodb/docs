.. procedure::
   :style: normal

   .. step:: Detect overload errors

      Create a function to identify server overload errors. The function
      checks for the ``SystemOverloadedError`` label. You can use this
      check to apply retry logic only to operations that
      MongoDB rejected based on the ``SystemOverloadedError`` label:

      .. code-block:: php

         function isSystemOverloadedError(Throwable $exception): bool
         {
             return $exception instanceof \MongoDB\Driver\Exception\RuntimeException
                 && $exception->hasErrorLabel('SystemOverloadedError');
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
         ``MAX_BACKOFF_MS``, and the exponential growth factor in the
         ``$backoffMs`` calculation. Adjust these values to tune the retry
         behavior for your application.

      .. code-block:: php

         const BASE_BACKOFF_MS = 100;
         const MAX_BACKOFF_MS = 10000;

         function executeWithRetries(\Closure $closure, int $maxAttempts = 2)
         {
             for ($attempt = 0; true; $attempt++) {
                 try {
                     return $closure();
                 } catch (\MongoDB\Driver\Exception\RuntimeException $exception) {
                     if (
                         $attempt + 1 >= $maxAttempts
                         || ! isSystemOverloadedError($exception)
                         || ! $exception->hasErrorLabel('RetryableError')
                     ) {
                         throw $exception;
                     }

                     $reply = null;

                     if ($exception instanceof \MongoDB\Driver\Exception\CommandException) {
                         $reply = $exception->getResultDocument();
                     } elseif ($exception instanceof \MongoDB\Driver\Exception\BulkWriteCommandException) {
                         $errorReply = $exception->getErrorReply();
                         $reply = $errorReply === null ? null : $errorReply->toPHP();
                     }

                     $baseBackoffMs = (int) (($reply->baseBackoffMS ?? 0) ?: BASE_BACKOFF_MS);

                     $jitter = random_int(0, 2 ** 53) / 2 ** 53;
                     $backoffMs = (int) ($jitter * min(MAX_BACKOFF_MS, $baseBackoffMs * 2 ** ($attempt + 1)));

                     usleep($backoffMs * 1000);
                 }
             }
         }

   .. step:: Use the retry helper for collection operations

      Call the retrier from your application code. Wrap individual
      operations, such as ``find()`` or ``insertOne()`` calls, with the
      ``executeWithRetries()`` function so that MongoDB retries overload
      errors with backoff and surfaces all other errors immediately.

      For example, the following query fetches all users from the
      ``users`` collection and returns them as an array:

      .. code-block:: php

         $users = $usersCollection->find()->toArray();

      The following code then executes this operation with retry logic:

      .. code-block:: php

         $users = executeWithRetries(fn () => $usersCollection->find()->toArray());
