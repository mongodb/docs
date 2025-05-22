If you are using a three-member primary-secondary-arbiter (PSA) 
architecture, consider the following: 

- The write concern :writeconcern:`"majority"` can cause
  performance issues if a secondary is unavailable or lagging. For 
  advice on how to mitigate these issues, see 
  :ref:`performance-issues-psa`.

- If you are using a global default :readconcern:`"majority"` 
  and the write concern is less than the size of the majority,
  your queries may return stale (not fully replicated) data.