.. procedure::
   :style: normal

   .. step:: Detect overload errors

      Create a function to identify server overload errors. The function
      checks for the ``SystemOverloadedError`` label. You can use this
      check to apply retry logic only to operations that
      MongoDB rejected based on the ``SystemOverloadedError`` label:

      .. code-block:: go

         const errSystemOverloadedError = "SystemOverloadedError"

         func isSystemOverloadedError(err error) bool {
             var lerr mongo.LabeledError
             return errors.As(err, &lerr) && lerr.HasErrorLabel(errSystemOverloadedError)
         }

   .. step:: Implement operation "retry" logic using exponential backoff and jitter

      Create a retrier function that wraps any operation you
      want to protect. The function does the following:

      - Retries only overload errors that are safe to retry.

      - Waits longer between each attempt using `exponential backoff
        <https://en.wikipedia.org/wiki/Exponential_backoff>`_
        with `jitter <https://en.wikipedia.org/wiki/Jitter>`_.

      .. note::

         The following code uses arbitrary values for ``baseBackoff``,
         ``maxBackoff``, and the exponential growth factor in
         ``overloadBackoff()``. Adjust these values to tune the retry
         behavior for your application.

      .. code-block:: go

         const (
             baseBackoff = 100 * time.Millisecond
             maxBackoff  = 10_000 * time.Millisecond

             errRetryableError = "RetryableError"
         )

         // serverBaseBackoff returns the base backoff that the server attached
         // to the error as "baseBackoffMS", or 0 if the server did not supply
         // one. A positive value replaces the client's default base backoff.
         func serverBaseBackoff(err error) time.Duration {
             // For command errors, "baseBackoffMS" is a top-level field of the
             // server response.
             var cerr mongo.CommandError
             if errors.As(err, &cerr) {
                 if ms, ok := cerr.Raw.Lookup("baseBackoffMS").AsInt64OK(); ok {
                     return time.Duration(ms) * time.Millisecond
                 }
             }

             // For write errors, "baseBackoffMS" is a field of the
             // "writeConcernError" subdocument, not of the top-level response.
             var wex mongo.WriteException
             if errors.As(err, &wex) && wex.WriteConcernError != nil {
                 if ms, ok := wex.WriteConcernError.Raw.Lookup("baseBackoffMS").AsInt64OK(); ok {
                     return time.Duration(ms) * time.Millisecond
                 }
             }

             return 0
         }

         // overloadBackoff returns the backoff duration for the given retry
         // attempt by doubling the base backoff once per attempt, capped at
         // maxBackoff.
         func overloadBackoff(base time.Duration, attempt int) time.Duration {
             d := base
             for i := 0; i < attempt && d < maxBackoff; i++ {
                 d *= 2
             }
             if d > maxBackoff {
                 d = maxBackoff
             }
             return d
         }

         // jitterDuration returns the input duration weighted by a
         // pseudo-random ratio in [0.0, 1.0).
         func jitterDuration(d time.Duration) time.Duration {
             return time.Duration(float64(d) * rand.Float64())
         }

         // executeWithRetries executes the given function with retries if it
         // returns a SystemOverloadedError.
         func executeWithRetries[T any](
             ctx context.Context, maxAttempts int,
             fn func(ctx context.Context) (T, error),
         ) (T, error) {
             var result T
             var err error
             for attempts := 0; attempts < maxAttempts; attempts++ {
                 isRetry := attempts > 0

                 // The first attempt runs immediately. Every subsequent
                 // attempt waits for an exponentially increasing backoff based
                 // on the error returned by the previous attempt, with jitter.
                 if isRetry {
                     // Prefer the base backoff supplied by the server over the
                     // client's default, if there is one.
                     base := baseBackoff
                     if serverBase := serverBaseBackoff(err); serverBase > 0 {
                         base = serverBase
                     }

                     sleep := time.NewTimer(jitterDuration(overloadBackoff(base, attempts)))
                     select {
                     case <-ctx.Done():
                         sleep.Stop()
                         if err == nil {
                             err = ctx.Err()
                         }
                         return result, err
                     case <-sleep.C:
                     }
                 }

                 result, err = fn(ctx)
                 if err == nil {
                     break
                 }
                 if !isSystemOverloadedError(err) {
                     break
                 }
                 var lerr mongo.LabeledError
                 if !errors.As(err, &lerr) || !lerr.HasErrorLabel(errRetryableError) {
                     break
                 }
             }
             return result, err
         }

   .. step:: Use the retry helper for collection operations

      Call the retrier from your application code. Wrap individual
      operations, such as ``Find()`` or ``InsertOne()`` calls, with the
      ``executeWithRetries()`` function so that MongoDB retries overload
      errors with backoff and surfaces all other errors immediately.

      For example, the following operation fetches all users from the
      ``users`` collection:

      .. code-block:: go

         ctx := context.Background()
         client, _ := mongo.Connect(ctx)
         coll := client.Database("db").Collection("coll")

         cursor, err := coll.Find(ctx, bson.D{})
         if err != nil {
             log.Fatal(err)
         }
         var users []bson.D
         if err = cursor.All(ctx, &users); err != nil {
             log.Fatal(err)
         }

      The following code then executes this operation with retry logic:

      .. code-block:: go

         const defaultMaxAttempts = 2

         users, err = executeWithRetries(ctx, defaultMaxAttempts, func(ctx context.Context) ([]bson.D, error) {
             cursor, err := coll.Find(ctx, bson.D{})
             if err != nil {
                 return nil, err
             }
             var res []bson.D
             err = cursor.All(ctx, &res)
             return res, err
         })
         if err != nil {
             log.Fatalf("Unhandled error: %v", err)
         }
         fmt.Printf("found %v\n", users)
