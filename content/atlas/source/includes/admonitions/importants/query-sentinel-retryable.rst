.. important:: 

   When Query Sentinel terminates a long-running query, the server
   returns an ``InterruptedDueToOverload`` error code. This error does
   not include the ``RetryableError`` label.
   
   If you choose to retry an operation that failed with the
   ``InterruptedDueToOverload`` error, ensure that the operation is
   idempotent and wait before retrying to avoid contributing to
   overload. When retrying, monitor your cluster's health and use
   exponential backoff and jitter.