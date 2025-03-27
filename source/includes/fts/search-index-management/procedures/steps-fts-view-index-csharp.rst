To use the :driver:`.NET/C# Driver </csharp/current/>` to retrieve your |fts| indexes,
use the ``List()`` or ``ListAsync()`` method.

Example
~~~~~~~

The following sample application returns the indexes on a collection.
Specify the following values:

- Your |service| connection string. To learn more, see :ref:`connect-via-driver`.
- The database and collection that contains the search indexes 
  that you want to retrieve.

.. note:: 

   The ``List()`` method returns a cursor instead of the indexes themselves.
   To access the indexes, use a cursor paradigm such 
   as the ``MoveNext()`` method.

.. literalinclude:: /includes/fts/search-index-management/csharp/ListIndexes.cs
   :caption: Program.cs
   :language: csharp
   :copyable:

To run the sample application, create a new .NET console project named
``csharp-list-indexes`` and copy the previous code example into the 
``Program.cs`` file. Then, use the following command to run the project:

.. io-code-block::
   :copyable: true

   .. input::
      :language: shell

      dotnet run csharp-list-indexes.csproj

   .. output::

      <indexes for this collection>

.. tip:: API Documentation

   To learn more about the methods on this page, see the 
   `API documentation <https://mongodb.github.io/mongo-csharp-driver/2.21/apidocs/html/Methods_T_MongoDB_Driver_Search_IMongoSearchIndexManager.htm>`__
   for the .NET/C# driver.