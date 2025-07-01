To use the :driver:`C Driver </c/>` to retrieve your |fts| indexes, use
the ``mongoc_collection_aggregate()`` method to create an aggregation pipeline
that includes the ``$listSearchIndexes`` stage.

Example
~~~~~~~

.. procedure:: 
   :style: normal 

   .. step:: Create a new file named ``view-index.c``.

   .. step:: Copy the following code example into the file. 

      The following sample application specifies the ``$listSearchIndexes`` stage
      in an aggregation pipeline. Then, the application passes the pipeline and the
      target collection to the ``mongoc_collection_aggregate()`` method. This method
      returns a cursor from which the code accesses and prints each |fts| index:

      .. literalinclude:: /includes/fts/search-index-management/c/view-index.c
         :language: c
         :copyable: true

   .. step:: Specify the following values and save the file.

      - Your |service| connection string. To learn more, see :ref:`connect-via-driver`.
      - The database and collection for which you want to retrieve the indexes.

   .. step:: Compile and run the file by using the following commands.

      .. code-block:: shell

         gcc -o view-index view-index.c $(pkg-config --libs --cflags libmongoc-1.0)
         ./view-index
