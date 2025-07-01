.. procedure:: 
   :style: normal 

   .. step:: Connect to the |service| {+cluster+} using {+mongosh+}. 

      To learn more, see :ref:`connect-mongo-shell`.

   .. step:: Switch to the database that contains the collection. 

   .. step:: Run the ``db.collection.getSearchIndexes()`` method. 

      The :method:`db.collection.getSearchIndexes()` method has the
      following syntax:   

      .. code-block:: shell 
         :copyable: true 
         :linenos: 

         db.<collectionName>.getSearchIndexes( "<index-name>" );
         