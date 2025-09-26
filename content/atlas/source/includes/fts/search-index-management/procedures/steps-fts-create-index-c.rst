To use the :driver:`C Driver </c/>` to create a |fts| index, define the
search index in your application and call the
``mongoc_collection_command_simple()`` method.

.. note::

   The |fts| index management methods run asynchronously. The
   driver methods can return before confirming that they ran
   successfully. To determine the current status of the search indexes,
   run an aggregation operation with the ``$listSearchIndexes`` pipeline
   stage.

.. procedure:: 
   :style: normal 

   .. step:: Create a new file named ``create-index.c``.

   .. step:: Copy the following code example into the file. 

      .. tabs::

         .. tab:: Create One Search Index
            :tabid: create-one

            The following sample application specifies the ``createSearchIndexes``
            command to define a search index. Then, the application converts the command and search index
            information to |bson| and passes this information to the ``mongoc_collection_command_simple()``
            method to create the search index. To learn more, see :ref:`ref-index-definitions`.

            .. literalinclude:: /includes/fts/search-index-management/c/create-index.c
               :language: c
               :copyable:
               
         .. tab:: Create Multiple Search Indexes
            :tabid: create-multiple

            The following sample application uses the ``createSearchIndexes`` command to 
            define multiple search indexes. Then, the application converts the command and search index
            information to |bson| and passes this information to the ``mongoc_collection_command_simple()``
            method to create the search index. To learn more, see :ref:`ref-index-definitions`.

            .. literalinclude:: /includes/fts/search-index-management/c/create-indexes.c
               :language: c
               :copyable:

   .. step:: Specify the following values and save the file.

      - Your |service| connection string. To learn more, see :ref:`connect-via-driver`.
      - The database and collection for which you want to create the index. 
      - The name of your index. If you omit the index name, |fts| names the index ``default``.
      - The search index definition. To learn more, see :ref:`ref-index-definitions`.

   .. step:: Compile and run the file by using the following commands.

      .. code-block:: shell

         gcc -o create-index create-index.c $(pkg-config --libs --cflags libmongoc-1.0)
         ./create-index