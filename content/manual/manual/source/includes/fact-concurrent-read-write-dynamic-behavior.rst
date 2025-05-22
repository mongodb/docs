.. note::

   Starting in version 7.0, MongoDB dynamically adjusts the number of 
   tickets to optimize performance, with a highest possible value of 128.

   Modifying this value can cause performance issues or errors. To 
   determine if disabling the dynamic concurrent storage engine 
   transactions algorithm is optimal for the cluster, contact 
   `MongoDB Support <https://www.mongodb.com/docs/manual/support/>`__.