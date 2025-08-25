Upserting a document is the same as creating a new one, except you set the 
optional ``update`` parameter to ``true``. In this example, we create a new 
``Item`` object with a unique ``Id``. We then insert an item with the 
same id but a different ``Name`` value. Because we have set the ``update`` 
parameter to ``true``, the existing record is updated with the new name.

.. literalinclude:: /examples/generated/dotnet/QuickStartExamples.snippet.upsert.cs
   :language: csharp
