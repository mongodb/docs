Your application connection logic should include tolerance for 
elections, such as queueing write operations until it detects a healthy 
primary.

.. versionadded:: 3.6

   MongoDB 3.6+ drivers can detect the loss of the primary and 
   automatically :ref:`retry certain write operations 
   <retryable-writes>` a single time, providing additional built-in 
   handling of elections. 