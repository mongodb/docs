.. procedure:: 
   :style: normal 

   .. step:: Replace the contents of your ``Program.cs`` file.

      Copy and paste the following code into the ``Program.cs`` file in
      your ``VectorSearch`` directory, replacing the existing contents:

      .. literalinclude:: /includes/quick-start/code-snippets/auto-embed/csharp/auto-embed-query.cs
         :language: csharp
         :copyable: true
         :caption: Program.cs
         :linenos:

      .. include:: /includes/quick-start/facts/fact-avs-auto-embed-quick-start-query-intro.rst

   .. step:: Replace the ``<connection string>`` placeholder and save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`.

   .. step:: Run the following command to query your collection.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash

            dotnet run

         .. output:: /includes/quick-start/code-snippets/output/csharp-query-output.json
            :language: js
            :visible: false
            :linenos: