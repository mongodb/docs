To use the :driver:`C++ Driver </cxx/>` to delete your |fts| index, call
the ``drop_one()`` method on a search index view.

Example
~~~~~~~

.. procedure:: 
   :style: normal 

   .. step:: Create a new file named ``delete-index.cpp``.

   .. step:: Copy the following code example into the file. 

      The following sample application uses the ``search_indexes()`` method
      on the target collection to instantiate a search index view. Then,
      the application calls the ``drop_one()`` method on the view and passes
      an |fts| index name as a parameter to delete the index.

      .. literalinclude:: /includes/fts/search-index-management/cpp/delete-index.cpp
         :language: cpp
         :copyable: true

   .. step:: Specify the following values and save the file.

      - Your |service| connection string. To learn more, see :ref:`connect-via-driver`.
      - The database and collection for which you want to retrieve the indexes.
      - The name of the index that you want to delete.

   .. step:: Compile and run the file using the following commands.

      .. code-block:: shell

         g++ -o delete-index delete-index.cpp $(pkg-config --cflags --libs libmongocxx)
         ./delete-index
