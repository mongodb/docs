To use the :driver:`.NET/C# Driver </csharp/current/>` to create an |fts| index,
construct a ``BsonDocument`` that defines the index, then pass this ``BsonDocument``
to the ``CreateOne()`` or ``CreateOneAsync()`` method.

Example 
~~~~~~~

The following sample application
defines a search index to dynamically index the fields in your collection,
then runs the ``CreateOne()`` method to create the index.
To learn more, see :ref:`ref-index-definitions`.

Specify the following values:

- Your |service| connection string. To learn more, see :ref:`connect-via-driver`.
- The database and collection for which you want to create the index. 
- The name of your index. If you omit the index name, |fts| names the index ``default``.

.. literalinclude:: /includes/fts-tutorial/search-index-management/csharp/CreateIndex.cs
   :caption: Program.cs
   :language: csharp
   :copyable:

To run the sample application, create a new .NET console project named
``csharp-create-index`` and copy the previous code example into the 
``Program.cs`` file. Then, use the following command to run the project:

.. io-code-block::
   :copyable: true

   .. input::
      :language: shell

      dotnet run csharp-create-index.csproj

   .. output::

      default

You can also create multiple |fts| indexes at once. To do so,
construct an instance of ``IEnumerable<CreateSearchIndexModel>`` that contains the
search-index definitions, then pass this collection to the
``CreateMany()`` or ``CreateManyAsync()`` method.

The following example shows how to use the ``CreateMany()`` method to create multiple
indexes:

.. literalinclude:: /includes/fts-tutorial/search-index-management/csharp/CreateIndexes.cs
   :language: csharp
   :copyable:

.. tip:: API Documentation

   To learn more about the methods on this page, see the 
   `API documentation <https://mongodb.github.io/mongo-csharp-driver/2.21/apidocs/html/Methods_T_MongoDB_Driver_Search_IMongoSearchIndexManager.htm>`__
   for the .NET/C# driver.