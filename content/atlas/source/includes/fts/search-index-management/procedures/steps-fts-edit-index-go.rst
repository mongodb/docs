To edit a {+fts+} index using the :driver:`Go Driver </go/current/>`:

.. procedure:: 
   :style: normal 

   .. step:: Create a new file named ``edit-index.go``.

   .. step:: Copy the following code example into the file. 

      The following sample application edits a |fts| index on the
      specified collection.

      .. literalinclude:: /includes/fts/search-index-management/edit-index.go
         :language: go
         :copyable: true 
         :linenos: 

   .. step:: Replace the following values and then save the file.

      - ``<connection-string>``: Your |service| connection string. To
        learn more, see :ref:`connect-via-driver`.
      - ``<database-name>`` and  ``<collection-name>``: The names of
        the database and collection for which you want to retrieve the
        index.
      - ``<index-name>``: The name of the index you want to edit.
      - ``<index-definition>``: The new search index definition. To
        learn more, see :ref:`ref-index-definitions`.

   .. step:: Run the file.

      .. code-block::

         go run edit-index.go
