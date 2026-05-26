.. procedure:: 
   :style: normal 
    
   .. step:: Connect to the Atlas cluster using {+mongosh+}. 

      To learn more, see :ref:`connect-mongo-shell`.

   .. step:: Switch to the database that contains the collection for which you want to create the index. 

      To switch, run the following command: 

      .. code-block:: javascript

         use <DATABASE-NAME>

      Here, ``<DATABASE-NAME>`` is the name of the database you
      want to use. 

      .. example:: 

         For example, to switch to the ``sample_mflix`` database,
         which contains the ``movies`` collection, run the
         following command: 

         .. code-block:: javascript

            use sample_mflix

   .. step:: Run the ``db.collection.createSearchIndex()`` method. 
      
      The :method:`db.collection.createSearchIndex()` method has 
      the following syntax: 

      .. literalinclude:: /includes/crud-embeddings/automated/code-snippets/shell/index-syntax.json
         :language: json
         :linenos:
    
      .. example:: 
    
         For example, to create an index that enables automated
         embeddings by using the ``voyage-3-large`` model for the
         ``fullplot`` field in the collection, run the following
         command in your terminal:
    
         .. literalinclude:: /includes/crud-embeddings/automated/code-snippets/shell/index-example.json
            :language: json
            :linenos: 
