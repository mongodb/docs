Create the |fts| Index  
-----------------------------

.. procedure:: 
   :style: normal

   .. step:: Connect to your cluster using |compass|.

      Open {+Compass+} and connect to your cluster. For
      detailed instructions, see :ref:`atlas-connect-via-compass`. 

   .. step:: Specify the database and collection.

      On the :guilabel:`Database` screen, click the name of the database, then click the name of the collection.

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
            
            a. Click the :guilabel:`Indexes` tab, then select :guilabel:`Search Indexes`. 

            #. Click :guilabel:`Create Atlas Search Index` to open the index creation dialog box.

            #. Name the index, ``default``.

            #. Specify the |json| |fts| index definition. 

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

               .. literalinclude:: /includes/fts/tutorials/synonyms/index-definition-compass.json
                  :copyable: true
                  :language: json
                  :linenos:

            #. Click :guilabel:`Create Search Index`.

         .. tab:: Multiple Synonym Mappings
            :tabid: multiple
            
            a. Click the :guilabel:`Indexes` tab, then select :guilabel:`Search Indexes`. 

            #. Click :guilabel:`Create Atlas Search Index` to open the index creation dialog box.

            #. Name the index, ``default``.

            #. Specify the |json| |fts| index definition. 
            
               The following index definition specifies: 
         
               - The ``lucene.english`` :ref:`language analyzer
                 <ref-language-analyzers>` as the default analyzer for both
                 indexing and querying the ``title`` field.
               - The name ``transportSynonyms`` and ``attireSynonyms`` as the 
                 names for the synonym mappings.
               - The ``transport_synonyms`` collection as the source synonyms 
                 collection to look for synonyms for queries using 
                 ``transportSynonyms`` mapping. ``transportSynonyms`` can be 
                 used in text queries over any field indexed with the 
                 ``lucene.english`` analyzer (including the ``title`` field, 
                 in the sample query in this tutorial).
               - The ``attire_synonyms`` collection as the source synonyms 
                 collection to look for synonyms for queries using 
                 ``attireSynonyms`` mapping. ``attireSynonyms`` can be 
                 used in text queries over any field indexed with the 
                 ``lucene.english`` analyzer (including the ``title`` field, 
                 in the sample query in this tutorial).

               .. literalinclude:: /includes/fts/tutorials/synonyms/index-definition-compass-multiple.json
                  :copyable: true
                  :language: json
                  :linenos:

            #. Click :guilabel:`Create Search Index`.