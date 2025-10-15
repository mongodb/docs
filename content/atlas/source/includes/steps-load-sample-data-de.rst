.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-data-explorer.rst
      
   .. step:: Click :guilabel:`Load a Sample Dataset`.

      The :guilabel:`Load sample data` dialog box opens.

   .. step:: In the dialog box, select which datasets to load from the drop-down menu.

      For details on the collections and documents included in these
      datasets, see :ref:`available-sample-datasets`.

      To load all available sample datasets, click :guilabel:`Select All`. 
      
   .. step:: Click :guilabel:`Load sample data` to confirm.

      Once the load completes, the view refreshes to show your sample 
      data.
      
      You should see the databases that you loaded in your 
      {+database-deployment+}.
   
   .. step:: (Optional) Run a query on the sample data.

      For example, if you loaded the ``sample_restaurants`` dataset:

      a. In the left navigation of the :guilabel:`Collections` page, select 
         the ``sample_restaurants`` database and then the ``restaurants`` collection.

      #. To find all restaurants located in Queens, copy the following 
         :manual:`query filter document </core/document/#std-label-document-query-filter>` into the :guilabel:`Filter` search bar.

         .. code-block:: json 
            :copyable: true
                           
            { borough: "Queens" }

      #. Click :guilabel:`Apply`.

      #. |service| shows documents where the ``borough`` field is equal to ``Queens``.

         To learn more, see :manual:`Query Documents </tutorial/query-documents/#std-label-query-documents-atlas-ui>`.