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
      
      a. In the :guilabel:`Index Name` field, enter ``partial-match-tutorial``.
      
         .. include:: /includes/default-fts-index-name.rst 
      
      #. In the :guilabel:`Database and Collection` section, find the 
         ``sample_mflix`` database, and select the ``movies`` collection.
      
   .. step:: Define an index on the ``plot`` field.

      You can use the |fts| :guilabel:`Visual Editor` or the |fts| :guilabel:`JSON 
      Editor` in the |service| user interface to create the index. 
      
      .. tabs:: 
      
         .. tab:: Visual Editor
            :tabid: vib
      
            a. Click :guilabel:`Next`.
            #. Click :guilabel:`Refine Your Index`.
            #. In the :guilabel:`Index Configurations` section, toggle to
               disable :guilabel:`Dynamic Mapping`. 
            #. In the :guilabel:`Field Mappings` section, click
            #. :guilabel:`Add Field` to display the :guilabel:`Add Field
               Mapping` window. 
            #. Select ``plot`` from the :guilabel:`Field Name` dropdown.
            #. Click the :guilabel:`Data Type` dropdown to specify the field
               type and the settings for the operator you want to use to run
               the query. 
      
               .. tabs:: 
      
                  .. tab:: autocomplete
                     :tabid: autocomplete
      
                     i. Select :guilabel:`Autocomplete` from the dropdown to
                        run the query using the :ref:`autocomplete-ref` operator.
      
                     #. Modify the default settings for the data type as shown 
                        below:
      
                        .. list-table:: 
                           :header-rows: 1
                           :widths: 20 80
       
                           * - UI Field Name 
                             - Configuration
      
                           * - :guilabel:`Max Grams`
                             - ``15``
      
                           * - :guilabel:`Min Grams`
                             - ``2``
      
                           * - :guilabel:`Tokenization`
                             - :guilabel:`edgeGram`
      
                           * - :guilabel:`Fold Diacritics`
                             - :guilabel:`true`
      
                        To learn more about these settings, see 
                        :ref:`bson-data-types-autocomplete`.
      
                  .. tab:: phrase
                     :tabid: phrase
      
                     i. Select :guilabel:`String` from the dropdown to run
                        the query using the :ref:`phrase-ref` operator.
      
                     #. Modify the default settings for the data type as shown 
                        below:
      
                        .. list-table:: 
                           :header-rows: 1
                           :widths: 20 80
       
                           * - UI Field Name 
                             - Configuration
      
                           * - :guilabel:`Index Analyzer`
                             - ``lucene.standard``
      
                           * - :guilabel:`Search Analyzer`
                             - ``lucene.standard``
      
                           * - :guilabel:`Index Options`
                             - :guilabel:`offsets`
      
                           * - :guilabel:`Store`
                             - :guilabel:`true`
      
                           * - :guilabel:`Ignore Above`
                             - None
      
                           * - :guilabel:`Norms`
                             - :guilabel:`include`
      
                        To learn more about these settings, see 
                        :ref:`bson-data-types-string`.
      
                  .. tab:: regex
                     :tabid: regex
      
                     i. Select :guilabel:`String` from the dropdown to run
                        the query using the :ref:`regex-ref` operator.
      
                     #. Modify the default settings for the data type as shown 
                        below:
      
                        .. list-table:: 
                           :header-rows: 1
                           :widths: 20 80
       
                           * - UI Field Name 
                             - Configuration
      
                           * - :guilabel:`Index Analyzer`
                             - ``lucene.keyword``
      
                           * - :guilabel:`Search Analyzer`
                             - ``lucene.keyword``
      
                           * - :guilabel:`Index Options`
                             - :guilabel:`offsets`
      
                           * - :guilabel:`Store`
                             - :guilabel:`true`
      
                           * - :guilabel:`Ignore Above`
                             - None
      
                           * - :guilabel:`Norms`
                             - :guilabel:`include`
      
                        To learn more about these settings, see 
                        :ref:`bson-data-types-string`.
      
                  .. tab:: wildcard
                     :tabid: wildcard
      
                     i. Select :guilabel:`String` from the dropdown to run
                        the query using the :ref:`wildcard-ref` operator.
      
                     #. Modify the default settings for the data type as shown 
                        below:
      
                        .. list-table:: 
                           :header-rows: 1
                           :widths: 20 80
       
                           * - UI Field Name 
                             - Configuration
      
                           * - :guilabel:`Index Analyzer`
                             - ``lucene.keyword``
      
                           * - :guilabel:`Search Analyzer`
                             - ``lucene.keyword``
      
                           * - :guilabel:`Index Options`
                             - :guilabel:`offsets`
      
                           * - :guilabel:`Store`
                             - :guilabel:`true`
      
                           * - :guilabel:`Ignore Above`
                             - None
      
                           * - :guilabel:`Norms`
                             - :guilabel:`include`
      
                        To learn more about these settings, see 
                        :ref:`bson-data-types-string`.
      
            #. Click :guilabel:`Add` to add the field to the list in
               :guilabel:`Field Mappings` section. 
            #. Click :guilabel:`Save Changes`. 
      
         .. tab:: JSON Editor
            :tabid: jsonib
      
            a. Replace the default index definition with the following example 
               index definition for the operator you intend to use for running 
               the query.
      
               .. tabs:: 
      
                  .. tab:: autocomplete
                     :tabid: autocomplete
      
                     .. code-block:: json
      
                        {
                          "mappings": {
                            "dynamic": false,
                            "fields": {
                              "plot": [
                                {
                                  "type": "autocomplete",
                                  "tokenization": "edgeGram",
                                  "minGrams": 2,
                                  "maxGrams": 15,
                                  "foldDiacritics": true
                                }
                              ]
                            }
                          }
                        }
      
                  .. tab:: phrase
                     :tabid: phrase
      
                     .. code-block:: json
      
                        {
                          "mappings": {
                            "fields": {
                              "plot": {
                                "analyzer": "lucene.standard",
                                "type": "string"
                              }
                            }
                          }
                        }
      
                  .. tab:: regex
                     :tabid: regex
      
                     .. code-block:: json
      
                        {
                          "mappings": {
                            "fields": {
                              "plot": {
                                "analyzer": "lucene.keyword",
                                "type": "string"
                              }
                            }
                          }
                        }
      
                  .. tab:: wildcard
                     :tabid: wildcard
      
                     .. code-block:: json
      
                        {
                          "mappings": {
                            "fields": {
                              "plot": {
                                "analyzer": "lucene.keyword",
                                "type": "string"
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
