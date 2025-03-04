To use the :driver:`Python Driver </python-drivers/>` to retrieve your |fts|
indexes, call the ``list_search_indexes()`` method on your collection.

Example 
~~~~~~~

.. procedure:: 
   :style: normal 

   .. step:: Create a new file named ``view_index.py``.

   .. step:: Copy the following code example into the file. 

      The following sample application calls the ``list_search_indexes()`` method
      on a collection. This method returns a cursor from which the code accesses
      and prints each |fts| index:

      .. literalinclude:: /includes/fts-tutorial/search-index-management/python/view_index.py
         :language: python
         :copyable: true

   .. step:: Specify the following values and save the file.

      - Your |service| connection string. To learn more, see :ref:`connect-via-driver`.
      - The database and collection for which you want to retrieve the indexes.

   .. step:: Run the file by using the following command.

      .. code-block:: shell

         python view_index.py