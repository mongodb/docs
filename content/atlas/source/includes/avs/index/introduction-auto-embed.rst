You can configure {+avs+} to automatically generate and manage vector
embeddings for the text data in your collection and run
:pipeline:`$vectorSearch` queries against the generated embeddings.
You can create a {+avs+} index with type ``autoEmbed`` and choose from 
available |voyage| embedding models to generate embeddings, simplifying 
indexing, updating, and querying with vectors. 

When you configure Automated Embedding, {+avs+} automatically
generates embeddings using the specified embedding model at index-time
for the specified text field in your collection, during updates, and at
query-time for your query text against the field indexed for automated
embeddings. {+avs+} uses the |voyage| |api| key that you specified
during deployment to generate the embeddings.

You can also index additional fields in your collection for
:ref:`pre-filtering <avs-types-filter>` your data. Filtering your data 
is useful to narrow the scope of your semantic search and ensure that
certain vector embeddings are not considered for comparison.
 