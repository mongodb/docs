.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-data-explorer.rst
      
   .. step:: Click :guilabel:`Create Database`.
      
   .. step:: Enter the :guilabel:`Database Name` and the :guilabel:`Collection Name`.
      
      Enter the :guilabel:`Database Name` and the :guilabel:`Collection
      Name` to create the database and its first collection.
      
      .. important::
      
         Don't include :ref:`sensitive information <sensitive-info>` in 
         your database and collection names.
      
      For more information on MongoDB database names and collection names,
      see :ref:`restrictions-on-db-names`.
      
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
      
      Upon successful creation, the database and the collection appears in
      the {+atlas-ui+}.
