To use the :driver:`C++ Driver </cxx/>` to create an |fts| index, define the search index
in your application and call the ``create_one()`` method.

.. note::

   The |fts| index management methods run asynchronously. The
   driver methods can return before confirming that they ran
   successfully. To determine the current status of the search indexes,
   call the ``list()`` method on a search index view instance.

.. procedure:: 
   :style: normal 

   .. step:: Create a new file named ``create-index.cpp``.

   .. step:: Copy the following code example into the file.

      .. tabs::

         .. tab:: Create One Search Index
            :tabid: create-one

            The following sample application passes a search index name and definition
            to the ``search_index_model()`` method to dynamically index the fields in your
            collection. Then, the application passes the search index specifications to the
            ``create_one()`` method to create the search index. To learn more, see
            :ref:`ref-index-definitions`.

            .. literalinclude:: /includes/fts/search-index-management/cpp/create-index.cpp
               :language: cpp
               :copyable:
               
         .. tab:: Create Multiple Search Indexes
            :tabid: create-multiple

            You can also create multiple |fts| indexes at once. For each search index you want to
            create, pass the search index specifications to the ``search_index_model()`` method.
            Then, add each search index to a vector and pass the vector to the ``create_many()``
            method to create the search indexes:

            .. literalinclude:: /includes/fts/search-index-management/cpp/create-indexes.cpp
               :language: cpp
               :copyable:

   .. step:: Specify the following values and save the file.

      - Your |service| connection string. To learn more, see :ref:`connect-via-driver`.
      - The database and collection for which you want to create the index. 
      - The name of your index. If you omit the index name, |fts| names the index ``default``.

      .. tabs::
         :hidden: true

         .. tab:: Create One Search Index
            :tabid: create-one

         .. tab:: Create Multiple Search Indexes
            :tabid: create-multiple

            - The search index definition. To learn more, see :ref:`ref-index-definitions`.

   .. step:: Compile and run the file by using the following commands.

      .. code-block:: shell

         g++ -o create-index create-index.cpp $(pkg-config --cflags --libs libmongocxx)
         ./create-index
