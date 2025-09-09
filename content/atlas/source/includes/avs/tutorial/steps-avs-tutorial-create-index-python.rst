.. procedure:: 
   :style: normal 

   .. step:: Add the PyMongo Driver to your project.

      Add the PyMongo Driver as a dependency in your project:

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebooks
         at https://github.com/mongodb/docs-notebooks/blob/main/run-queries/semantic-search-and-or-filter.ipynb
         and https://github.com/mongodb/docs-notebooks/blob/main/run-queries/semantic-search-and-filter.ipynb

      .. code-block:: sh

         pip install pymongo

   .. step:: Define the index.

      Create a file named ``vector-index.py`` and copy and paste the
      following code into the file.

      This index definition indexes the
      ``plot_embedding_voyage_3_large`` field as the ``vector`` type and
      the ``genres`` and ``year`` fields as the ``filter`` type in an
      {+avs+} index. The ``plot_embedding_voyage_3_large`` field
      contains embeddings created using |voyage|'s ``voyage-3-large``
      embedding model. The index definition specifies ``2048`` vector
      dimensions, measures similarity using ``dotProduct`` function, and
      enables automatic ``scalar`` quantization for efficient processing
      of your vectors.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebooks
         at https://github.com/mongodb/docs-notebooks/blob/main/use-cases/rag.ipynb
         and https://github.com/mongodb/docs-notebooks/blob/main/run-queries/semantic-search-and-or-filter.ipynb
         and https://github.com/mongodb/docs-notebooks/blob/main/run-queries/semantic-search-and-filter.ipynb

      .. literalinclude:: /includes/avs/index-management/create-index/filter-example.py
         :language: python
         :copyable: true
         :caption: vector-index.py
         :emphasize-lines: 6
         :linenos:

   .. step:: Replace the ``<connection-string>`` in the code and then save the file.

      .. include:: /includes/search-shared/find-connection-string.rst
       
   .. step:: Run the following command to create the index.

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: shell 

            python vector-index.py

         .. output::
            :language: shell

            vector_index
