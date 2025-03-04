To use the :driver:`Python Driver </python-drivers/>` to update your |fts|
indexes, call the ``update_search_index()`` method on your collection.

Example 
~~~~~~~

.. procedure:: 
   :style: normal 

   .. step:: Create a new file named ``edit_index.py``.

   .. step:: Copy the following code example into the file. 

      The following sample application specifies a new |fts| index definition.
      Then, the application passes this definition and an existing index name to
      the ``update_search_index()`` method, which updates the existing index to
      reflect the new definition document.

      .. literalinclude:: /includes/fts-tutorial/search-index-management/python/edit_index.py
         :language: python
         :copyable: true

   .. step:: Specify the following values and save the file.

      - Your |service| connection string. To learn more, see :ref:`connect-via-driver`.
      - The database and collection for which you want to update an index.
      - The name of the index that you want to update.
      - The fields to redefine your search index. To learn more, see :ref:`ref-index-definitions`.

   .. step:: Run the file using the following command.

      .. code-block:: shell

         python edit_index.py