To use the :driver:`Python Driver </python-drivers/>` to create an |fts| index,
define the search index from your application and call the ``create_search_index()``
method.

.. note::

   The |fts| index management methods run asynchronously. The
   driver methods can return before confirming that they ran
   successfully. To determine the current status of the search indexes,
   call the ``list_search_indexes()`` method on your collection.

Example 
~~~~~~~

.. procedure:: 
   :style: normal 

   .. step:: Create a new file named ``create_index.py``.

   .. step:: Copy the following code example into the file. 

      .. tabs::

         .. tab:: Create One Search Index
            :tabid: create-one

            The following sample application defines a search index to dynamically
            index the fields in your collection. Then, the application calls the
            ``create_search_index()`` method on a collection to create the search index.
            To learn more, see :ref:`ref-index-definitions`.

            .. literalinclude:: /includes/fts-tutorial/search-index-management/python/create_index.py
               :language: python
               :copyable:
               
         .. tab:: Create Multiple Search Indexes
            :tabid: create-multiple

            You can also create multiple |fts| indexes at once. In your application, 
            define an array of search indexes. Then, pass the array as a parameter to the 
            ``create_search_indexes()`` method:

            .. literalinclude:: /includes/fts-tutorial/search-index-management/python/create-indexes.py
               :language: python
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

   .. step:: Run the file by using the following command.

      .. code-block:: shell

         python create_index.py