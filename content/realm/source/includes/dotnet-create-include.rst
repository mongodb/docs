When creating or updating documents, all writes must happen in a 
:ref:`transaction <dotnet-write-transactions>`. 

The following code shows two methods for creating a new Realm object. In the 
first example, we create the object first, and then add it to the realm within 
a :dotnet-sdk:`WriteAsync() <reference/Realms.Realm.html#Realms_Realm_WriteAsync_System_Action_System_Threading_CancellationToken_>`
method. In the second example, we create the document within the ``WriteAsync`` 
block, which returns a realm object we can further work with.

.. literalinclude:: /examples/generated/dotnet/QuickStartExamples.snippet.create.cs
   :language: csharp