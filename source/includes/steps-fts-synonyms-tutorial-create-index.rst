.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst

   .. include:: /includes/nav/steps-configure-index.rst

   .. step:: Modify the default index definition.

      To run the simple example query only, use the index definition in 
      the **Single Synonym Mapping** tab below. If you have an ``M10`` or 
      higher {+cluster+} and if you loaded both the example synonyms source 
      collections, you can run both the simple and advanced example queries 
      using the index definition that specifies multiple synonym mappings 
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
      
            .. tabs:: 
      
               .. tab:: Visual Editor 
                  :tabid: vib
      
                  a. Click :guilabel:`Refine Your Index`.
                  #. Click :guilabel:`Add Field` in the :guilabel:`Field
                     Mappings` section.
                  #. Click :guilabel:`Customized Configuration`.
                  #. Configure the following fields in the :guilabel:`Add
                     Field Mapping` window and click :guilabel:`Add` after: 
      
                     .. list-table:: 
                        :header-rows: 1
                        :widths: 20 80
       
                        * - UI Field Name 
                          - Configuration 
      
                        * - :guilabel:`Field Name`
                          - Enter ``title``.
      
                        * - :guilabel:`Enable Dynamic Mapping`
                          - Toggle to :guilabel:`Off`.
      
                        * - :guilabel:`Data Type Configuration` 
                          - i. Click :guilabel:`Add Data Type`.
                            #. Select :guilabel:`String`.
                            #. For :guilabel:`Index Analyzer` and
                               :guilabel:`Search Analyzer`, click the dropdown
                               to select :guilabel:`lucene.english` from the
                               :guilabel:`lucene.language` analyzers dropdown.
      
                     For all other fields not listed above, accept the
                     default.
      
                  #. Click :guilabel:`Add Synonym Mapping` in the
                     :guilabel:`Synonym Mappings` section.
                     
                  #. Configure the following fields in the :guilabel:`Add
                     Synonym Mapping` window and click :guilabel:`Add` after:
      
                     .. list-table:: 
                        :header-rows: 1
                        :widths: 20 80
       
                        * - UI Field Name 
                          - Configuration
      
                        * - :guilabel:`Synonym Mapping Name`
                          - Enter ``transportSynonyms``.
      
                        * - :guilabel:`Synonym Source Collection`
                          - Select ``transport_synonyms``.
      
                        * - :guilabel:`Analyzer`
                          - Select ``lucene.english``.
      
                  #. Click :guilabel:`Save Changes`.
      
               .. tab:: JSON Editor 
                  :tabid: jsonib
      
                  a. Replace the default index definition with the following index 
                     definition.
      
                     .. code-block:: json 
         
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
      
                  #. Click :guilabel:`Next`.
      
         .. tab:: Multiple Synonym Mappings
            :tabid: multiple 
      
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
      
            .. tabs:: 
      
               .. tab:: Visual Editor 
                  :tabid: vib
      
                  a. Click :guilabel:`Refine Your Index`.
                  #. Click :guilabel:`Add Field` in the :guilabel:`Field
                     Mappings` section.
                  #. Configure the following fields in the :guilabel:`Add
                     Field Mapping` window and then click :guilabel:`Add`: 
      
                     .. list-table:: 
                        :header-rows: 1
                        :widths: 20 80
       
                        * - UI Field Name 
                          - Configuration 
      
                        * - :guilabel:`Field Name`
                          - Enter ``title``.
      
                        * - :guilabel:`Enable Dynamic Mapping`
                          - Toggle to :guilabel:`Off`.
      
                        * - :guilabel:`Data Type Configuration` 
                          - i. Select :guilabel:`String`.
                            #. For :guilabel:`Index Analyzer` and
                               :guilabel:`Search Analyzer`, click the dropdown
                               to select :guilabel:`lucene.english` from the
                               :guilabel:`lucene.language` analyzers dropdown.
      
                     For all other fields not listed above, accept the
                     default.
      
                  #. Click :guilabel:`Add Synonym Mapping` in the
                     :guilabel:`Synonym Mappings` section.
                     
                  #. Configure the following fields in the :guilabel:`Add
                     Synonym Mapping` window and then click :guilabel:`Add`:
      
                     .. list-table:: 
                        :header-rows: 1
                        :widths: 20 80
       
                        * - UI Field Name 
                          - Configuration
      
                        * - :guilabel:`Synonym Mapping Name`
                          - Enter ``transportSynonyms``.
      
                        * - :guilabel:`Synonym Source Collection`
                          - Select ``transport_synonyms``.
      
                        * - :guilabel:`Analyzer`
                          - Select ``lucene.english``.
      
                  #. Click :guilabel:`Add Synonym Mapping` again in the
                     :guilabel:`Synonym Mappings` section.
                     
                  #. Configure the following fields in the :guilabel:`Add
                     Synonym Mapping` window and click :guilabel:`Add` after:
      
                     .. list-table:: 
                        :header-rows: 1
                        :widths: 20 80
       
                        * - UI Field Name 
                          - Configuration
      
                        * - :guilabel:`Synonym Mapping Name`
                          - Enter ``attireSynonyms``.
      
                        * - :guilabel:`Synonym Source Collection`
                          - Select ``attire_synonyms``.
      
                        * - :guilabel:`Analyzer`
                          - Select ``lucene.english``.
      
                  #. Click :guilabel:`Save Changes`.
      
               .. tab:: JSON Editor 
                  :tabid: jsonib
      
                  a. Replace the default index definition with the following index 
                     definition.
      
                     .. code-block:: json 
         
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
      
                  #. Click :guilabel:`Next`.
      
   .. step:: Click :guilabel:`Create Search Index`.

   .. step:: Close the :guilabel:`You're All Set!` Modal Window.
      
      A modal window appears to let you know your index is building. Click 
      the :guilabel:`Close` button.
      
   .. step:: Wait for the index to finish building.
      
      The index should take about one minute to build. While it is
      building, the :guilabel:`Status` column reads ``Build in
      Progress``. When it is finished building, the
      :guilabel:`Status` column reads ``Active``.   
