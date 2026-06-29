The following query uses the :pipeline:`$vectorSearch` stage to 
match movies that are most relevant to the query for *martial 
arts*. The query then uses the :pipeline:`$rerank` stage to 
reorder the documents to *focus on combat styles and fight 
choreography*. It uses the following pipeline stages:

.. list-table:: 
   :widths: 30 70
   :header-rows: 1

   * - Pipeline Stage
     - Description

   * - :pipeline:`$vectorSearch`
     - Performs a vector search for the query text *martial arts* using the 
       ``voyage-4-large`` embedding model. The ``numCandidates`` parameter 
       specifies the maximum number of documents to consider for reranking.

   * - :pipeline:`$project`
     - Excludes all fields except ``title``, ``fullplot``, and
       ``vectorScore`` from the documents in the results.

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