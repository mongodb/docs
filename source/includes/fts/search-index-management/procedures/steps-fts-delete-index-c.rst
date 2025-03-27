To use the :driver:`C Driver </c/>` to delete your |fts| index, pass
your collection and the drop command to the ``mongoc_collection_command_simple()``
method.

Example
~~~~~~~

.. procedure:: 
   :style: normal 

   .. step:: Create a new file named ``delete-index.c``.

   .. step:: Copy the following code example into the file. 

      The following sample application specifies the ``dropSearchIndex``
      command and an existing index name. Then, the application converts the
      command and index information to |bson| and passes this information to
      the ``mongoc_collection_command_simple()`` method to delete the search index.

      .. literalinclude:: /includes/fts/search-index-management/c/delete-index.c
         :language: c
         :copyable: true

   .. step:: Specify the following values and save the file.

      - Your |service| connection string. To learn more, see :ref:`connect-via-driver`.
      - The database and collection for which you want to delete an index.
      - The name of the index that you want to delete.

   .. step:: Compile and run the file using the following commands.

      .. code-block:: shell

         gcc -o delete-index delete-index.c $(pkg-config --libs --cflags libmongoc-1.0)
         ./delete-index