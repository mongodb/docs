.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst
      
   .. step:: Click :guilabel:`Create Search Index`.

   .. step:: Select an |fts| :guilabel:`Configuration Method` and click :guilabel:`Next`.
      
      - For a guided experience, select the |fts| :guilabel:`Visual Editor`.
      - To edit the raw index definition, select the |fts|
        :guilabel:`JSON Editor`.
      
   .. step:: Enter the :guilabel:`Index Name`, and set the :guilabel:`Database and Collection`.
      
      a. In the :guilabel:`Index Name` field, enter ``multilingual-tutorial``.
      
         .. include:: /includes/default-fts-index-name.rst 
      
      #. In the :guilabel:`Database and Collection` section, find the 
         ``sample_mflix`` database, and select the ``movies`` collection.
      
   .. step:: Specify an index definition.
      
      You can use the |fts| :guilabel:`Visual Editor` or the |fts| :guilabel:`JSON 
      Editor` in the |service| user interface to create the index. You can
      set up the index to analyze the ``fullplot`` field using the Italian
      language only or using both Italian and English languages.
      
      .. tabs:: 
      
         .. tab:: Visual Editor
            :tabid: vib
      
            a. Click :guilabel:`Refine Your Index`.
            #. In the :guilabel:`Field Mappings` section, click
               :guilabel:`Add Field` to display the :guilabel:`Add
               Field Mapping` window. 
            #. Select ``fullplot`` for the :guilabel:`Field Name`.
            #. In the settings for the data type, you can configure whether
               to analyze the field using the Italian language only or using
               both Italian and English languages. 
      
               .. tabs:: 
      
                  .. tab:: Italian
                     :tabid: one language
                  
                     #. Click the :guilabel:`Data Type` dropdown and select
                        :guilabel:`String`. 
                     #. Modify the the :guilabel:`Index Analyzer` and
                        :guilabel:`Search Analyzer` to use ``lucene.italian``
                        analyzer. 
      
                        i. From the :guilabel:`Index Analyzer` dropdown, select
                           ``lucene.language`` and then ``lucene.italian``. 
         
                        #. If :guilabel:`Search Analyzer` didn't automatically
                           update, from the :guilabel:`Search Analyzer`
                           dropdown, select ``lucene.language`` and then
                           ``lucene.italian``. 
      
                  .. tab:: Italian and English
                     :tabid: two languages
      
                     #. Click the :guilabel:`Data Type` dropdown and select
                        :guilabel:`String`.
                     #. Modify the the :guilabel:`Index Analyzer` and
                        :guilabel:`Search Analyzer` to use ``lucene.italian``
                        analyzer. 
      
                        i. From the :guilabel:`Index Analyzer` dropdown, select
                           ``lucene.language`` and then ``lucene.italian``. 
         
                        #. If :guilabel:`Search Analyzer` didn't automatically
                           update, from the :guilabel:`Search Analyzer`
                           dropdown, select ``lucene.language`` and then
                           ``lucene.italian``. 
      
                     #. Click :guilabel:`Add Multi Field` to define another data type
                        for the ``fullplot`` field. 
                     #. Enter ``fullplot_english`` in the :guilabel:`Multi Field
                        Name` field. 
                     #. Modify the the :guilabel:`Index Analyzer` and
                        :guilabel:`Search Analyzer` to use ``lucene.english``
                        analyzer. 
      
                        i. From the :guilabel:`Index Analyzer` dropdown, select
                           ``lucene.language`` and then ``lucene.english``. 
         
                        #. If :guilabel:`Search Analyzer` didn't automatically
                           update, from the :guilabel:`Search Analyzer`
                           dropdown, select ``lucene.language`` and then
                           ``lucene.english``.
      
            #. Click :guilabel:`Add`.
            #. In the :guilabel:`Index Configurations` section, ensure 
               the following settings and make changes if needed: 
               
               - Use ``lucene.standard`` for :guilabel:`Index Analyzer` and
                 :guilabel:`Search Analyzer`
               - Enable :guilabel:`Dynamic Mapping`
      
            #. Click :guilabel:`Save Changes`.
      
         .. tab:: JSON Editor
            :tabid: jsonib 
      
            a. Replace the default definition with the following:
      
               .. tabs:: 
      
                  .. tab:: Italian
                     :tabid: one language
      
                     .. code-block:: json 
      
                        {
                          "analyzer": "lucene.standard",
                          "searchAnalyzer": "lucene.standard",
                          "mappings": {
                            "dynamic": true,
                            "fields": {
                              "fullplot": [
                                {
                                  "analyzer": "lucene.italian",
                                  "searchAnalyzer": "lucene.italian",
                                  "type": "string"
                                }
                              ]
                            }
                          }
                        }
      
                  .. tab:: Italian and English
                     :tabid: two languages
      
                     .. code-block:: json 
      
                        {
                          "analyzer": "lucene.standard",
                          "searchAnalyzer": "lucene.standard",
                          "mappings": {
                            "dynamic": true,
                            "fields": {
                              "fullplot": {
                                "type": "string",
                                "analyzer": "lucene.italian",
                                "searchAnalyzer": "lucene.italian",
                                "multi": {
                                  "fullplot_english": {
                                    "type": "string",
                                    "analyzer": "lucene.english",
                                    "searchAnalyzer": "lucene.english"
                                  }
                                }
                              }
                            }
                          }
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
