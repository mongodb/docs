.. procedure::
   :style: normal
      
      
   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Open the :guilabel:`Load Sample Dataset` dialog box.

      a. Locate the {+database-deployment+} where you want to load 
         sample data.
      
      #. Click the :guilabel:`Ellipses (...)` button for your 
         {+database-deployment+}.
      
      #. Click :guilabel:`Load Sample Dataset`.

         The :guilabel:`Load sample data` dialog box opens.

      #. In the dialog box, choose which datasets to load from the drop-down menu.

         For details on the collections and documents included in these
         datasets, see :ref:`available-sample-datasets`.

         To load all available sample datasets, click :guilabel:`Select All`. 
      
   .. step:: Click :guilabel:`Load sample data` to confirm.

      The dialog box closes and |service| begins loading your sample 
      dataset into your {+database-deployment+}.
   
   .. include:: /includes/nav/steps-data-explorer.rst
      
   .. step:: View your sample data.

      You should see the databases that you loaded in your 
      {+database-deployment+} in the :guilabel:`Collections` view.

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

      #. |service| shows documents where the ``borough`` field corresponds to ``Queens``.

         To learn more, see :manual:`Query Documents </tutorial/query-documents/#std-label-query-documents-atlas-ui>`.