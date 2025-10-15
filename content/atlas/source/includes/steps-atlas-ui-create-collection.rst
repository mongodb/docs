.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-data-explorer.rst
      
   .. step:: Open the :guilabel:`Create Collection` dialog box.
      
      Select or hover over the database, and click the :icon-lg:`Plus` icon to 
      open the :guilabel:`Create Collection` dialog box.
      
   .. step:: Enter the :guilabel:`Collection Name`.

      In the :guilabel:`Create Collection` dialog box, enter the name of 
      the collection you want to create. 

      |service| also provides :guilabel:`Additional preferences`. You can choose 
      from the following options: 

      - :ref:`Create a Clustered Collection <atlas-ui-clustered-collection>`
      - :ref:`Create a Collection with Collation <atlas-ui-collation-collection>`

      .. important::
      
         Don't include :ref:`sensitive information <sensitive-info>` in 
         your collection name.
      
      For more information on MongoDB collection names, see
      :ref:`restrictions-on-db-names`.
      
   .. step:: Optional. Specify a time series collection.

      Select whether the collection is a 
      :manual:`time series collection </core/timeseries-collections>`. 
      If you select to create a time series collection, specify the time
      field and granularity. You can optionally specify the meta field and
      the time for old data in the collection to expire.
      
   .. step:: Click :guilabel:`Create Collection`.
      
      Upon successful creation, the collection appears underneath the
      database in the :guilabel:`Connections` sidebar.  
