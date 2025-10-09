To delete a {+fts+} index using the :driver:`Go Driver </go/current/>`:

.. procedure:: 
   :style: normal 

   .. step:: Create a new file named ``delete-index.go``.

   .. step:: Copy the following code example into the file. 

      The following sample application deletes a |fts| index on the
      specified collection.

      .. literalinclude:: /includes/fts/search-index-management/delete-index.go
         :language: go
         :copyable: true
         :linenos:

   .. step:: Replace the following values and then save the file.

      - ``<connection-string>``: Your |service| connection string. To
        learn more, see :ref:`connect-via-driver`.
      - ``<database-name>`` and  ``<collection-name>``: The names of
        the database and collection for which you want to retrieve the
        index.
      - ``<index-name>``: The name of the index you want to delete.

   .. step:: Run the file.

      .. code-block::

         go run delete-index.go
