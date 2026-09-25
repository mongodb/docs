.. procedure::
   :style: normal

   .. step:: Detect overload errors

      Create a function to identify server overload errors. The function 
      checks for the ``SystemOverloadedError`` label. You can use this 
      check to apply retry logic only to operations that 
      MongoDB rejected based on the ``SystemOverloadedError`` label:

      .. code-block:: rust  

         fn is_system_overloaded_error(error: &mongodb::error::Error) -> bool {
             const SYSTEM_OVERLOADED_LABEL: &str = "SystemOverloadedError";
             error.contains_label(SYSTEM_OVERLOADED_LABEL)
         }

   .. step:: Implement operation "retry" logic using exponential backoff and jitter

      Create a retrier function that wraps any operation you 
      want to protect. The function does the following: 
         
      - Retries only overload errors that are safe to retry.
      - Waits longer between each attempt using `exponential backoff <https://en.wikipedia.org/wiki/Exponential_backoff>`_ 
        with `jitter <https://en.wikipedia.org/wiki/Jitter>`_.

      .. note:: 

         The following code uses arbitrary values for ``BASE_BACKOFF_MS``, ``MAX_BACKOFF_MS``, 
         and the exponential growth factor in ``calculate_exponential_backoff()``.
         Adjust these values to tune the retry behavior for your application.

      .. code-block:: rust

         const DEFAULT_BASE_BACKOFF: Duration = Duration::from_millis(100);
         const MAX_BACKOFF: Duration = Duration::from_millis(10_000);
         const MAX_ATTEMPTS: u32 = 2;
 
         fn calculate_exponential_backoff(attempt: u32, base_backoff: Option<Duration>) -> Duration {
             let base_backoff = base_backoff.unwrap_or(DEFAULT_BASE_BACKOFF);
             let backoff = std::cmp::min(base_backoff * 2u32.pow(attempt), MAX_BACKOFF);
             let jitter = rand::random::<f32>();
             backoff.mul_f32(jitter)
         }

         fn is_retryable_error(error: &mongodb::error::Error) -> bool {
             const RETRYABLE_ERROR_LABEL: &str = "RetryableError";
             error.contains_label(RETRYABLE_ERROR_LABEL)
         }

         async fn execute_with_retries<F, R>(operation: F) -> mongodb::error::Result<R>
         where
             F: AsyncFn() -> mongodb::error::Result<R>,
         {
             let mut attempt = 0;
             loop {
                 attempt += 1;
                 match operation().await {
                     Ok(result) => return Ok(result),
                     Err(error) => {
                         let is_retryable_overload_error =
                             is_system_overloaded_error(&error) && is_retryable_error(&error);
                         let is_last_attempt = attempt == MAX_ATTEMPTS;
                         if !is_retryable_overload_error || is_last_attempt {
                             return Err(error);
                         }
                         let backoff = calculate_exponential_backoff(attempt, error.base_backoff());
                         tokio::time::sleep(backoff).await;
                     }
                 }
             }
         }

   .. step:: Use the retrier for collection operations

      Call the retrier from your application code. Wrap individual operations,
      such as ``insert()`` or ``find()`` queries, with the ``execute_with_retries()`` function
      so that MongoDB retries overload errors with backoff and surfaces all 
      other errors immediately.

      For example, consider the following query which fetches all users 
      from the ``users`` collection and returns them as an array: 

      .. code-block:: rust

         use futures::TryStreamExt;
         let users: Vec<Document> = users_collection.find(doc! {}).await?.try_collect().await?;

      You can modify this code to use the new ``execute_with_retries`` function: 

      .. code-block:: rust

         use futures::TryStreamExt; 
         let users: Vec<Document> = execute_with_retries(|| async {
             users_collection.find(doc! {}).await?.try_collect().await
         })
         .await?;

    
