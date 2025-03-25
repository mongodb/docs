a. In your terminal, run the following commands to create a new directory 
    called ``query-quick-start`` and initialize your .NET/C# project.
  
   .. code-block:: bash

      mkdir query-quick-start
      cd query-quick-start
      dotnet new console

#. Run the following command to add the .NET/C# Driver to your project as a dependency.

   .. code-block:: bash

      dotnet add package MongoDB.Driver

   For more detailed installation instructions, see the 
   :ref:`MongoDB C# Driver documentation <csharp-quickstart>`.

#. Define the index.

   Create a file named ``IndexService.cs``. Copy and paste the following
   code into the file.

   .. literalinclude:: /includes/avs/index-management/create-index/basic-example.cs
      :language: csharp
      :copyable: true
      :caption: IndexService.cs
      :emphasize-lines: 11
      :linenos:

   .. include:: /includes/avs/tutorial/avs-quick-start-basic-index-description.rst

   This code also includes a polling mechanism to check if the index is ready to use.

#. Specify the ``<connection-string>``.

   .. include:: /includes/steps-connection-string-drivers-hidden.rst

#. Initialize the class and call the method to create the index in your
   ``Program.cs`` file:

   .. code-block:: csharp
      :copyable: true
      :caption: Program.cs

      using query_quick_start;

      var indexService = new IndexService();
      indexService.CreateVectorIndex();

#. Compile and run your project to create the index.
   
   .. io-code-block::
      :copyable: true

      .. input::
         :language: bash

         dotnet run query-quick-start.csproj

      .. output:: /includes/avs/index-management/create-index/create-index-output.sh
         :language: sh
         :linenos:
