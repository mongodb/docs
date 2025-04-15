On :ref:`separate Search Nodes <configure-search-nodes>`, 
each node assigns documents different internal Lucene IDs 
used for sorting when scores are identical. 
When sorting and :ref:`paginating <fts-paginate-results>` results, 
the ``mongot`` process on the node that is processing the query
might include documents from other nodes if their internal IDs have
greater pagination order than the token. 
To prevent this, use :pipeline:`$match` after :pipeline:`$search` 
to exclude documents by their ``_id``.
