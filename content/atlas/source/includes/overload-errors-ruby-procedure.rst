.. procedure::
   :style: normal

   .. step:: Detect overload errors

      Create a function to identify server overload errors. The function
      checks for the ``SystemOverloadedError`` label. You can use this
      check to apply retry logic only to operations that
      MongoDB rejected based on the ``SystemOverloadedError`` label:

      .. code-block:: ruby

         RETRYABLE_ERROR_LABEL = 'RetryableError'
         SYSTEM_OVERLOADED_ERROR = 'SystemOverloadedError'

         def system_overloaded_error?(error)
           error.respond_to?(:label?) && error.label?(SYSTEM_OVERLOADED_ERROR)
         end

         # Only an overload error that is also labeled retryable is safe to retry.
         def retryable_overload_error?(error)
           system_overloaded_error?(error) && error.label?(RETRYABLE_ERROR_LABEL)
         end

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
         ``calculate_exponential_backoff``. Adjust these values to tune the
         retry behavior for your application.

      .. code-block:: ruby

         BASE_BACKOFF_MS = 100
         MAX_BACKOFF_MS = 10_000

         # The server may attach a positive `baseBackoffMS` to an overload error's
         # reply document to replace the default base backoff.
         def base_backoff_ms(error)
           document = error.respond_to?(:document) && error.document
           value = document && document['baseBackoffMS']
           value if value && value > 0
         end

         def calculate_exponential_backoff(attempt, base_backoff_ms = nil)
           rand * [ MAX_BACKOFF_MS, (base_backoff_ms || BASE_BACKOFF_MS) * (2**attempt) ].min
         end

         def execute_with_retries(max_attempts: 2)
           attempt = 0
           begin
             yield
           rescue StandardError => e
             raise unless retryable_overload_error?(e)

             attempt += 1
             raise if attempt >= max_attempts

             delay = calculate_exponential_backoff(attempt, base_backoff_ms(e))
             sleep(delay / 1000.0)
             retry
           end
         end

   .. step:: Use the retrier for collection operations

      Call the retrier from your application code. Wrap individual
      operations, such as ``insert`` or ``find`` queries, with the
      ``execute_with_retries`` function so that MongoDB retries overload
      errors with backoff and surfaces all other errors immediately.

      For example, the following query fetches all users from the
      ``users`` collection and returns them as an array:

      .. code-block:: ruby

         users = users_collection.find.to_a

      The following code then executes this operation with retry logic:

      .. code-block:: ruby

         users = execute_with_retries { users_collection.find.to_a }
