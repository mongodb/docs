Use Static Mappings
-------------------

.. include:: /includes/fts/synonyms/static-intro.rst

.. procedure:: 
   :style: normal 

   .. step:: Set up your application.

      To learn how to install the driver and configure your C# application, see the
      :driver:`Get Started </csharp/current/get-started>`
      tutorial in the MongoDB C# Driver documentation.
   
   .. step:: Define the index.

      Paste the following code into the ``CreateStaticIndex.cs`` file.

      .. literalinclude:: /includes/fts/synonyms/CreateStaticIndex.cs
         :caption: CreateStaticIndex.cs
         :language: csharp
         :linenos:
         :copyable:
   
   .. step:: Create the index.
   
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            dotnet run CreateStaticIndex.cs

         .. output::
            :visible: false

            New index name: default