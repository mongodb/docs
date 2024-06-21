.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-data-explorer.rst
      
   .. step:: Click on the plus sign ``+`` icon for a database.
      
      Either select or hover over the database to drop and click on the
      plus sign ``+`` icon.
      
   .. step:: Enter the :guilabel:`Collection Name`.
      
      .. important::
      
         Don't include :ref:`sensitive information <sensitive-info>` in 
         your collection name.
      
      For more information on MongoDB collection names, see
      :ref:`restrictions-on-db-names`.
      
   .. step:: Optional. Specify a capped collection.

      Select whether the collection is a :ref:`capped collection
      <manual-capped-collection>`. If you select to create a capped
      collection, specify the maximum size in bytes.
      
   .. step:: Optional. Specify a time series collection.

      Select whether the collection is a 
      :manual:`time series collection </core/timeseries-collections>`. 
      If you select to create a time series collection, specify the time
      field and granularity. You can optionally specify the meta field and
      the time for old data in the collection to expire.
      
   .. step:: Click :guilabel:`Create`.
      
      Upon successful creation, the collection appears underneath the
      database in the {+atlas-ui+}.  
