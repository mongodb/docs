.. procedure:: 
   :style: normal 

   .. step:: Create a new file named ``DeleteIndex.java``.

   .. step:: Copy the following code example into the file. 

      The following sample application deletes the specified |fts| index
      on the specified collection.

      .. literalinclude:: /includes/fts/search-index-management/drop-index.java
         :language: java
         :copyable: true 
         :linenos: 
         :emphasize-lines: 10, 14-15, 17

   .. step:: Replace the following values and then save the file.

      - ``<connection-string>`` - Your |service| connection string. To
        learn more, see :ref:`connect-via-driver`.

        .. note:: 

           In your connection string, don't include the
           :manual:`writeConcern </manual/reference/write-concern/>`
           setting.
           
      - ``<database-name>`` - The name of the database that contains the
        collection. 
      - ``<collection-name>`` - The name of the collection for which you
        want to retrieve the index. 
      - ``<index-name>`` - the name of the index to delete.

   .. step:: Compile and run the file.

      .. code-block:: shell

         javac DeleteIndex.java
         java DeleteIndex
