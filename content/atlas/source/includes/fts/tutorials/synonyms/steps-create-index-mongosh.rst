Create the |fts| Index  
-----------------------------

.. procedure::
   :style: normal
   
   .. step:: Connect to the deployment by using ``mongosh``.
    
      In your terminal, connect to your {+service+} cloud-hosted 
      deployment or local deployment from {+mongosh+}. For detailed 
      instructions on how to connect, see 
      :mongosh:`Connect to a Deployment </connect/>`.

   .. step:: Switch to the database that contains the collection for which you want to create the index. 

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: shell
                
             use sample_mflix

         .. output:: 
            :visible: false
            :language: shell 

            switched to db sample_mflix

   .. step:: Run the ``db.collection.createSearchIndex()`` method to create the index.

      To run the simple example query only, run the command in 
      the **Single Synonym Mapping** tab below. If you have an ``M10`` or 
      higher {+cluster+} and if you loaded both the example synonyms source 
      collections, you can run both the simple and advanced example queries 
      using the command that specifies multiple synonym mappings 
      in the **Multiple Synonym Mappings** tab below.
      
      .. tabs:: 
      
         .. tab:: Single Synonym Mapping
            :tabid: single 
            
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

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: shell

                  db.movies.createSearchIndex(
                    "default",
                      {
                        "mappings": { 
                          "dynamic": false,
                          "fields": {
                            "title": {
                              "analyzer": "lucene.english",
                              "type": "string"
                            }
                          }
                        },
                        "synonyms": [
                          {
                            "analyzer": "lucene.english",
                            "name": "transportSynonyms",
                            "source": {
                              "collection": "transport_synonyms"
                            }
                          }
                        ]
                      }
                  )

               .. output::
                  :visible: false
                  
                  default

            .. include:: /includes/search-shared/find-connection-string.rst

         .. tab:: Multiple Synonym Mappings
            :tabid: multiple
            
            The following index definition specifies:
            
            - The :ref:`language analyzer <ref-language-analyzers>` 
              ``lucene.english`` as the default analyzer for both indexing 
              and querying the ``title`` field.
            - Two synonym mappings: ``transportSynonyms`` and ``attireSynonyms``.
            - The ``transport_synonyms`` collection as the source for the 
              ``transportSynonyms`` mapping.
            - The ``attire_synonyms`` collection as the source for the
              ``attireSynonyms`` mapping.

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: shell

                  db.movies.createSearchIndex(
                    "default",
                      {
                        "mappings": { 
                          "dynamic": false,
                          "fields": {
                            "title": {
                              "analyzer": "lucene.english",
                              "type": "string"
                            }
                          }
                        },
                        "synonyms": [
                          {
                            "analyzer": "lucene.english",
                            "name": "transportSynonyms",
                            "source": {
                              "collection": "transport_synonyms"
                            }
                          },
                          {
                            "analyzer": "lucene.english",
                            "name": "attireSynonyms",
                            "source": {
                              "collection": "attire_synonyms"
                            }
                          }
                        ]
                      }
                  )

               .. output::
                  :visible: false
                  
                  default

            .. include:: /includes/search-shared/find-connection-string.rst