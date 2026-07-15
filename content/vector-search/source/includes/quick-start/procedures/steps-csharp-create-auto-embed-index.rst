.. procedure:: 
   :style: normal 

   .. step:: Define the index in a file. 

      To define a {+avs+} index: 

      a. In your shell, run the following commands to create a directory called
         ``VectorSearch`` and initialize a .NET Framework project for a new console
         application:

         .. code-block:: shell 

            mkdir VectorSearch
            cd VectorSearch
            dotnet new console 

      #. Run the following command to install the current version of the .NET/C# driver as
         a dependency of your project:
      
         .. code-block:: shell 

            dotnet add package MongoDB.Driver
      
      #. Copy and paste the following code into the ``Program.cs`` file in your
         application:
      
         .. literalinclude:: /includes/quick-start/code-snippets/auto-embed/csharp/Program-AutoEmbed.cs
            :language: csharp
            :copyable: true
            :caption: Program.cs
            :linenos:

         For details on all the {+avs+} index settings for Automated Embedding, see 
         :ref:`avs-types-vector-search-options`.

   .. step:: Specify the ``<connection string>``.

      .. include:: /includes/quick-start/procedures/steps-connection-string-drivers-hidden.rst

   .. step:: Create the index.

      To create the index, run the following command: 

      .. code-block:: shell 

         dotnet run
