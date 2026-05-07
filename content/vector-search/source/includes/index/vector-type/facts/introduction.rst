To run :pipeline:`$vectorSearch` queries against data in your cluster, you must 
create a ``vectorSearch`` type index on each collection that you want to query. 
You can configure the following types for each field that you index in a 
``vectorSearch`` index:

- ``vector`` type to index a field containing vector embeddings that capture the 
  semantic meaning of the text data that you want to query. 
- ``filter`` type to index a field for pre-filtering your data. Filtering your 
  data is useful to narrow the scope of your semantic search, such as in a 
  multi-tenant environment.

.. note:: 

   You can't use the :pipeline:`$search` stage, :ref:`vectorSearch
   <fts-vectorSearch-ref>` operator, or the deprecated :ref:`knnBeta <knn-beta-ref>`
   operator to query fields indexed using the ``vectorSearch`` type
   index definition.