.. tabs::

   .. tab:: Shell Syntax Mode
      :tabid: shell-syntax

      .. procedure:: 
         :style: normal 

         .. include:: /includes/nav/steps-db-deployments-page.rst
         
         .. include:: /includes/nav/steps-data-explorer.rst
         
         .. step:: Open the :guilabel:`Add Data` drop-down menu.
          
            In the drop-down menu, click :guilabel:`Insert Document`.

            Alternatively, you can right-click the query bar or its surrounding
            whitespace and select :guilabel:`Insert document...` from the 
            drop-down menu.

         .. step:: Open the editor in Shell Syntax mode.

            In the :guilabel:`Insert Document` modal, click the :icon-lg:`Shell` 
            icon to use :guilabel:`Shell Syntax` mode to insert documents into 
            your collection.

            :guilabel:`Shell Syntax` mode is the default view.

         .. step:: Insert your documents.

            In the MongoDB shell syntax, type or paste the document(s) you want 
            to insert into the collection. To insert multiple documents,
            enter a comma-separated array of documents.

            .. example::

               The following example inserts a single document into
               the collection. Field names are unquoted, and the
               ``_id``, ``copies``, and ``lastCheckedOut`` values use
               the ``ObjectId()``, ``NumberInt()``, and ``ISODate()``
               type constructors instead of Extended JSON type
               wrappers:

               .. code-block:: javascript

                  { 
                    _id: ObjectId('507f1f77bcf86cd799439011'),
                    title: 'The Odyssey',
                    author: 'Homer',
                    copies: NumberInt('10'),
                    lastCheckedOut: ISODate('2025-03-14T09:30:00Z')
                  }

            .. note::
              
              .. include:: /atlas-ui/includes/shared/fact-automatic-objectid.rst

         .. step:: Click Insert. 

   .. tab:: Field-by-Field Editor
      :tabid: field-by-field

      .. procedure:: 
         :style: normal 

         .. include:: /includes/nav/steps-db-deployments-page.rst
         
         .. include:: /includes/nav/steps-data-explorer.rst

         .. step:: Open the :guilabel:`Add Data` drop-down menu.
          
            In the drop-down menu, click :guilabel:`Insert Document`.
            
            The document editor appears with the ``_id`` field, which contains 
            an :ref:`objectid` value that reflects the time when the document 
            was created, not when it was inserted. As such, the ``ObjectId`` 
            does not represent a strict insertion order.

         .. step:: Open the editor in Field-by-Field Editor mode.

            In the :guilabel:`Insert Document` modal, click the 
            :icon-lg:`Menu` icon for Field-by-Field Editor mode.

         .. step:: Add new fields.

            To add a new field in the document, hover over the row number
            in the dialog and click the :icon-fa5:`plus` icon to add a new field 
            after the selected row.

            You can also add a new field at the end of the document by
            pressing the tab key when your text cursor is in the value of
            the last document field.

            .. note::
              
              .. include:: /atlas-ui/includes/shared/fact-automatic-objectid.rst

         .. step:: (Optional) Change field type.
          
            You can change the data type of a field by using the data type 
            selectors on the right of the field.
               
            To change the ``_id`` field to use a custom value, change the data 
            type from ``ObjectID`` to ``string`` and then overwrite the ``_id`` 
            value.

         .. step:: Click Insert.

   .. tab:: JSON Mode
      :tabid: json

      .. procedure:: 
         :style: normal 

         .. include:: /includes/nav/steps-db-deployments-page.rst
         
         .. include:: /includes/nav/steps-data-explorer.rst

         .. step:: Open the :guilabel:`Add Data` drop-down menu. 
          
            In the drop-down menu, click :guilabel:`Insert Document`.
               
            Alternatively, you can right-click the query bar or its surrounding
            whitespace and select :guilabel:`Insert document...` from the 
            drop-down menu.

         .. step:: Open the editor in JSON mode. 

            In the :guilabel:`Insert Document` modal, click the 
            :icon-lg:`CurlyBraces` icon for JSON mode.

         .. step:: Insert your documents.

            In JSON format, type or paste the document(s) you want to
            insert into the collection. To insert multiple documents,
            enter a comma-separated array of JSON documents.

            .. example::

               The following array inserts 5 documents into
               the collection:

               .. code-block:: json

                  [
                    { "_id" : 8752, "title" : "Divine Comedy", "author" : "Dante", "copies" : 1 },
                    { "_id" : 7000, "title" : "The Odyssey", "author" : "Homer", "copies" : 10 },
                    { "_id" : 7020, "title" : "Iliad", "author" : "Homer", "copies" : 10 },
                    { "_id" : 8645, "title" : "Eclogues", "author" : "Dante", "copies" : 2 },
                    { "_id" : 8751, "title" : "The Banquet", "author" : "Dante", "copies" : 2 }
                  ]

            .. note::
              
              .. include:: /atlas-ui/includes/shared/fact-automatic-objectid.rst

         .. step:: Click Insert.
