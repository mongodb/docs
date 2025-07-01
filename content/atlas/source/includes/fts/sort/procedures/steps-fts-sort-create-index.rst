.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst

   .. include:: /includes/nav/steps-configure-index.rst
      
   .. step:: Specify an index definition.

      The following index definition:   
      
      - Indexes the ``awards.wins`` field as the :ref:`number
        <bson-data-types-number>` type for both querying and sorting the
        results by the field. 
      - Indexes the ``released`` field as the :ref:`date
        <bson-data-types-date>` type for both querying and sorting the results by 
        the field. 
      - Specifies the :ref:`keyword <ref-keyword-analyzer>` analyzer for both
        indexing and searching the ``title`` field, and indexes the
        ``title`` field as the following types:  
      
        - :ref:`string <bson-data-types-string>` type for querying the field.
        - :ref:`token <bson-data-types-token>` type for sorting the results
          by the field.
      
        You can use the |fts| :guilabel:`Visual Editor` or the |fts| :guilabel:`JSON 
        Editor` in the {+atlas-ui+} to create the index.
      
      .. tabs:: 
      
         .. tab:: Visual Editor
            :tabid: vib
      
            a. Click :guilabel:`Refine Your Index`.
            #. In the :guilabel:`Index Configurations` section, toggle to
               disable :guilabel:`Dynamic Mapping`. 
            #. In the :guilabel:`Field Mappings` section, click
               :guilabel:`Add Field` to display the :guilabel:`Add Field
               Mapping` window. 
            #. Click :guilabel:`Customized Configuration`.
            #. For the following fields, one at a time, select the field
               name and data type from the corresponding dropdowns,
               configure the properties if any or accept default, and click
               :guilabel:`Add`. 
      
               .. list-table:: 
                  :header-rows: 1 
      
                  * - Field Name 
                    - Data Type 
                    - Properties 
      
                  * - ``awards.wins``
                    - Number
                    - Accept default.
                  
                  * - ``released``
                    - Date
                    - Accept default.
      
                  * - ``title`` 
                    - Token 
                    - Accept default. 
      
                  * - ``title`` 
                    - String 
                    - Select ``lucene.keyword`` from both the
                      :guilabel:`Index Analyzer` and :guilabel:`Search
                      Analyzer` dropdowns. 
      
         .. tab:: JSON Editor
            :tabid: jsonib
      
            a. Replace the default index definition with the following definition.
      
               .. code-block:: json
                  :copyable: true 
      
                  {
                    "mappings": {
                      "dynamic": false,
                      "fields": {
                        "awards": {
                          "dynamic": false,
                          "fields": {
                            "wins": [
                              {
                                "type": "number"
                              }
                            ]
                          },
                          "type": "document"
                        },
                        "released": [
                          {
                            "type": "date"
                          }
                        ],
                        "title": [{
                          "type": "token"
                        }, {
                          "type": "string",
                          "analyzer": "lucene.keyword",
                          "searchAnalyzer": "lucene.keyword"
                        }]
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
