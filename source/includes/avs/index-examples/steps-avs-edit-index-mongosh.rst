.. procedure:: 
   :style: normal 

   .. step:: Connect to the |service| {+cluster+} using {+mongosh+}. 

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
                 "type": "vector",
                 "numDimensions": <number-of-dimensions>,
                 "path": "<field-to-index>",
                 "similarity": "euclidean | cosine | dotProduct"
               },
               {
                 "type": "filter",
                 "path": "<field-to-index>"
               },
               ...
             ]
           }
         );
         