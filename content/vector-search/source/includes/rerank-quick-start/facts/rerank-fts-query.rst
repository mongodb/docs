The following query uses the :pipeline:`$search` stage to perform a full-text 
search for the query text *martial arts*. The query then uses the 
:pipeline:`$rerank` stage to reorder the documents to *prioritize movie plots 
about martial arts competition and training*. It uses the following pipeline 
stages:

.. list-table:: 
   :widths: 30 70
   :header-rows: 1

   * - Pipeline Stage
     - Description

   * - :pipeline:`$search`
     - Performs a full-text search for the query text *martial arts*.

   * - :pipeline:`$limit`
     - Limits the output of the :pipeline:`$search` stage to 100 documents.

   * - :pipeline:`$project`
     - Excludes all fields except ``title``, ``fullplot``, and
       ``searchScore`` from the documents in the results.

   * - :pipeline:`$match`
     - Filters the documents to include only documents that have a 
       ``fullplot`` field of type string.

   * - :pipeline:`$rerank`
     - Reorders the documents to match the query using the ``rerank-2.5`` 
       reranker model. The ``numDocsToRerank`` parameter specifies the maximum 
       number of documents to rerank. The ``path`` parameter specifies the 
       field to use for reranking.

   * - :pipeline:`$addFields`
     - Adds a field named ``rerankScore`` to the documents.

   * - :pipeline:`$limit`
     - Limits the output to 10 documents.

   * - :pipeline:`$project`
     - Excludes all fields except ``title``, ``fullplot``, and
       ``rerankScore`` from the documents in the results.