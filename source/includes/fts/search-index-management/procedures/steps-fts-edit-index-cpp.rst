To use the :driver:`C++ Driver </cxx/>` to edit an |fts| index, call the
``update_one()`` method on a search index view.

Example 
~~~~~~~

.. procedure:: 
   :style: normal 

   .. step:: Create a new file named ``edit-index.cpp``.

   .. step:: Copy the following code example into the file. 

      The following sample application instantiates a search index view and specifies
      a new |fts| index definition. Then, the application passes this definition and
      an existing index name to the ``update_one()`` method, which updates the existing
      index to reflect the new definition document.

      .. literalinclude:: /includes/fts/search-index-management/cpp/edit-index.cpp
         :language: cpp
         :copyable: true

   .. step:: Specify the following values and save the file.

      - Your |service| connection string. To learn more, see :ref:`connect-via-driver`.
      - The database and collection for which you want to update an index.
      - The name of the index that you want to update.
      - The fields to redefine your search index. To learn more, see :ref:`ref-index-definitions`.

   .. step:: Compile and run the file using the following commands.

      .. code-block:: shell

        g++ -o edit-index edit-index.cpp $(pkg-config --cflags --libs libmongocxx)
        ./edit-index