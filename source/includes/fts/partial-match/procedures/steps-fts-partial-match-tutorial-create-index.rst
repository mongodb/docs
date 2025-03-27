.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst
    
   .. include:: /includes/nav/steps-configure-index.rst

   .. step:: Define an index on the ``plot`` field.

      You can use the |fts| :guilabel:`Visual Editor` or the |fts| :guilabel:`JSON 
      Editor` in the |service| user interface to create the index. 
      
      .. tabs:: 
      
         .. tab:: Visual Editor
            :tabid: vib
      
            a. Click :guilabel:`Refine Your Index`.
            #. In the :guilabel:`Index Configurations` section, toggle to
               disable :guilabel:`Dynamic Mapping`. 
            #. In the :guilabel:`Field Mappings` section, click
            #. :guilabel:`Add Field` to display the :guilabel:`Add Field
               Mapping` window.
            #.  
      
               .. tabs:: 
      
                  .. tab:: autocomplete
                     :tabid: autocomplete
      
                     i. Click :guilabel:`Quick Start for Text Fields`. 
                     #. Select the :guilabel:`Search-as-you-type`
                        template from the dropdown and review the
                        default settings. 
      
                        To learn more about these settings, see 
                        :ref:`bson-data-types-autocomplete`.
      
                  .. tab:: phrase
                     :tabid: phrase
      
                     i. Click :guilabel:`Quick Start for Text Fields`. 
                     #. Select the :guilabel:`Full Text Search` template
                        from the dropdown and review the default
                        settings. 
      
                        To learn more about these settings, see 
                        :ref:`bson-data-types-string`.
      
                  .. tab:: regex
                     :tabid: regex
      
                     i. Select :guilabel:`Customized Configuration` from
                        the dropdown. 
                     #. Select :guilabel:`String` from the
                        :guilabel:`Data Type` dropdown to run the query
                        using the :ref:`wildcard-ref` operator. 

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
      
                     i. Select :guilabel:`Customized Configuration` from
                        the dropdown. 
                     #. Select :guilabel:`String` from the
                        :guilabel:`Data Type` dropdown to run the query
                        using the :ref:`wildcard-ref` operator. 

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
 
            #. Select ``plot`` from the :guilabel:`Field Name` dropdown.
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
