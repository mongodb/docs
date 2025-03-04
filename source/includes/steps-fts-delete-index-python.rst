To use the :driver:`Python Driver </python-drivers/>` to delete your |fts|
index, call the ``drop_search_index()`` method on your collection.

Example 
~~~~~~~

.. procedure:: 
   :style: normal 

   .. step:: Create a new file named ``delete_index.py``.

   .. step:: Copy the following code example into the file. 

      The following sample application passes an |fts| index name to
      the ``drop_search_index()`` method to delete the index.

      .. literalinclude:: /includes/fts-tutorial/search-index-management/python/delete_index.py
         :language: python
         :copyable: true

   .. step:: Specify the following values and save the file.

      - Your |service| connection string. To learn more, see :ref:`connect-via-driver`.
      - The database and collection for which you want to delete an index.
      - The name of the index that you want to delete.

   .. step:: Run the file using the following command.

      .. code-block:: shell

         python delete_index.py