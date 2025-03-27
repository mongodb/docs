.. procedure:: 
   :style: normal 

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst
  
   .. include:: /includes/nav/steps-configure-index.rst
    
   .. step:: Define the |fts| index. 

      The following index definition configures index for the following
      fields:  
          
      - ``title`` field as the :ref:`string <bson-data-types-string>`
        type for full-text search against the field
      - ``genres`` field as the :ref:`stringFacet
        <bson-data-types-string-facet>` type for faceted search against
        the field
      - ``released`` field as the :ref:`date <bson-data-types-date>` type
        for sorting the results using the field 

      You can use the |fts| :guilabel:`Visual Editor` or the |fts| :guilabel:`JSON 
      Editor` in the |service| user interface to create the index.

      .. tabs:: 
  
         .. tab:: Visual Editor
            :tabid: vib
  
            a. Click :guilabel:`Refine Your Index`.
            #. In the :guilabel:`Index Configurations` section, toggle to
               disable :guilabel:`Dynamic Mapping`. 
            #. Click :guilabel:`Add Field` in the :guilabel:`Field
               Mappings` section and click :guilabel:`Add` after
               configuring the settings for the following fields, one by
               one, in the :guilabel:`Add Field Mapping` window
               :guilabel:`Customized Configuration` tab. 

               .. list-table:: 
                  :header-rows: 1
                  :widths: 20 80

                  * - Field Name 
                    - Data Type Configuration
               
                  * - ``title`` 
                    - :guilabel:`String` 
             
                  * - ``genres`` 
                    - :guilabel:`stringFacet` 

                  * - ``released`` 
                    - :guilabel:`Date`

            #. Click :guilabel:`Save Changes`.

         .. tab:: JSON Editor
            :tabid: jsonib
  
            a. Replace the default index definition with the following definition.

               .. code-block:: json 
                  :copyable: true 
                  :linenos: 

                  {
                    "mappings": {
                      "dynamic": false,
                      "fields": {
                        "title": {
                          "type": "string"
                        },
                        "genres": {
                          "type": "stringFacet"
                        },
                        "released": {
                          "type": "date"
                        }
                      }
                    }
                  }

            #. Click :guilabel:`Next`.

   .. step:: Click :guilabel:`Create Search Index`.

      A modal window displays to let you know that your index is building.

   .. step:: Close the :guilabel:`You're All Set!` modal window by clicking :guilabel:`Close` and wait for the index to finish building. 

      The index should take about one minute to build. While it is
      building, the :guilabel:`Status` column reads :guilabel:`Initial
      Sync`. When it is finished building, the :guilabel:`Status` column
      reads :guilabel:`Active`. 
