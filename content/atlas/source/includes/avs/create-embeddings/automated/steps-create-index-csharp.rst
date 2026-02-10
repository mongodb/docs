.. procedure:: 
   :style: normal 

   .. step:: Define the index in a file. 

      To define a {+avs+} index: 

      a. In your shell, run the following commands to create a directory called
         ``VectorSearch`` and initialize a .NET framework project for a new console
         application:

         .. code-block:: shell 

            mkdir VectorSearch
            cd VectorSearch
            dotnet new console 

      #. Run the following command to install the current version of the .NET/C# driver as
         a dependency of your project:
      
         .. code-block:: shell 

            dotnet add package MongoDB.Driver

      #. Create a new file named ``Listing.cs``, and then copy and paste the following class
         definition into the file:

         .. literalinclude:: /includes/avs/create-embeddings/automated/Listing.cs
            :language: csharp
            :copyable: true 
            :caption: Listing.cs
            :linenos:

      #. Create a new file named ``Address.cs``, and then copy and paste the following class
         definition into the file:

         .. literalinclude:: /includes/avs/create-embeddings/automated/Address.cs
            :language: csharp
            :copyable: true 
            :caption: Address.cs
            :linenos:
      
      #. Copy and paste the following code into the ``Program.cs`` file in your
         application:
      
         .. literalinclude:: /includes/avs/create-embeddings/automated/Program.cs  
            :language: csharp
            :copyable: true
            :caption: Program.cs
            :linenos:

      #. Replace the ``<connection string>`` in the index definition and
         save the file.

         To learn more about using the .NET/C# driver to connect to a MongoDB cluster, see
         :ref:`connect-via-driver`. To see code examples, select :guilabel:`C#` from the
         language dropdown on that page.

   .. step:: Create the index.

      To create the index, run the following command: 

      .. code-block:: shell 

         dotnet run VectorSearch.csproj
