Create the |fts| Index   
-----------------------------

.. procedure:: 
   :style: normal 

   .. step:: Define the index.

      To run the simple example query only, use the index definition in 
      the **Single Synonym Mapping** tab below. If you have an ``M10`` or 
      higher {+cluster+} and if you loaded both the example synonyms source 
      collections, you can run both the simple and advanced example queries 
      using the index definition that specifies multiple synonym mappings 
      in the **Multiple Synonym Mappings** tab below.
      
      .. tabs:: 
      
         .. tab:: Single Synonym Mapping
            :tabid: single 

            Paste the following code into the ``Program.cs`` file.
            
            The following index definition specifies: 
      
            - The :ref:`language analyzer <ref-language-analyzers>` 
              ``lucene.english`` as the default analyzer for both indexing 
              and querying the ``title`` field.
            - The name ``transportSynonyms`` as the name for this synonym 
              mapping.
            - The ``transport_synonyms`` collection as the source synonyms 
              collection to look for synonyms for queries using 
              ``transportSynonyms`` mapping. ``transportSynonyms`` can be 
              used in text queries over any field indexed with the 
              ``lucene.english`` analyzer (including the ``title`` field, 
              in this example). 

            .. literalinclude:: /includes/fts/tutorials/synonyms/CreateIndex.cs
               :caption: Program.cs
               :language: csharp
               :linenos:
               :copyable:

         .. tab:: Multiple Synonym Mappings
            :tabid: multiple

            Paste the following code into the ``Program.cs`` file.
            
            The following index definition specifies:
            
            - The :ref:`language analyzer <ref-language-analyzers>` 
              ``lucene.english`` as the default analyzer for both indexing 
              and querying the ``title`` field.
            - Two synonym mappings: ``transportSynonyms`` and ``attireSynonyms``.
            - The ``transport_synonyms`` collection as the source for the 
              ``transportSynonyms`` mapping.
            - The ``attire_synonyms`` collection as the source for the
              ``attireSynonyms`` mapping.

            .. literalinclude:: /includes/fts/tutorials/synonyms/CreateIndexMultiple.cs
               :caption: Program.cs
               :language: csharp
               :linenos:
               :copyable: 

      .. include:: /includes/search-shared/find-connection-string.rst
   
   .. step:: Create the index.
   
      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            dotnet run Program.cs

         .. output::
            :visible: false

            New index name: default