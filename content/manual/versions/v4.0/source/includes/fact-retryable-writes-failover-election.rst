Your application connection logic should include tolerance for 
automatic failovers and the subsequent elections.

.. versionadded:: 3.6

   MongoDB 3.6+ drivers can detect the loss of the primary and 
   automatically :ref:`retry certain write operations 
   <retryable-writes>` a single time, providing additional built-in 
   handling of automatic failovers and elections. 