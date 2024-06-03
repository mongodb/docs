.. procedure:: 
   :style: normal 

   .. step:: Connect to the |service| {+cluster+} using {+mongosh+}. 

      To learn more, see :ref:`connect-mongo-shell`.

   .. step:: Switch to the database that contains the collection. 

   .. step:: Run the ``db.collection.dropSearchIndex()`` method. 

      The :method:`db.collection.dropSearchIndex()` method has the
      following syntax:   

      .. code-block:: shell 
         :copyable: true 
         :linenos: 

         db.<collectionName>.dropSearchIndex( "<index-name>" );
         