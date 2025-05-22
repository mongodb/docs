If you specify a :writeconcern:`"majority"` write concern for single-document 
and multi-document writes and the operation does not replicate to the 
:ref:`calculated majority<calculating-majority-count>` of :term:`replica set` 
members before it returns a response, then the data eventually 
replicates or rolls back. See :ref:`wc-wtimeout`.