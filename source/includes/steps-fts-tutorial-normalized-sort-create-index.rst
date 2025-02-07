.. procedure:: 
   :style: normal 

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-configure-index.rst

   .. step:: Define the |fts| index.

      The following index definition indexes the ``title`` field as the
      following types: 
          
      - :ref:`token <bson-data-types-token>` type for sorting, which
        uses the ``lowercase`` normalizer to convert the indexed term to
        lowercase.  
      - :ref:`string <bson-data-types-string>` type for querying the
        field. 

      You can use the |fts| :guilabel:`Visual Editor` or the |fts| :guilabel:`JSON 
      Editor` in the |service| user interface to create the index.

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
            #. Select ``title`` from the :guilabel:`Field Name` dropdown.
            #. Select :guilabel:`Token` from the :guilabel:`Data Type`
               dropdown. 
            #. Expand :guilabel:`Token Properties` and select
               ``lowercase`` from the :guilabel:`Normalizer` dropdown.
            #. Click :guilabel:`Add`.
            #. Repeat steps **d** and **e**.
            #. Select :guilabel:`String` from the :guilabel:`Data Type`
               dropdown.
            #. Click :guilabel:`Add`.

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
                        "title": [{
                          "type": "token",
                          "normalizer": "lowercase"
                        },{
                          "type": "string"
                        }]
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
