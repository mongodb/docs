.. :snippet-start: fact-overload-protection-errors
.. :snippet-output: content/vector-search/source/includes/performance/overload/

When |service| rejects a query because the admission control queue is
full, the query fails with the following error:

.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Field
     - Value

   * - Error code
     - ``489``

   * - Code name
     - ``SearchRequestRejectedDueToOverload``

   * - Error label
     - ``SystemOverloadedError``

Every version that supports Search Load Shedding returns this
same error, so your application can rely on a single error contract.

.. important:: Rejected Queries Aren't Retryable

   The ``489`` error doesn't carry the ``RetryableError`` label.
   Neither the MongoDB drivers nor ``mongod`` retry a rejected query
   automatically. Your application must decide how to respond.

A rejection means that the search process is already saturated.
Retrying immediately adds load to a process that can't absorb it,
which extends the overload and increases the number of rejections. To
respond to a ``489`` error, apply the following practices:

- Catch the ``SystemOverloadedError`` label rather than matching on
  the error message text.

- Wait before you send the query again. Use exponential backoff with
  jitter so that concurrent clients don't retry in step with each
  other.

- Cap the number of attempts. Surface a degraded result or an error to
  the end user rather than retrying indefinitely.

- Reduce the rate at which your application sends search queries while
  rejections persist. Lowering client concurrency shortens the
  overload.

- Treat sustained rejections as a capacity signal rather than a
  transient fault, and scale or optimize your search workload.

.. :snippet-end:
