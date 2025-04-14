Your application connection logic should include tolerance for automatic
failovers and the subsequent elections. Starting in MongoDB 3.6, MongoDB drivers
can detect the loss of the primary and automatically 
:ref:`retry certain write operations <retryable-writes>` a single time, 
providing additional built-in handling of automatic failovers and elections:

- MongoDB 4.2+ compatible drivers enable retryable writes by default

- MongoDB 4.0 and 3.6-compatible drivers must explicitly enable
  retryable writes by including :urioption:`retryWrites=true <retryWrites>` in the :ref:`connection string <mongodb-uri>`.