To create a |fts| index through the :driver:`Go Driver </go/current/>`:

1. Define the search index from your application.

#. Run the ``createOne()`` helper method.

.. note::

   The |fts| index management methods run asynchronously. The
   driver methods can return before confirming that they ran
   successfully. To determine the current status of the search indexes,
   call the ``SearchIndexes().List()`` method on your collection.

.. procedure:: 
   :style: normal 

   .. step:: Create a new file named ``create-index.go``.

   .. step:: Copy the following code example into the file. 

      The following sample application creates a |fts| index on a
      collection.

      .. literalinclude:: /includes/fts/search-index-management/create-index.go
         :language: go
         :copyable: true 
         :linenos: 

   .. step:: Replace the following values and then save the file.

      - ``<connection-string>``: Your |service| connection string. To
        learn more, see :ref:`connect-via-driver`.
      - ``<database-name>`` and  ``<collection-name>``: The names of
        the database and collection for which you want to retrieve the
        index.
      - ``<index-name>``: The name of your index. If you omit the index
        name, |fts| names the index ``default``.

   .. step:: Run the file.

      .. code-block::
         
         go run create-index.go
