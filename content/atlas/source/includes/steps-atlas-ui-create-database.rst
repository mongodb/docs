.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-data-explorer.rst
      
   .. step:: Open the :guilabel:`Create Database` dialog box.

      In the :guilabel:`Connections` sidebar, select or hover over your cluster 
      and click the :icon-lg:`Plus` icon to open the :guilabel:`Create Database` 
      dialog box.
      
   .. step:: Enter the :guilabel:`Database Name` and the :guilabel:`Collection Name`.
      
      Enter the :guilabel:`Database Name` and the :guilabel:`Collection
      Name` to create the database and its first collection.

      .. include:: /atlas-ui/includes/shared/collection-options.rst
      
      .. important::
      
         Don't include :ref:`sensitive information <sensitive-info>` in 
         your database and collection names.
      
      For more information on MongoDB database names and collection names,
      see :ref:`restrictions-on-db-names`.
      
   .. step:: Optional. Specify a time series collection.

      Select whether the collection is a 
      :manual:`time series collection </core/timeseries-collections>`. 
      If you select to create a time series collection, specify the time
      field and granularity. You can optionally specify the meta field and
      the time for old data in the collection to expire.
      
   .. step:: Click :guilabel:`Create Database`.
      
      Upon successful creation, the database and the collection appears in
      the :guilabel:`Connections` sidebar.
