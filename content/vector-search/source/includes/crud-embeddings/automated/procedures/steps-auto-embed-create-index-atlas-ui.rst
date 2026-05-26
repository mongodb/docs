.. procedure:: 
   :style: normal 

   .. include:: /includes/shared/procedures/steps-db-deployments-page.rst

   .. include:: /includes/shared/procedures/steps-atlas-search.rst

   .. step:: Start your index configuration.

      Make the following selections on the page and then click
      :guilabel:`Next`.

      .. list-table:: 
         :widths: 25 75

         * - :guilabel:`Search Type`
           - Select the :guilabel:`Vector Search` index type.

         * - :guilabel:`Index Name and Data Source`
           - Specify the following information:
              
             - :guilabel:`Index Name`: <INDEX-NAME>
             - :guilabel:`Database and Collection`:
                    
               - <DATABASE-NAME>
               - <COLLECTION-NAME>

         * - :guilabel:`Configuration Method`
           - Select :guilabel:`JSON Editor`. 

      .. example:: 

         For example, enter |index-name| for the index name and
         select |database-name| and |collection-name| from 
         the :guilabel:`Database and Collection` dropdown.
    
   .. step:: Define your index.

      In the JSON editor, enter the following index definition:

      .. code-block:: json 
         :linenos: 
         :emphasize-lines: 3-7

         {
           "fields": [
             {
               "type": "text",
               "path": "<FIELD-NAME>",
               "model": "voyage-3-large | voyage-3.5 | voyage-3.5-lite" 
             }
           ]
         }             

      .. example:: 

         For example, to create an index that enables automated
         embeddings by using the ``voyage-3-large`` model for the
         ``fullplot`` field in the collection, enter the
         following:  

         .. code-block:: json 
            :linenos: 
            :emphasize-lines: 3-7

            {
              "fields": [
                {
                  "type": "text",
                  "path": "fullplot",
                  "model": "voyage-3-large"
                }
              ]
            }

   .. step:: Create your index. 

      a. Click :guilabel:`Next`.
      #. Review your index configuration and click 
         :guilabel:`Create Vector Search Index`.

      .. note:: 

         The index creation can take some time to complete.
         When the index is being created, the :guilabel:`Status`
         column in the {+atlas-ui+} displays :guilabel:`Pending`.
         When the index creation completes, the :guilabel:`Status`
         column in the {+atlas-ui+} displays :guilabel:`Ready`.
