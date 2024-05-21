.. procedure::
   :style: normal

   .. include:: /includes/atlas-nav/steps-db-deployments-page.rst

   .. step:: Open the :guilabel:`Connection Method` dialog. 
    
      a. Click :guilabel:`Connect` for the cluster to which
         you want to connect.
      #. Click :guilabel:`Choose a Connection Method`. {+atlas+}
         selects :guilabel:`Standard Connection` by default. To
         connect using a :atlas:`private endpoint 
         </security-private-endpoint/>`, select 
         :guilabel:`Private Endpoint`.

   .. step:: Choose a connection method.

      To connect to your application, click :guilabel:`Drivers`. To
      connect using tools, click the tool you want to use to access your
      data.

   .. step:: Follow instructions for the connection method you selected.
   
      a. If you selected :guilabel:`Drivers`, select your driver and
         version. If you selected a tool, download the tool.
      b. Select :guilabel:`Connect To Cluster`. 
      c. Copy the connection string. Replace ``<password>`` and
         ``<username>`` in the connection string with the database
         user's credentials.