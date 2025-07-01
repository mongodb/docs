For indexes created on views, |product-name| applies the transformations
or filters that you define in the view pipeline at query-time and at
replication-time. While trivial transformations or filters in the view
pipeline typically result in negligible performance impact, complex
transformations or highly selective filters in the view pipeline might
significantly slow down querying or replication. If you want to perform
a heavy transformation on the documents or apply a highly selective
filter, consider creating a materialized view with already transformed
or filtered documents. You can evaluate view performance by comparing
query latency executed against the view and against its source collection. 