You incur "Data Processed" costs for the amount of data that 
{+adl+} processes to return results for your queries in addition to the 
"Data Returned" cost for the amount of data that {+adl+} returns. For 
example, for a 10 GB file, you incur the following "Data 
Processed" cost in addition to the "Data Returned" cost: 

- If you have no partitions, {+adl+} reads the entire file to return  
  results for the query. Therefore, you incur 10 GB of "Data 
  Processed" cost.
- If you have 10 partitions of 1 GB each, {+adl+} targets and reads a 
  single partition. Therefore, you incur 1 GB of "Data Processed" cost.
