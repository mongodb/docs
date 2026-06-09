A hybrid search is an aggregation of different search methods, such
as a full-text and semantic search, for the same query criteria. While
full-text is effective in finding exact matches for query terms,
semantic search provides the added benefit of identifying semantically
similar documents even if the documents don't contain the exact query
term. This ensures that synonymous and contextually similar matches are
also included in the combined results of both methods of search.

Conversely, if you have tokens for proper nouns or specific keywords in
your dataset that you don't expect to be considered in the training of
an embedding model in the same context that they are used in your
dataset, your vector search might benefit from being combined with a
full-text search.

You can also set weights for each method of search per query. Based on
whether full-text or semantic search results are most relevant and
appropriate for a query, you can increase the weight for that search
method per query.
