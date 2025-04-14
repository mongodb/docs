Generally, :ref:`TTL (Time To Live) indexes <index-feature-ttl>` offer
better performance and more flexibility than capped collections. TTL
indexes expire and remove data from normal collections based on the
value of a date-typed field and a TTL value for the index.

Capped collections serialize inserts and therefore have worse concurrent
insert performance than non-capped collections. Before you create a
capped collection, consider if you can use a TTL index instead. 
