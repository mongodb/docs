To use the :driver:`C Driver </c/>` to edit your |fts| indexes, specify 
the updated index information in your application and call the
``mongoc_collection_command_simple()`` method.

Example
~~~~~~~

.. procedure:: 
   :style: normal 

   .. step:: Create a new file named ``edit-index.c``.

   .. step:: Copy the following code example into the file. 

      The following sample application specifies the ``updateSearchIndex``
      command, an updated index definition, and an existing index name. Then,
      the application converts the command and updated index information to |bson|
      and passes this information to the ``mongoc_collection_command_simple()``
      method to edit the search index.

      .. literalinclude:: /includes/fts/search-index-management/c/edit-index.c
         :language: c
         :copyable: true

   .. step:: Specify the following values and save the file.

      - Your |service| connection string. To learn more, see :ref:`connect-via-driver`.
      - The database and collection for which you want to update an index.
      - The name of the index that you want to update.
      - The fields to redefine your search index. To learn more, see :ref:`ref-index-definitions`.

   .. step:: Compile and run the file using the following commands.

      .. code-block:: shell

         gcc -o edit-index edit-index.c $(pkg-config --libs --cflags libmongoc-1.0)
         ./edit-index
