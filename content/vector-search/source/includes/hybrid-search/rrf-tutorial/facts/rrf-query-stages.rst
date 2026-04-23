The sample query uses the ``$rankFusion`` stage to execute the
semantic and full text queries independently and then de-duplicate and
combine the input query results into a final ranked results set. It
returns a ranked set of documents based on the ranks that appear in
their input pipelines and the pipeline weights. Specifically, this stage
takes the following input pipelines:

.. list-table:: 
   :widths: 30 70 

   * - ``vectorPipeline``  
     - This pipeline contains the :pipeline:`$vectorSearch` query. It
       searches the ``plot_embedding_voyage_3_large`` field for the
       string *star wars* specified as vector embeddings in the
       ``queryVector`` field of the query. The query uses the
       ``voyage-3-large`` embedding model from |voyage|, which is the 
       same model used for the embeddings in the
       ``plot_embedding_voyage_3_large`` field. The query also specifies a search for up to ``100``
       nearest neighbors and limit the results to ``20`` documents
       only. This stage returns the sorted documents from the semantic
       search in the results.

   * - ``fullTextPipeline``  
     - This pipeline contains the following stages: 
      
       - :pipeline:`$search` to search for movies that contain the term
         ``star wars`` in the ``title`` field. This stage returns the
         sorted documents from the full-text search in the results. 
       - :pipeline:`$limit` to limit the output of :pipeline:`$search`
         stage to ``20`` results only. 

The sample query uses the following stages to combine the results of the
semantic and text search and return a single ranked list of documents in
the results:

.. list-table:: 
   :widths: 30 70 

   * - :pipeline:`$project` 
     - Includes only the following fields in the results:  

       - ``_id`` 
       - ``title`` 
       - ``plot``
       - ``scoreDetails``
    
   * - :pipeline:`$limit` 
     - Limits the output to ``10`` results only.
