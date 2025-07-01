.. procedure:: 
   :style: normal 

   .. step:: Create a new file named ``ViewIndex.java``.

   .. step:: Copy the following code example into the file. 

      The following sample application retrieves all |fts| indexes on
      a given collection.

      .. literalinclude:: /includes/fts/search-index-management/view-index.java
         :language: java
         :copyable: true 
         :linenos: 
         :emphasize-lines: 10, 13-14

   .. step:: Replace the following values and then save the file.

      - ``<connection-string>`` - Your |service| connection string. To
        learn more, see :ref:`connect-via-driver`.
      - ``<database-name>`` - The name of the database that contains the
        collection. 
      - ``<collection-name>`` - The name of the collection for which you
        want to retrieve the index. 

   .. step:: Compile and run the file.

      .. code-block:: shell

         javac ViewIndex.java
         java ViewIndex
