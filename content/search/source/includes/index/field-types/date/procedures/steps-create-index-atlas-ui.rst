Define the Index for the |fts-field-type| Type  
----------------------------------------------

Choose your preferred configuration method in the {+atlas-ui+} and then select the database and collection.

.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib

      .. include:: /includes/index/shared/facts/fts-vib-index-definition-advanced.rst 

   .. tab:: JSON Editor 
      :tabid: jsonib

      .. include:: /includes/index/shared/facts/fts-jsonib-index-definition.rst   

      .. code-block:: json 

         {
           "mappings": {
             "dynamic": true | false,
             "field-name": {
               "<field>": {
                 "type": "date"
               }
             }
           }
         }
