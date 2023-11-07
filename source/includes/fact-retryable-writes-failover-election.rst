Your application connection logic should include tolerance for automatic
failovers and the subsequent elections. MongoDB drivers
can detect the loss of the primary and automatically 
:ref:`retry certain write operations <retryable-writes>` a single time, 
providing additional built-in handling of automatic failovers and elections:

Compatible drivers enable retryable writes by default

