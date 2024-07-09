.. procedure::
   :style: normal
      
      
   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Open the :guilabel:`Load Sample Dataset` dialog box.

      a. Locate the {+database-deployment+} where you want to load 
         sample data.
      
      #. Click the :guilabel:`Ellipses (...)` button for your 
         {+database-deployment+}.
      
      #. Click :guilabel:`Load Sample Dataset`.
      
      .. tip::
      
         If prompted, select all available datasets.
      
   .. step:: In the dialog box, click :guilabel:`Load Sample Dataset`

      The dialog box closes and |service| begins loading your sample 
      dataset into your {+database-deployment+}.

   .. include:: /includes/nav/steps-data-explorer.rst
      
   .. step:: View your sample data.

      You should see the following databases in your 
      {+database-deployment+}:
      
      - ``sample_airbnb``
      - ``sample_analytics``
      - ``sample_geospatial``
      - ``sample_guides``
      - ``sample_mflix``
      - ``sample_restaurants``
      - ``sample_supplies``
      - ``sample_training``
      - ``sample_weatherdata``
      
      For details on the collections and documents included in these
      datasets, see :ref:`available-sample-datasets`.

   .. step:: Run a query on the sample data.

      Complete the following steps to run a query on the ``restaurants`` 
      collection in the ``sample_restaurants`` database:

      a. In the left navigation of the :guilabel:`Collections` page, select 
         the ``sample_restaurants`` database and then the ``restaurants`` collection.

      #. To find all restaurants located in Queens, copy the following 
         :manual:`query filter document </core/document/#std-label-document-query-filter>` into the :guilabel:`Filter` search bar.

         .. code-block:: json 
                           
               { borough: "Queens" }

      #. Click :guilabel:`Apply`.

      #. |service| shows documents where the ``borough`` field corresponds to ``Queens``.

         To learn more, see
         :manual:`Query Documents </tutorial/query-documents/#std-label-query-documents-atlas-ui>`.
      