.. procedure:: 
   :style: normal 

   .. step:: Connect to the cluster using {+mongosh+}. 

      To learn more, see :ref:`connect-mongo-shell`.

   .. step:: Switch to the database that contains the collection for which you want to update the index. 

   .. step:: Run the ``db.collection.updateSearchIndex()`` method. 

      The :method:`db.collection.updateSearchIndex()` method has the
      following syntax:   

      .. code-block:: shell 
         :copyable: true 
         :linenos: 

         db.<collectionName>.updateSearchIndex(
           "<index-name>",
           {
             fields: [
               {
                 "type": "autoEmbed",
                 "modality": "text",
                 "path": "<field-to-index>",
                 "model": "<embedding-model>",
               },
               {
                 "type": "filter",
                 "path": "<field-to-index>"
               },
               ...
             ]
           }
         );
         
      .. note:: 

         You can add text fields to index as the ``autoEmbed`` type, but 
         you can't replace or delete existing ``autoEmbed`` type fields in 
         the index definition.