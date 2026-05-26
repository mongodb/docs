.. procedure:: 
   :style: normal 

   .. step:: Initialize your Node.js project.

      Run the following commands in your terminal 
      to create a new directory named ``auto-embeddings-project`` and
      initialize your project:

      .. code-block:: javascript

         mkdir auto-embeddings-project
         cd auto-embeddings-project
         npm init -y

   .. step:: Create the ``.js`` file. 
      
      .. code-block:: javascript 

         touch <file-name>.js

      .. example:: 

         For example, create a file named ``create_index.js``.

         .. code-block:: javascript

            touch create_index.js

   .. step:: Define the index in the ``.js`` file.
      
      .. literalinclude:: /includes/crud-embeddings/automated/code-snippets/index-syntax.js
         :language: javascript
         :linenos:

      .. example:: 

         For example, to create an index that enables automated
         embeddings by using the ``voyage-3-large`` model for the
         ``fullplot`` field in the ``sample_mflix.movies``
         namespace, copy and paste the following in the
         ``create_index.js`` file:

         .. literalinclude:: /includes/crud-embeddings/automated/code-snippets/nodejs/index-example.js
            :language: javascript
            :linenos:

   .. step:: Replace the following values and save the file.

      .. list-table:: 
         :widths: 25 75

         * - ``<CONNECTION-STRING>``
           - The connection string for your Atlas cluster.
         * - ``<DATABASE-NAME>``
           - The name of the database that contains the collection
             for which you want to create the index.
         * - ``<COLLECTION-NAME>``
           - The name of the collection for which you want to
             create the index.
         * - ``<FIELD-NAME>``
           - The name of the field in the collection that you want
             to index for Automated Embedding.
         * - ``<INDEX-NAME>``
           - The name of the index that you want to create.

   .. step:: Run the following command to create the index.
      
      .. code-block:: javascript 
           
         node <file-name>.js
    
      .. example:: 

         For example, to create the index defined in the
         ``create_index.js`` file, run the following command in
         your terminal:

         .. code-block:: javascript 

            node create_index.js
