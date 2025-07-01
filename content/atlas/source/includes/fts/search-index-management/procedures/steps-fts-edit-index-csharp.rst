To use the :driver:`.NET/C# Driver </csharp/current/>` to edit an |fts| index,
use the ``Update()`` or ``UpdateAsync()`` method.

Example
~~~~~~~

The following sample application updates an existing index definition.
Specify the following values:

- Your |service| connection string. To learn more, see :ref:`connect-via-driver`.
- The database and collection where you created the search index.
- The new index definition to replace the existing definition. In the example,
  you update an index to use :ref:`static mappings <static-dynamic-mappings>`. 
  You can alter this definition to suit your specific indexing needs. To learn more, 
  see :ref:`ref-index-definitions`.
- The name of the index that you want to update.

.. literalinclude:: /includes/fts/search-index-management/csharp/UpdateIndex.cs
   :caption: Program.cs
   :language: csharp
   :copyable:

To run the sample application, create a new .NET console project named
``csharp-update-index`` and copy the previous code example into the 
``Program.cs`` file. Then, use the following command to run the project:

.. code-block:: csharp
   :copyable: true
   
   dotnet run csharp-update-index.csproj

.. note:: 

   The ``Update()`` method doesn't return an output.
   You can use the {+atlas-ui+} to view the 
   :ref:`index status <node-status-ref>`.

.. tip:: API Documentation

   To learn more about the methods on this page, see the 
   `API documentation <https://mongodb.github.io/mongo-csharp-driver/2.21/apidocs/html/Methods_T_MongoDB_Driver_Search_IMongoSearchIndexManager.htm>`__
   for the .NET/C# driver.