.. procedure:: 
   :style: normal 

   .. step:: Create a new file named ``EditIndex.java``.

   .. step:: Copy the following code example into the file. 

      .. literalinclude:: /includes/fts/search-index-management/update-index.java
         :language: java
         :copyable: true 
         :linenos: 
         :emphasize-lines: 10, 14-15, 17-20, 22

   .. step:: Replace the following values in the code and then save the file.

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
      - ``<analyzer-name>`` - The name of the :ref:`analyzer
        <analyzers-ref>`.
      - ``dynamic`` - The flag that indicates whether or not to
        :ref:`automatically <static-dynamic-mappings>` index the fields.
      - ``<field-name>`` - The name of the field to index.
      - ``<field-type>`` - The field data :ref:`type <bson-data-types>`.
      - ``<index-name>`` - The name of the index.

   .. step:: Compile and run the file.

      .. code-block:: shell

         javac EditIndex.java
         java EditIndex

      The ``updateSearchIndex()`` method runs asynchronously. Use the
      ``listSearchIndexes()`` method to determine if the changes have
      been applied to your index. To learn more about retrieving |fts|
      indexes, see :ref:`ref-view-index-programmatically`.
