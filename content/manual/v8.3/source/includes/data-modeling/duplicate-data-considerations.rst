Before you duplicate data, consider the following factors:

- The performance benefit for reads when data is duplicated. Duplicating
  data can remove the need to perform joins across multiple collections,
  which can improve application performance.

- How often the duplicated data needs to be updated. The extra logic needed to 
  handle infrequent updates is less costly than performing joins (lookups) on 
  read operations. However, frequently updating duplicate data can cause heavy 
  workloads and performance issues. 
