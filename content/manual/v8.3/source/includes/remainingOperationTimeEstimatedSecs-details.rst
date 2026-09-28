``remainingOperationTimeEstimatedSecs``: estimated time remaining in
seconds for the current :ref:`resharding operation
<sharding-resharding>`. It is returned as ``-1`` when a new resharding
operation starts.

Starting in MongoDB 7.0, ``remainingOperationTimeEstimatedSecs`` is also 
available on the coordinator during a resharding operation. 

``remainingOperationTimeEstimatedSecs`` 
is set to a pessimistic time estimate:

- The catch-up phase time estimate is set to the clone phase time, which 
  is a relatively long time.
- In practice, if there are only a few pending write operations, the 
  actual catch-up phase time is relatively short.

