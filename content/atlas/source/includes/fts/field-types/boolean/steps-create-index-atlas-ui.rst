Define the Index for the |fts-field-type| Type  
----------------------------------------------

Choose your preferred configuration method in the {+atlas-ui+} and then select the database and collection.

.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib

      .. include:: /includes/fts/extracts/fts-vib-index-definition-advanced.rst 

   .. tab:: JSON Editor 
      :tabid: jsonib

      .. include:: /includes/fts/extracts/fts-jsonib-index-definition.rst   

      .. code-block:: json 

         {
           "mappings": {
             "dynamic": true|false,
             "fields": {
               "<field-name>": {
                 "type": "boolean",
               }
             }
           }
         }
