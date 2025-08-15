a. Add the MongoDB .NET Driver to your project.

   .. code-block:: shell

      dotnet add package MongoDB.Driver

   For detailed installation instructions, see the
   :driver:`MongoDB .NET Driver documentation </csharp/current>`.

#. Create the index.

   .. tabs::

      .. tab:: autocomplete
         :tabid: autocomplete

         Create a file named ``CreateAutoCompleteIndex.cs`` and paste the following code:

         .. literalinclude:: /includes/fts/partial-match/CreateAutoCompleteIndex.cs
            :language: csharp

      .. tab:: string
         :tabid: string

         Create a file named ``CreateStringIndex.cs`` and paste the following code:

         .. literalinclude:: /includes/fts/partial-match/CreateStringIndex.cs
            :language: csharp

   .. include:: /includes/steps-connection-string-drivers-hidden.rst

#. Compile and run the program.

   .. code-block:: shell

      dotnet run