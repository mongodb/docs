Create a Sample Collection and Load the Data 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You must begin by creating a collection named ``schools`` in an 
existing or new database on your cluster. After creating the 
collection, you must upload the sample data into your collection. To
learn more about the documents in the sample collection, see
:ref:`embedded-documents-tutorial-sample-collection`. 

The steps in this section walk you through creating a new database 
and collection, and loading the sample data into your collection.

.. procedure::
   :style: normal

   .. step:: Set up and initialize the .NET/C# project.

      In your terminal, navigate to where you want to create your application, 
      then run the following command to create a directory called 
      ``atlas-search-project`` and initialize your project in that directory: 

      .. literalinclude:: /includes/fts/field-types/initialize-project-csharp.sh
         :language: shell
         :copyable: true

      For more detailed installation instructions, see the 
      :driver:`MongoDB C# Driver documentation </csharp/current/get-started>`.

   .. step:: Create and populate the collections.

      Create and populate the ``schools`` collection:
    
      .. literalinclude:: /includes/fts/tutorials/embedded-documents/sample-data.cs
         :language: csharp
         :copyable:
         :linenos:

      .. include:: /includes/search-shared/find-connection-string.rst

   .. step:: Create the index.
   
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            dotnet run Program.cs

         .. output::
            :visible: false

            Schools collection successfully created and populated.