.. procedure::
   :style: normal

   .. step:: Detect overload errors

      Create a function to identify server overload errors. The function
      checks for the ``SystemOverloadedError`` label. You can use this
      check to apply retry logic only to operations that
      MongoDB rejected based on the ``SystemOverloadedError`` label:

      .. code-block:: csharp

         const string RetryableErrorLabel = "RetryableError";
         const string SystemOverloadedErrorLabel = "SystemOverloadedError";

         bool IsSystemOverloadedError(MongoException error)
         {
             if (error == null)
             {
                 return false;
             }
             return error.HasErrorLabel(SystemOverloadedErrorLabel);
         }

   .. step:: Implement operation "retry" logic using exponential backoff and jitter

      Create a retrier function that wraps any operation you
      want to protect. The function does the following:

      - Retries only overload errors that are safe to retry.

      - Waits longer between each attempt using `exponential backoff
        <https://en.wikipedia.org/wiki/Exponential_backoff>`_
        with `jitter <https://en.wikipedia.org/wiki/Jitter>`_.

      .. note::

         The following code uses arbitrary values for ``BaseBackoffMs``,
         ``MaxBackoffMs``, and the exponential growth factor in
         ``CalculateExponentialBackoffMs()``. Adjust these values to tune the
         retry behavior for your application.

      .. code-block:: csharp

         const double BaseBackoffMs = 100;
         const double MaxBackoffMs = 10_000;

         // Only an overload error that is also labelled retryable is safe to retry.
         bool IsRetryableOverloadError(MongoException error)
             => IsSystemOverloadedError(error) && error.HasErrorLabel(RetryableErrorLabel);

         // The server may attach a positive `baseBackoffMS` to an overload error to replace
         // the default base backoff.
         double GetBaseBackoffMs(MongoException error)
         {
             if (error is MongoCommandException { Result: { } result } &&
                 result.TryGetValue("baseBackoffMS", out var value) &&
                 value.BsonType is BsonType.Int32 or BsonType.Int64 &&
                 value.ToInt64() > 0)
             {
                 return value.ToInt64();
             }

             return BaseBackoffMs;
         }

         // Random.Shared requires .NET 6+. On earlier TFMs (e.g. net472) substitute
         // a thread-safe Random.
         double CalculateExponentialBackoffMs(int attempt, double baseBackoffMs)
             => Random.Shared.NextDouble() * Math.Min(MaxBackoffMs, baseBackoffMs * Math.Pow(2, attempt));

         async Task<T> ExecuteWithRetriesAsync<T>(
             Func<CancellationToken, Task<T>> fn,
             int maxAttempts = 3,
             CancellationToken cancellationToken = default)
         {
             for (var attempt = 1; ; attempt++)
             {
                 try
                 {
                     return await fn(cancellationToken).ConfigureAwait(false);
                 }
                 catch (Exception ex)
                 {
                     // Overload errors raised during the connection handshake are wrapped in
                     // MongoAuthenticationException.
                     var error = (ex is MongoAuthenticationException authEx ? authEx.InnerException : ex)
                         as MongoException;

                     if (!IsRetryableOverloadError(error) || attempt >= maxAttempts)
                     {
                         throw;
                     }

                     var delayMs = CalculateExponentialBackoffMs(attempt, GetBaseBackoffMs(error));
                     await Task.Delay(TimeSpan.FromMilliseconds(delayMs), cancellationToken)
                         .ConfigureAwait(false);
                 }
             }
         }

   .. step:: Use the retry helper for collection operations

      Call the retrier from your application code. Wrap individual
      operations, such as ``Find()`` or ``InsertOne()`` calls, with the
      ``ExecuteWithRetriesAsync()`` function so that MongoDB retries
      overload errors with backoff and surfaces all other errors
      immediately.

      For example, the following query fetches all users from the
      ``users`` collection and returns them as a list:

      .. code-block:: csharp

         var users = await usersCollection.Find(Builders<User>.Filter.Empty)
             .ToListAsync();

      The following code then executes this operation with retry logic:

      .. code-block:: csharp

         var users = await ExecuteWithRetriesAsync(
             (ct) => usersCollection.Find(Builders<User>.Filter.Empty).ToListAsync(ct),
             cancellationToken: CancellationToken.None);

You can also implement the retry logic with `Polly
<https://github.com/App-vNext/Polly>`_, a .NET library for implementing
operations reliability. The following steps show how to build a Polly
resilience pipeline that applies the same overload error handling:

.. procedure::
   :style: normal

   .. step:: Detect overload errors

      Create a function to identify server overload errors. The function
      checks for the ``SystemOverloadedError`` label. You can use this
      check to apply retry logic only to operations that
      MongoDB rejected based on the ``SystemOverloadedError`` label.
      The function also unwraps overload errors raised during the
      connection handshake, which the driver wraps in
      ``MongoAuthenticationException``:

      .. code-block:: csharp

         const string RetryableErrorLabel = "RetryableError";
         const string SystemOverloadedErrorLabel = "SystemOverloadedError";

         bool IsMongoSystemOverloadedError(Exception exception, out MongoException mongoException)
         {
             if (exception is MongoAuthenticationException mongoAuthenticationException)
             {
                 exception = mongoAuthenticationException.InnerException;
             }

             mongoException = exception as MongoException;
             if (mongoException == null)
             {
                 return false;
             }

             return mongoException.HasErrorLabel(SystemOverloadedErrorLabel);
         }

   .. step:: Define the resilience pipeline

      Build a Polly resilience pipeline that retries operations
      returning retryable overload errors with exponential backoff and
      jitter:

      .. code-block:: csharp

         const double BaseBackoffMs = 100;
         const double MaxBackoffMs = 10_000;

         // The server may attach a positive `baseBackoffMS` to an overload error to replace
         // the default base backoff.
         double GetBaseBackoffMs(Exception exception)
         {
             if (exception is MongoAuthenticationException mongoAuthenticationException)
             {
                 exception = mongoAuthenticationException.InnerException;
             }

             if (exception is MongoCommandException { Result: { } result } &&
                 result.TryGetValue("baseBackoffMS", out var value) &&
                 value.BsonType is BsonType.Int32 or BsonType.Int64 &&
                 value.ToInt64() > 0)
             {
                 return value.ToInt64();
             }

             return BaseBackoffMs;
         }

         var pipeline = new ResiliencePipelineBuilder()
             .AddRetry(new RetryStrategyOptions
             {
                 // 1. Retry if SystemOverloadedError
                 ShouldHandle = args =>
                     IsMongoSystemOverloadedError(args.Outcome.Exception, out var mongoException)
                         && mongoException.HasErrorLabel(RetryableErrorLabel)
                         ? PredicateResult.True()
                         : PredicateResult.False(),
                 // 2. Retry 2 times
                 MaxRetryAttempts = 2, // (1 initial try + 2 retries)
                 // 3. Exponential backoff with jitter, capped at 10sec, based on the
                 //    server-supplied baseBackoffMS when present. AttemptNumber is 0 on the
                 //    first retry.
                 DelayGenerator = args =>
                 {
                     var baseBackoffMs = GetBaseBackoffMs(args.Outcome.Exception);
                     var delayMs = Random.Shared.NextDouble()
                         * Math.Min(MaxBackoffMs, baseBackoffMs * Math.Pow(2, args.AttemptNumber + 1));
                     return new ValueTask<TimeSpan?>(TimeSpan.FromMilliseconds(delayMs));
                 }
             })
             .Build();

   .. step:: Use the pipeline for collection operations

      Execute operations with the pipeline. The pipeline retries any
      operation that returns a retryable overload error and surfaces all
      other errors immediately.

      For example, the following query fetches all documents from the
      ``collection`` and returns them as a list:

      .. code-block:: csharp

         var documents = await collection.Find(Builders<BsonDocument>.Filter.Empty)
             .ToListAsync();

      The following code then executes this operation with retry logic:

      .. code-block:: csharp

         var documents = await pipeline.ExecuteAsync(async token => await collection
             .Find(Builders<BsonDocument>.Filter.Empty).ToListAsync(token), CancellationToken.None);
