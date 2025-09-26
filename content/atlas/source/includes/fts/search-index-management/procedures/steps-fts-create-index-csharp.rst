To use the :driver:`.NET/C# Driver </csharp/current/>` to create a |fts| index:

1. Construct a ``BsonDocument`` that defines the index.

#. Pass the ``BsonDocument`` to the ``CreateOne()`` or
   ``CreateOneAsync()`` method.

.. note::

   The |fts| index management methods run asynchronously. The
   driver methods can return before confirming that they ran
   successfully. To determine the current status of the search indexes,
   call the ``List()`` method on a ``SearchIndexes()`` instance.

.. procedure::
   :style: normal

   .. step:: Create a new directory and initialize your project.

      a. Run the following command to create a new directory called 
         ``csharp-create-index``.

         .. code-block:: sh

            mkdir csharp-create-index

      #. Run the following command to change to the new directory.

         .. code-block:: sh

            cd csharp-create-index

      #. Run the following command to initialize your project.

         .. code-block:: sh

            dotnet new console

   .. step:: Add the .NET/C# Driver to your project as a dependency.

      Run the following command:
      
      .. code-block:: sh

         dotnet add package MongoDB.Driver

   .. step:: Replace the contents of the ``Program.cs`` file with a ``BsonDocument`` that defines the index.
      
      .. tabs:: 

         .. tab:: Create One Search Index
            :tabid: create-one

            Replace the placeholder values in the following example 
            application, which uses the ``SearchIndexes.CreateOne`` command to define a |fts| index:

            .. list-table::
               :widths: 30 70
               :header-rows: 1

               * - Value
                 - Description

               * - ``<connection-string>`` 
                 - Your |service| connection string. To learn more, see :ref:`connect-via-driver`.

               * - ``<databaseName>``
                 -  Database for which you want to create the index.

               * - ``<collectionName>``   
                 - Collection for which you want to create the index. 
      
               * - ``<IndexName>``   
                 - The name of your index. If you omit the index name, |fts| names the index ``default``.
               
               * - ``<IndexDefinition>``
                 - The definition of your index. To learn about index definition syntax, see :ref:`ref-index-definitions`. 

            .. literalinclude:: /includes/fts/search-index-management/csharp/CreateIndex.cs
               :language: csharp
               :copyable: true 
               :linenos: 

         .. tab:: Create Multiple Search Indexes
            :tabid: create-multiple

            Replace the placeholder values in the following example 
            application, which uses the ``SearchIndexes.CreateMany`` command to define a |fts| index:
            
            .. list-table::
               :widths: 20 80
               :header-rows: 1

               * - Value
                 - Description

               * - ``<connection-string>`` 
                 - Your |service| connection string. To learn more, see :ref:`connect-via-driver`.

               * - ``<databaseName>``
                 -  Database for which you want to create the index.

               * - ``<collectionName>``   
                 - Collection for which you want to create the index.

               * - ``<firstIndexName>`` 
                 - Name of your first index.

               * - ``<lastIndexName>``
                 - Name of your last index.

               * - ``<IndexDefinition>``
                 - The definition of your index. To learn about index definition syntax, see :ref:`ref-index-definitions`.  

            .. literalinclude:: /includes/fts/search-index-management/csharp/CreateIndexes.cs
               :language: csharp
               :copyable: true 
               :linenos: 

   .. step:: Compile and run the ``Program.cs`` file.

      Use the following command to run the project:

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            dotnet run csharp-create-index.csproj

         .. output::
            :visible: false

            default

.. tip:: API Documentation

   To learn more about the methods on this page, see the 
   `API documentation <https://mongodb.github.io/mongo-csharp-driver/2.21/apidocs/html/Methods_T_MongoDB_Driver_Search_IMongoSearchIndexManager.htm>`__
   for the .NET/C# driver.