.. note::

   Data partitioning doesn't guarantee reduced data processing cost. 
   For example, if you run a blank :pipeline:`$match` query, which 
   queries all the data, {+adf+} needs to read the entire collection to 
   return the results for the query regardless of the number of 
   partitions.
