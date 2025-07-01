.. tabs::

   .. tab:: JSON Mode
      :tabid: json-mode

      .. procedure:: 
         :style: normal 

         .. include:: /includes/nav/steps-db-deployments-page.rst
         
         .. include:: /includes/nav/steps-data-explorer.rst

         .. step:: Open the :guilabel:`Add Data` drop-down menu. 
            
            In the drop-down menu, select :guilabel:`Insert Document`.

            The document editor appears with the ``_id`` field, which contains 
            an :ref:`objectid` value that reflects the time when the document 
            was created, not when it was inserted. As such, the ``ObjectId`` 
            does not represent a strict insertion order.

         .. step:: Modify the document. 

            Type or paste the documents you want to insert into your 
            collection. To insert multiple documents, enter a comma-separated 
            array of JSON documents. 

            For example, the following array inserts 5 documents into
            the collection: 
             
            .. code-block:: json
             
               [
                  { "_id" : 8752, "title" : "Divine Comedy", "author" : "Dante", "copies" : 1 },
                  { "_id" : 7000, "title" : "The Odyssey", "author" : "Homer", "copies" : 10 },
                  { "_id" : 7020, "title" : "Iliad", "author" : "Homer", "copies" : 10 },
                  { "_id" : 8645, "title" : "Eclogues", "author" : "Dante", "copies" : 2 },
                  { "_id" : 8751, "title" : "The Banquet", "author" : "Dante", "copies" : 2 }
               ]
            
         .. step:: Click :guilabel:`Insert`. 

   .. tab:: Field-by-Field Editor
      :tabid: field-by-field

      .. procedure:: 
         :style: normal 

         .. include:: /includes/nav/steps-db-deployments-page.rst
         
         .. include:: /includes/nav/steps-data-explorer.rst

         .. step:: Open the :guilabel:`Add Data` drop-down menu. 
            
            In the drop-down menu, select :guilabel:`Insert Document`.

            The document editor appears with the ``_id`` field, which contains 
            an :ref:`objectid` value that reflects the time when the document 
            was created, not when it was inserted. As such, the ``ObjectId`` 
            does not represent a strict insertion order.

         .. step:: Open the editor in Field-by-Field mode.

            In the document editor, click the :icon-lg:`Menu` icon in the 
            :guilabel:`View` toggle. 

         .. step:: Add new fields.
            
            To add a new field, hover over the field row number of an existing 
            field and click the :icon-lg:`Plus` icon.

         .. step:: Modify the document field.

            For each field in the document, fill in the field name, set a field 
            value, and select a field type. 

            .. note:: 

               To change the ``_id`` field to a custom value, change the field 
               type from ``ObjectId`` to ``string``. You can then overwrite the 
               ``_id`` value.

         .. step:: Click :guilabel:`Insert`.
