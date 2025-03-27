To use the :driver:`C++ Driver </cxx/>` to retrieve your |fts| indexes, call
the ``list()`` method on a search index view.

Example
~~~~~~~

.. procedure:: 
   :style: normal 

   .. step:: Create a new file named ``view-index.cpp``.

   .. step:: Copy the following code example into the file. 

      The following sample application uses the ``search_indexes()`` method
      on the target collection to instantiate a search index view. Then, the
      application calls the ``list()`` method on the view. This method returns
      a cursor from which the code accesses and prints each |fts| index.

      .. literalinclude:: /includes/fts/search-index-management/cpp/view-index.cpp
         :language: cpp
         :copyable: true

   .. step:: Specify the following values and save the file.

      - Your |service| connection string. To learn more, see :ref:`connect-via-driver`.
      - The database and collection for which you want to retrieve the indexes.

   .. step:: Compile and run the file using the following commands.

      .. code-block:: shell

         g++ -o view-index view-index.cpp $(pkg-config --cflags --libs libmongocxx)
         ./view-index
