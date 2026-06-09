Consider Query Operators and Query Complexity
---------------------------------------------

The complexity level of |fts| queries and the type of :ref:`operators
<fts-operators>` used can affect database performance for the node
that ``mongot`` runs on.

Highly complex queries, such as queries with multiple clauses that use
the :ref:`compound <compound-ref>` operator, or queries which use
the :ref:`regex <regex-ref>` (regular expression) or the :ref:`wildcard <wildcard-ref>`
operator, are resource-intensive.

Compound Queries 
~~~~~~~~~~~~~~~~

If your query includes multiple nested :ref:`compound <compound-ref>` statements,
ensure that these are not redundant. If the clauses are added
programmatically, consider implementing the logic in the application to
avoid inclusion of redundant clauses in the queries. Every score
calculation per field that ``mongot`` performs, such as for the ``must``
and ``should`` clauses, increases execution time.  To optimize performance, 
place non-scoring operators such as :ref:`equals <equals-ref>`, 
:ref:`range <range-ref>`, and :ref:`in <in-ref>` in the :data:`filter` clause 
to avoid unnecessary scoring operations. 

Faceted Search 
~~~~~~~~~~~~~~

You can use the |fts| :ref:`fts-facet-ref` collector to extract
metadata and avoid running multiple queries for search results and 
metadata. You can use ``$search.facet`` to retrieve both documents 
and metadata in a single query. If you only need metadata, 
use ``$searchMeta.facet`` to avoid document lookup. For an example, 
see the :ref:`Metadata and Search Results example <fts-facet-egs>`. 