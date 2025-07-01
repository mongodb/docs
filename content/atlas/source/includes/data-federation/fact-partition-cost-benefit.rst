You incur "Data Processed" costs for the amount of data that 
{+adf+} processes to return results for your queries in addition to the 
"Data Returned" cost for the amount of data that {+adf+} returns. For 
example, for a 10 GB file, you incur the following "Data 
Processed" cost in addition to the "Data Returned" cost: 

- If you have no partitions, {+adf+} reads the entire file to return  
  results for the query. Therefore, you incur 10 GB of "Data 
  Processed" cost.
- If you have 10 partitions of 1 GB each, {+adf+} targets and reads a 
  single partition. Therefore, you incur 1 GB of "Data Processed" cost.

You can configure :ref:`query limits <adf-manage-query-limits>` per
{+fdi+} and for all {+fdi+}\s in your project to limit the amount of
:ref:`processed data <atlas-data-federation-billing>`. To learn more,
see :ref:`adf-manage-query-limits`.
