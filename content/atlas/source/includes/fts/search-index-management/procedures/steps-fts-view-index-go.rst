To use the :driver:`Go Driver </go/current/>` to retrieve a {+fts+}
index by specifying the index name:

.. procedure:: 
   :style: normal 

   .. step:: Create a new file named ``view-index.go``.

   .. step:: Copy the following code example into the file. 

      The following sample application retrieves a {+fts+} index by
      name from the specified collection.

      .. literalinclude:: /includes/fts/search-index-management/view-index.go
         :language: go
         :copyable: true 
         :linenos: 

   .. step:: Replace the following values and then save the file.

      - ``<collection-name>`` - The name of the collection for which you
        want to retrieve the index. 
      - ``<database-name>`` and  ``<collection-name>``: The names of
        the database and collection for which you want to retrieve the
        index.
      - ``<index-name>``: The name of the index you want to retrieve.
      
   .. step:: Run the file.

      .. code-block:: shell

         go run view-index.go