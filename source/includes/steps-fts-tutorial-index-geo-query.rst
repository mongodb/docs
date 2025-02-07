.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst

   .. include:: /includes/nav/steps-configure-index.rst
      
   .. step:: Define an index on the ``address`` field.
      
      You can use the |fts| :guilabel:`Visual Editor` or the |fts| :guilabel:`JSON 
      Editor` in the |service| user interface to create the index. The
      following index definition specifies that |fts| must index: 
        
      - All of the fields in the collection automatically.
      - The ``address.location`` field of a ``document`` as type ``geo``. 
      
      .. tabs:: 
      
         .. tab:: Visual Editor
            :tabid: vib
      
            a. Click :guilabel:`Refine Your Index`.
            #. In the :guilabel:`Field Mappings` section, click
               :guilabel:`Add Field` to open the :guilabel:`Add Field 
               Mapping` > :guilabel:`Customized Configuration` tab. 
            #. Select :guilabel:`address.location` from the :guilabel:`Field
               Name` dropdown. 
            #. Click the :guilabel:`Data Type` dropdown and select
               :guilabel:`Geo`. 
            #. Click :guilabel:`Add`.
            #. Click :guilabel:`Save Changes`.
      
         .. tab:: JSON Editor
            :tabid: jsonib
      
            a. Replace the default index definition with the following
               example index definition.
      
               .. code-block::
      
                  {
                    "mappings": {
                      "dynamic": true,
                      "fields": {
                        "address": {
                          "fields": {
                            "location": {
                              "type": "geo"
                            }
                          },
                          "type": "document"
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
