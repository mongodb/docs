.. procedure::
   :style: normal

   .. step:: Detect overload errors

      Create a function to identify server overload errors. The function 
      checks for the ``SystemOverloadedError`` label. You can use this 
      check to apply retry logic only to operations that 
      MongoDB rejected based on the ``SystemOverloadedError`` label:

      .. code-block:: ruby  
        
         RETRYABLE_ERROR_LABEL = 'RetryableError'
         OVERLOADED_ERROR_LABEL = 'SystemOverloadedError'
 
         def is_overload_error(error)
           error.is_a?(Mongo::Error) && error.label?(OVERLOADED_ERROR_LABEL)
         end

   .. step:: Implement operation "retry" logic using exponential backoff and jitter

      Create a retrier function that wraps any operation you 
      want to protect. The function does the following: 
         
      - Retries only overload errors that are safe to retry.

        .. include:: /includes/admonitions/importants/query-sentinel-retryable.rst

      - Waits longer between each attempt using `exponential backoff <https://en.wikipedia.org/wiki/Exponential_backoff>`_ 
        with `jitter <https://en.wikipedia.org/wiki/Jitter>`_.

      .. note:: 

         The following code uses arbitrary values for ``BASE_BACKOFF_MS``, ``MAX_BACKOFF_MS``, 
         and the exponential growth factor in ``calculate_exponential_backoff``.
         Adjust these values to tune the retry behavior for your application.

      .. code-block:: ruby

         BASE_BACKOFF_MS = 100
         MAX_BACKOFF_MS = 10_000
 
         def system_overloaded_error?(error)
           error.respond_to?(:label?) && error.label?(OVERLOADED_ERROR_LABEL)
         end
 
         def calculate_exponential_backoff(attempt)
           rand * [ MAX_BACKOFF_MS, BASE_BACKOFF_MS * (2**(attempt - 1)) ].min
         end
 
         def with_retries(max_attempts: 2)
          max_attempts.times do |attempt|
            is_retry = attempt > 0
            if is_retry
              delay = calculate_exponential_backoff(attempt)
              sleep(delay / 1000.0)
            end
            begin
              return yield
            rescue StandardError => e
              is_retryable_overload_error = system_overloaded_error?(e) && e.label?(RETRYABLE_ERROR_LABEL)
              can_retry = is_retryable_overload_error && attempt + 1 < max_attempts
              raise unless can_retry
            end
          end
         end

   .. step:: Use the retrier for collection operations

      Call the retrier from your application code. Wrap individual operations,
      such as ``insert`` or ``find`` queries, with the ``execute_with_retries`` function
      so that MongoDB retries overload errors with backoff and surfaces all 
      other errors immediately.

      For example, consider the following query which fetches all users 
      from the ``users`` collection and returns them as an array: 

      .. code-block:: ruby

         users = users_collection.find.to_a

      You can modify this code to use the new ``execute_with_retries`` function: 

      .. code-block:: ruby

         users = execute_with_retries { users_collection.find.to_a }
