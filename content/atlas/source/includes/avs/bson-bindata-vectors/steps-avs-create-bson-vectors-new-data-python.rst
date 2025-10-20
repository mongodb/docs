Procedure
~~~~~~~~~

Create an interactive Python notebook by saving a file with
the ``.ipynb`` extension, and then perform the following
steps in the notebook. To try the example, replace the
placeholders with valid values.

..
 NOTE: If you edit the Python code in this section, you must update the Jupyter Notebook
 at https://github.com/mongodb/docs-notebooks/blob/main/quantization/existing-data.ipynb 

.. cta-banner::
   :url: https://github.com/mongodb/docs-notebookblob/main/quantization/new-data.ipynb
   :icon: Code

   Work with a runnable version of this tutorial as a :github:`Python notebook <mongodb/docs-notebooks/blob/main/quantization/new-data.ipynb>`.

.. procedure:: 
   :style: normal 

   .. include:: /includes/avs/bson-bindata-vectors/steps-shared-python.rst 

   .. step:: Load the data for which you want to generate |bson| vectors in your notebook.

      For this example, use the sample sentences in the following code.

      .. literalinclude:: /includes/avs/bson-bindata-vectors/python/sample-data.py
         :copyable: true 
         :language: python 
         :linenos:

   .. step:: Generate and convert the embeddings.

      In this step, you generate embeddings for the sample data and then
      convert the embeddings to |bson| vectors by using the
      ``generate_embeddings`` and ``generate_bson_vector`` functions
      respectively.  

      a. Generate the embeddings using Voyage AI.

         This step is required if you haven't yet generated embeddings 
         from your data. If you've already generated embeddings, skip this 
         step. To learn more about generating embeddings from your data, see 
         :ref:`create-vector-embeddings`.

         Copy, paste, and run the sample code below after replacing the
         following placeholder values (highlighted in the code):
         
         .. list-table:: 
            :widths: 30 70 
            :header-rows: 1           

            * - Placeholder 
              - Valid Value 

            * - ``<EMBEDDING-MODEL>``
              - Embedding model to use for generating the embeddings. For
                this example, specify ``voyage-3-large``. 

            * - ``<NUMBER-OF-DIMENSIONS>``
              - Number of dimensions for the resulting output embeddings.
                For this example, specify ``1024``.

         .. literalinclude:: /includes/avs/bson-bindata-vectors/python/generate-embeddings-new-data.py 
            :copyable: true
            :language: python 
            :linenos: 
            :emphasize-lines: 2-3

      #. Convert the embeddings to |bson| vectors.

         Copy, paste, and run the following code:

         .. literalinclude:: /includes/avs/bson-bindata-vectors/python/convert-embeddings.py 
            :copyable: true 
            :language: python 
            :linenos:
      
   .. step:: Create documents and load to your cluster.

      You can load your data from the {+atlas-ui+} and programmatically. 
      To learn how to load your data from the {+atlas-ui+}, see
      :ref:`Insert Your Data <gswa-insert-data>`. 

      a. Create documents from the sample data and embeddings.

         Copy, paste, and run the sample code below after replacing the
         following placeholder values (highlighted in the code): 

         .. list-table:: 
            :widths: 30 70 
            :header-rows: 1

            * - Placeholder 
              - Valid Value 

            * - ``<FIELD-NAME-FOR-FLOAT32-TYPE>``
              - Name of field with ``float32`` values.

            * - ``<FIELD-NAME-FOR-INT8-TYPE>``
              - Name of field with ``int8`` values.

            * - ``<FIELD-NAME-FOR-INT1-TYPE>``
              - Name of field with ``int1`` values.

            * - ``<TEXT-FIELD-NAME>`` 
              - Name of the field where you want to store the text data.

         .. literalinclude:: /includes/avs/bson-bindata-vectors/python/create_new_docs_with_bson_vectors.py
            :copyable: true 
            :language: python 
            :linenos:
            :emphasize-lines: 2-4, 13

      #. Load your data into your cluster.

         Copy, paste, and run the sample code below after replacing the
         following placeholder values (highlighted in the code): 

         .. list-table:: 
            :widths: 30 70 
            :header-rows: 1

            * - Placeholder 
              - Valid Value 

            * - ``<CONNECTION-STRING>``
              - Cluster connection string. To learn more, see
                :ref:`connect-via-driver`.

            * - ``<DATABASE-NAME>``
              - Name of the database. 

            * - ``<COLLECTION-NAME>``
              - Name of the collection in the specified database.  

         .. literalinclude:: /includes/avs/bson-bindata-vectors/python/load-new-data.py 
            :language: python 
            :copyable: true
            :linenos:
            :emphasize-lines: 3, 5-6

   .. step:: Create the {+avs+} index on the collection.

      You can create {+avs+} indexes by using the {+atlas-ui+},
      {+atlas-cli+}, {+atlas-admin-api+}, and MongoDB drivers. To learn
      more, see :ref:`avs-types-vector-search`. 

      Copy, paste, and run the sample code below after replacing the
      following placeholder value (highlighted in the code): 

      .. list-table:: 
         :widths: 30 70 
         :header-rows: 1

         * - Placeholder 
           - Valid Value 

         * - ``<INDEX-NAME>``
           - Name of ``vector`` type index. 
            
      .. io-code-block::  
         :copyable: true 

         .. input:: /includes/avs/bson-bindata-vectors/python/create-index-new-data.py
            :language: python 
            :linenos:
            :emphasize-lines: 5

         .. output:: 
            :language: shell 
            :visible: false

            New search index named <INDEX-NAME> is building.
            Polling to check if the index is ready. This may take up to a minute.
            <INDEX-NAME> is ready for querying.

   .. step:: Run {+avs+} queries on the collection. 

      a. Define a function to run a vector search query.

         The function to run {+avs+} queries performs the following
         actions:
         
         - Generates embeddings using Voyage AI for the query text.
         - Converts the embeddings to |bson| vectors. 
         - Defines the aggregation pipeline for the vector search.
         - Runs the aggregation pipeline and returns the results.

         Copy, paste, and run the sample code below after replacing the
         following placeholder values (highlighted in the code):

         .. list-table:: 
            :widths: 30 70 
            :header-rows: 1

            * - Placeholder 
              - Valid Value 

            * - ``<NUMBER-OF-CANDIDATES-TO-CONSIDER>`` 
              - Number of nearest neighbors to use during the search.
                For this example, specify ``5``.

            * - ``<NUMBER-OF-DOCUMENTS-TO-RETURN>`` 
              - Number of documents to return in the results. For this
                example, specify ``2``.

            * - ``<EMBEDDING-MODEL>`` 
              - Embedding model to use for generating the embeddings. For
                this example, specify ``voyage-3-large``.

            * - ``<TEXT-FIELD-NAME>`` 
              - Name of the field that contains the text data.

         .. literalinclude:: /includes/avs/bson-bindata-vectors/python/query-function.py 
            :copyable: true 
            :language: python 
            :linenos: 
            :emphasize-lines: 37-38, 22, 44

      #. Run the {+avs+} query.

         Copy, paste, and run the sample code below after replacing the
         following placeholder value as highlighted in the code: 

         .. list-table:: 
            :widths: 30 70 
            :header-rows: 1

            * - Placeholder 
              - Valid Value 

            * - ``<QUERY-TEXT>`` 
              - Text string for which to retrieve semantically similar
                documents. For this example, specify ``science fact``.

         .. io-code-block:: 
            :copyable: true 
            
            .. input:: /includes/avs/bson-bindata-vectors/python/run-query.py 
               :language: python 
               :linenos:
               :emphasize-lines: 8

            .. output:: 
               :language: shell 

               Results from float32-embeddings embeddings
               [{'data': 'The Great Wall of China is visible from space.',
               'score': 0.7810189723968506},
               {'data': 'Mount Everest is the highest peak on Earth at 8,848m.',
               'score': 0.7339795827865601}]
               Results from int8-embeddings embeddings
               [{'data': 'The Great Wall of China is visible from space.',
               'score': 0.5053843259811401},
               {'data': 'Mount Everest is the highest peak on Earth at 8,848m.',
               'score': 0.5043729543685913}]
               Results from int1-embeddings embeddings
               [{'data': 'The Great Wall of China is visible from space.', 'score': 0.6640625},
               {'data': 'Mount Everest is the highest peak on Earth at 8,848m.',
               'score': 0.6220703125}]

         To learn more about {+avs+} queries, see :ref:`return-vector-search-results`. 
