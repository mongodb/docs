The following query uses the :pipeline:`$rerank` stage to 
return movies that are most relevant to the query for *martial 
arts* using the ``rerank-2.5`` model. The query *prioritizes 
films about martial arts training and tournaments*. It uses the 
following pipeline stages:

.. list-table:: 
   :widths: 30 70
   :header-rows: 1

   * - Pipeline Stage
     - Description

   * - :pipeline:`$match`
     - Filters the documents to include only documents that have a 
       ``fullplot`` field of type string.

   * - :pipeline:`$sort`
     - Sorts the documents in descending order of the ``released`` field to 
       ensure deterministic ordering.

   * - :pipeline:`$rerank`
     - Reorders the documents to match the query using the ``rerank-2.5`` 
       reranker model. The ``numDocsToRerank`` parameter specifies the maximum 
       number of documents to consider for reranking. The ``path`` parameter specifies the 
       field to use for reranking.

   * - :pipeline:`$addFields`
     - Adds a field named ``rerankScore`` to the documents.

   * - :pipeline:`$limit`
     - Limits the output to 10 documents.

   * - :pipeline:`$project`
     - Excludes all fields except ``title``, ``fullplot``, and
       ``rerankScore`` from the documents in the results.
