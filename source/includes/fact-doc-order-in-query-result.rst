By default, {+adl+} does not return documents in any specific order 
for queries on {+dl+}s for |s3| data stores. {+adl+} reads the 
partitions concurrently and the underlying storage response order 
determines which documents {+adl+} returns first, unless you define 
order using :pipeline:`$sort` in your query. For example, if you run 
the same ``findOne()`` query twice, you could see different documents, 
and if you use :pipeline:`$skip`, different documents might be skipped 
if :pipeline:`$sort` is not used in the query.
