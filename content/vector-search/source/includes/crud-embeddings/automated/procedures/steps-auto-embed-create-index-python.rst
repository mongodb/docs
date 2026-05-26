.. procedure:: 
   :style: normal

   .. step:: Create a ``.py`` file.

      .. code-block:: javascript 

         touch <file-name>.py

      .. example:: 

         For example, create a file named ``create_index.py``.

         .. code-block:: javascript

            touch create_index.py

   .. step:: Define the index in the ``.py`` file.

      .. literalinclude:: /includes/crud-embeddings/automated/code-snippets/python/index-syntax.py
         :language: python
         :linenos:

      .. example:: 

         For example, to create an index that enables automated
         embeddings by using the ``voyage-3-large`` model for the
         ``fullplot`` field in the ``sample_mflix.movies``
         namespace, copy and paste the following in the
         ``create_index.py`` file:

         .. literalinclude:: /includes/crud-embeddings/automated/code-snippets/python/index-example.py
            :language: python
            :linenos:

   .. step:: Replace the following values and save the file.

      .. list-table:: 
         :widths: 25 75

         * - ``<CONNECTION-STRING>``
           - The connection string for your Atlas cluster.
         * - ``<database-name>``
           - The name of the database that contains the collection
             for which you want to create the index.
         * - ``<collection-name>``
           - The name of the collection for which you want to
             create the index.
         * - ``<field-name>``
           - The name of the field in the collection that you want
             to index for Automated Embedding.
         * - ``<index-name>``
           - The name of the index that you want to create.

   .. step:: Run the following command to create the index.

      .. code-block:: javascript 
           
         python <file-name>.py
    
      .. example:: 

         For example, to create the index defined in the
         ``create_index.py`` file, run the following command in
         your terminal:

         .. code-block:: javascript 

            python create_index.py
