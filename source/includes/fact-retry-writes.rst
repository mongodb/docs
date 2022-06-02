.. note:: Retryable Writes with MongoDB 3.6 and later

   MongoDB drivers can automatically retry certain write
   operations once. Retryable writes provide built-in handling
   of automatic failovers and elections. To learn more, See
   :manual:`retryable writes </core/retryable-writes/>`.
 
   To enable this feature, add
   :manual:`retryWrites=true </reference/connection-string/#urioption.retryWrites>`
   to your |service| URI connection string. To learn more, see
   :doc:`/driver-connection`.