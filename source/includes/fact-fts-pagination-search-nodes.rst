On :ref:`separate Search Nodes <configure-search-nodes>`, each node has
its own copy of a document with a different internal ID that Lucene uses
to sort the results when multiple documents have identical scores. If
the internal ID of the document on a node that isn't processing the
query has a greater pagination order than the pagination token, the 
``mongot`` on the node that is processing the query might include it in
the results if you sort and :ref:`paginate <fts-paginate-results>` the
results. To mitigate this, use :pipeline:`$match` after
:pipeline:`$search` to exclude the document by its ``_id``.