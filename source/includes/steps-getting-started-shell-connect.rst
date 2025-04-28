.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Click :guilabel:`Connect`.
      
      Click :guilabel:`Connect` for the {+database-deployment+} to 
      which you want to connect.

   .. include:: /includes/cluster-connection-options.rst
      
   .. step:: Click :guilabel:`Shell`.
      
      From the `Connect Modal 
      <https://cloud.mongodb.com/go?l=https%3A%2F%2Fcloud.mongodb.com%2Fv2%2F%3Cproject%3E%23%2Fclusters%2Fconnect%3FclusterId%3D%3Ccluster%3E>`__, click :guilabel:`Shell`.
      
   .. step:: Click :guilabel:`I have the MongoDB Shell installed` and select your {+mongosh+} version from the drop-down.
      
   .. step:: Copy the provided connection string to your clipboard.
      
      This is a unique connection string specific to your |service|
      cluster. |service| replaces the ``username`` of the connection
      string with the username of the database user you created earlier
      in this procedure.
      
   .. step:: Paste and run your connection string in your terminal.
      
   .. step:: When prompted, enter your database user's password.
      You will be prompted to enter the password you specified when you
      created your database user in |service|.
      
      You should now be connected to your |service| cluster within the
      {+mongosh+}. Your terminal should display something
      similar to the following:
      
      .. code-block:: none
         :copyable: false
      
         MongoDB Enterprise GettingStarted-shard-0:PRIMARY>
      
      .. important:: Connection Troubleshooting
      
         If you are having trouble connecting to your cluster, double check
         that you have added your IP address to your :ref:`IP access list
         <gswa-access-list>` and that you are specifying the correct
         :ref:`database user credentials <gswa-user>`. If you have
         forgotten your database user credentials, you can always
         :ref:`create a new database user <mongodb-users>`.
