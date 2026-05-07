To run :pipeline:`$vectorSearch` queries against data in your cluster, you must 
create a ``vectorSearch`` type index on each collection that you want to query. 
You can configure the following types for each field that you index in a 
``vectorSearch`` index:

- ``autoEmbed`` type to index a text field for which you want {+avs+} to
  automatically generate vector embeddings using |voyage| models. 
- ``filter`` type to index a field for pre-filtering your data. Filtering your 
  data is useful to narrow the scope of your semantic search, such as in a 
  multi-tenant environment.