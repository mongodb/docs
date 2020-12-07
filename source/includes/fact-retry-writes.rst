.. note:: Retryable Writes with MongoDB 3.6

   MongoDB 3.6+ drivers can automatically retry certain write 
   operations a single time. Retryable writes provide built-in handling 
   of automatic failovers and elections. The cluster must run MongoDB 
   3.6 or greater to support retryable writes. See 
   :manual:`retryable writes </core/retryable-writes/>` for complete 
   documentation and requirements. 
 
   To enable this feature, add
   :manual:`retryWrites=true </reference/connection-string/#urioption.retryWrites>`
   to your |service| URI connection string. See 
   :doc:`/driver-connection` for details on connecting to a |service| 
   cluster using a URI connection string.