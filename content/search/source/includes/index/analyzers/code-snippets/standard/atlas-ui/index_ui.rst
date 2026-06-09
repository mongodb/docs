.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib

      1. Click :guilabel:`Refine Your Index` to configure your index.
      #. In the :guilabel:`Index Configurations` section, toggle 
         :guilabel:`Dynamic Mapping` to :guilabel:`off`.   
      #. In the :guilabel:`Field Mappings` section, click
         :guilabel:`Add Field Mapping` to open the :guilabel:`Add Field
         Mapping` window. 
      #. Click :guilabel:`Customized Configuration`.
      #. Select ``title`` from the :guilabel:`Field Name` dropdown.
      #. Click the :guilabel:`Data Type` dropdown and select
         :guilabel:`String` if it isn't already selected. 
      #. Expand :guilabel:`String Properties` and make the following 
         changes: 

         .. list-table:: 
            :stub-columns: 1

            * - Index Analyzer 
              - Select ``lucene.standard`` from the dropdown if it isn't
                already selected. 
      
            * - Search Analyzer 
              - Select ``lucene.standard`` from the dropdown if it isn't
                already selected.

            * - Index Options 
              - Use the default ``offsets``.

            * - Store 
              - Use the default ``true``.

            * - Ignore Above 
              - Keep the default setting.

            * - Norms 
              - Use the default ``include``.
      
      #. Click :guilabel:`Add`.
      #. Click :guilabel:`Save Changes`.
      #. Click :guilabel:`Create Search Index`.

   .. tab:: JSON Editor 
      :tabid: jsonib

      2. Replace the default index definition with the following index
         definition. 

         .. code-block:: json
            :copyable: true
            :emphasize-lines: 6

            {
              "mappings": {
                "fields": {
                  "title": {
                    "type": "string",
                    "analyzer": "lucene.standard"
                  }
                }
              }
            }
      
      #. Click :guilabel:`Next`.
      #. Click :guilabel:`Create Search Index`.