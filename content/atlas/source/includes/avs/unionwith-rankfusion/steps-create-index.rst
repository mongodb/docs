.. procedure:: 
   :style: normal

   .. step:: Connect to the cluster using {+mongosh+}.

      Open {+mongosh+} in a terminal window and connect to your |service|
      {+cluster+}. For detailed instructions on connecting, see
      :ref:`Connect via mongosh <connect-mongo-shell>`.

   .. step:: Switch to the database that contains the collection for which you want to create the index. 

      .. example:: 

        .. io-code-block:: 
           :copyable: true 

           .. input:: 
              :language: shell
                
              use sample_mflix 

           .. output:: 
              :language: shell 

              switched to db sample_mflix

   .. step:: Run the ``db.collection.createSearchIndex()`` method.

      .. literalinclude:: /includes/avs/unionwith-rankfusion/index-definition.sh
         :language: shell
         :copyable: true 
         :linenos:

      This index definition indexes the following fields:

      - ``plot_embedding`` field as the ``vector`` :ref:`type <avs-types-vector>`. 
        This field contains :term:`vector embeddings` that represent the summary of a 
        movie's plot. The index definition:
            
        - Specifies ``1536`` :term:`vector dimensions <vector>`.
        - Measures :ref:`similarity <avs-similarity-functions>` using ``dotProduct`` similarity.

        This field mapping is required for the :ref:`third use case <avs-unionwith-use-cases>`.

      - ``plot_embedding_voyage_3_large`` field as the ``vector`` :ref:`type <avs-types-vector>`. 
        This field contains :term:`vector embeddings` that represent the summary of a 
        movie's plot. The index definition:
            
        - Specifies ``2048`` :term:`vector dimensions <vector>`.
        - Measures :ref:`similarity <avs-similarity-functions>` using ``dotProduct`` similarity.

        This field mapping is required all the queries in this tutorial. 

      - ``title_voyageai_embedding`` field as the ``vector`` :ref:`type <avs-types-vector>`. 
        This field contains :term:`vector embeddings` that represent the
        title of the movie. The index definition:
            
        - Specifies ``2048`` :term:`vector dimensions <vector>`.
        - Measures :ref:`similarity <avs-similarity-functions>` using ``dotProduct`` similarity.

        This field mapping is required for the :ref:`second use case <avs-unionwith-use-cases>`.
