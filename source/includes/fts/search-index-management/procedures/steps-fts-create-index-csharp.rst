Create One Index
~~~~~~~~~~~~~~~~

To use the :driver:`.NET/C# Driver </csharp/current/>` to create an |fts| index:

1. Construct a ``BsonDocument`` that defines the index.
      
#. Pass the ``BsonDocument`` to the ``CreateOne()`` or
   ``CreateOneAsync()`` method.

The following sample application
defines a search index to dynamically index the fields in your collection,
then runs the ``CreateOne()`` method to create the index.
To learn more, see :ref:`ref-index-definitions`.

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

      Replace the placeholder values in the following example:

      .. list-table::
         :widths: 20 80
         :header-rows: 1

         * - Value
           - Description

         * - ``<connection-string>`` 
           - Your |service| connection string. To learn more, see 
             :ref:`connect-via-driver`.

         * - ``<databaseName>``
           -  Database for which you want to create the index.

         * - ``<collectionName>``   
           - Collection for which you want to create the index. 
  
         * - ``<IndexName>``   
           - The name of your index. If you omit the index 
             name, |fts| names the index ``default``.

      .. literalinclude:: /includes/fts/search-index-management/csharp/CreateIndex.cs
         :caption: Program.cs
         :language: csharp
         :copyable:

   .. step:: Compile and run the ``Program.cs`` file.

      Use the following command to run the project:

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            dotnet run csharp-create-index.csproj

         .. output::

            default

Create Multiple Indexes
~~~~~~~~~~~~~~~~~~~~~~~

To create multiple |fts| indexes at once:

1. Construct an instance of ``IEnumerable<CreateSearchIndexModel>`` that contains the search index definitions.
   
#. Pass the collection to the ``CreateMany()`` or ``CreateManyAsync()`` method.

The following example shows how to use the ``CreateMany()`` method to 
create multiple indexes:

.. procedure::
   :style: normal

   .. step:: Create a new directory and initialize your project.

      a. Run the following command to create a new directory called 
         ``csharp-create-index``.

         .. code-block:: sh

            mkdir csharp-create-index-mult

      #. Run the following command to change to the new directory.

         .. code-block:: sh

            cd csharp-create-index-mult

      #. Run the following command to initialize your project.

         .. code-block:: sh

            dotnet new console

   .. step:: Add the .NET/C# Driver to your project as a dependency.

      Run the following command:
      
      .. code-block:: sh

         dotnet add package MongoDB.Driver

   .. step:: Replace the contents of the ``Program.cs`` file with a ``BsonDocument`` that defines the index.

      Replace the placeholder values in the following example:

      .. list-table::
         :widths: 20 80
         :header-rows: 1

         * - Value
           - Description

         * - ``<connection-string>`` 
           - Your |service| connection string. To learn more, see 
             :ref:`connect-via-driver`.

         * - ``<databaseName>``
           -  Database for which you want to create the index.

         * - ``<collectionName>``   
           - Collection for which you want to create the index.

         * - ``<first-index-name>`` 
           - Name of your first index.

         * - ``<last-index-name>``
           - Name of your last index. 

      .. literalinclude:: /includes/fts/search-index-management/csharp/CreateIndexes.cs
         :language: csharp
         :copyable:

   .. step:: Compile and run the ``Program.cs`` file.

      Use the following command to run the project:

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            dotnet run csharp-create-index-mult.csproj

         .. output::

            default

.. tip:: API Documentation

   To learn more about the methods on this page, see the 
   `API documentation <https://mongodb.github.io/mongo-csharp-driver/2.21/apidocs/html/Methods_T_MongoDB_Driver_Search_IMongoSearchIndexManager.htm>`__
   for the .NET/C# driver.