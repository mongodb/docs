- Set :manual:`maxIdleTimeMS 
  </reference/connection-string/#mongodb-urioption-urioption.maxIdleTimeMS>` 
  to ``60000`` to automatically close your connections after 1 minute 
  of idle time. Tuning your ``maxIdleTimeMS`` can help reduce the 
  occurrence of timeout errors from your serverless functions.