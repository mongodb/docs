``remainingOperationTimeEstimatedSecs``: estimated time remaining in
seconds for the current :ref:`resharding operation
<sharding-resharding>`. It is returned as ``-1`` when a new resharding
operation starts.

Starting in:

- MongoDB 5.0, but before MongoDB 6.1,
  ``remainingOperationTimeEstimatedSecs`` is only available on a
  :ref:`recipient shard <resharding-process-details>` during a
  resharding operation.
- MongoDB 6.1, ``remainingOperationTimeEstimatedSecs`` is also available
  on the coordinator during a resharding operation.

The resharding operation performs these phases in order:

#. The clone phase duplicates the current collection data.
#. The catch-up phase applies any pending write operations to the
   resharded collection.

``remainingOperationTimeEstimatedSecs`` is set to a pessimistic time
estimate:

- The catch-up phase time estimate is set to the clone phase time, which
  is a relatively long time.
- In practice, if there are only a few pending write operations, the
  actual catch-up phase time is relatively short.
