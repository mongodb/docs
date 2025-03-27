To use the :driver:`.NET/C# Driver </csharp/current/>` to delete an |fts| index,
use the ``DropOne()`` or ``DropOneAsync()`` method.

Example
~~~~~~~

The following sample application deletes an index from a collection.
Specify the following values:

- Your |service| connection string. To learn more, see :ref:`connect-via-driver`.
- The database and collection that contains the search index that you want to delete.
- The name of the search index that you want to delete.

.. literalinclude:: /includes/fts/search-index-management/csharp/DropIndex.cs
   :caption: Program.cs 
   :language: csharp
   :copyable:

To run the sample application, create a new .NET console project named
``csharp-delete-index`` and copy the previous code example into the 
``Program.cs`` file. Then, use the following command to run the project:

.. code-block:: csharp
   :copyable: true

   dotnet run csharp-delete-index.csproj

.. note:: 

   The ``DropOne()`` method doesn't return an output. 
   You can use the {+atlas-ui+} to view the 
   :ref:`index status <node-status-ref>`.

.. tip:: API Documentation

   To learn more about the methods on this page, see the 
   `API documentation <https://mongodb.github.io/mongo-csharp-driver/2.21/apidocs/html/Methods_T_MongoDB_Driver_Search_IMongoSearchIndexManager.htm>`__
   for the .NET/C# driver.