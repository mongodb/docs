.. procedure::
   :style: normal

   .. step:: Detect overload errors

      Create a function to identify server overload errors. The function 
      checks for the ``SystemOverloadedError`` label. You can use this 
      check to apply retry logic only to operations that 
      MongoDB rejected based on the ``SystemOverloadedError`` label:

      .. code-block:: python  

         RETRYABLE_ERROR_LABEL = "RetryableError"
         SYSTEM_OVERLOADED_ERROR = "SystemOverloadedError"
 
         def is_overload_error(error):
             return isinstance(error, PyMongoError) and error.has_error_label(SYSTEM_OVERLOADED_ERROR)

   .. step:: Implement operation "retry" logic using exponential backoff and jitter

      Create a retrier function that wraps any operation you 
      want to protect. The function does the following: 
         
      - Retries only overload errors that are safe to retry.

        .. include:: /includes/admonitions/importants/query-sentinel-retryable.rst

      - Waits longer between each attempt using `exponential backoff <https://en.wikipedia.org/wiki/Exponential_backoff>`_ 
        with `jitter <https://en.wikipedia.org/wiki/Jitter>`_.

      .. note:: 

         The following code uses arbitrary values for ``BASE_BACKOFF_MS``, ``MAX_BACKOFF_MS``, 
         and the exponential growth factor in ``calculate_exponential_backoff()``.
         Adjust these values to tune the retry behavior for your application.

      .. code-block:: python

         BASE_BACKOFF_MS = 100
         MAX_BACKOFF_MS = 10_000

         def calculate_exponential_backoff(attempt):
             return random.random() * min(MAX_BACKOFF_MS, BASE_BACKOFF_MS * 2 ** (attempt - 1))

         def execute_with_retries(fn, max_attempts=5):
             for attempt in range(max_attempts):
                 is_retry = attempt > 0
 
                 if is_retry:
                     delay = calculate_exponential_backoff(attempt)
                     sleep(delay / 1000)  # Convert ms to seconds

                 try:
                     result = fn()
                     return result
                 except Exception as error:
                     is_retryable_overload_error = (
                             is_system_overloaded_error(error)
                             and error.has_error_label(RETRYABLE_ERROR_LABEL)
                     )
                     can_retry = is_retryable_overload_error and attempt + 1 < max_attempts
 
                     if not can_retry:
                         raise

   .. step:: Use the retrier for collection operations

      Call the retrier from your application code. Wrap individual operations,
      such as ``insert()`` or ``find()`` queries, with the ``execute_with_retries()`` function
      so that MongoDB retries overload errors with backoff and surfaces all 
      other errors immediately.

      For example, consider the following query which fetches all users 
      from the ``users`` collection and returns them as an array: 

      .. code-block:: python

         users = users_collection.find().to_list()

      You can modify this code to use the new ``execute_with_retries`` function: 

      .. code-block:: python

         users = execute_with_retries(lambda: users_collection.find().to_list())  
    
