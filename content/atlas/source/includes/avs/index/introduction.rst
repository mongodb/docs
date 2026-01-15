You can use the ``vectorSearch`` type to index fields for running 
:pipeline:`$vectorSearch` queries. You can define the index for the
vector embeddings in your data that you want to query and any additional
fields in your collection that you want to use to :ref:`pre-filter
<avs-types-filter>` your data. Filtering your data is useful to narrow
the scope of your semantic search and ensure that certain vector
embeddings are not considered for comparison, such as in a multi-tenant
environment. 

.. note:: 

   You can't use the :pipeline:`$search` :ref:`vectorSearch
   <fts-vectorSearch-ref>` or the deprecated :ref:`knnBeta <knn-beta-ref>`
   operator to query fields indexed using the ``vectorSearch`` type
   index definition.