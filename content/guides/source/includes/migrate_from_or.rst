.. procedure::
   :style: normal

   .. step:: Create an Atlas deployment.
 
      If you don't already have an Atlas deployment, :atlas:`create one
      </tutorial/create-new-cluster/>` now.

   .. step:: Stop your applications.

      Stopping your applications prevents any additional database writes
      from occurring while you move your data from ObjectRocket to Atlas.

   .. step:: Run ``mongodump`` on your ObjectRocket deployment.

      ``mongodump`` creates a binary export of the contents of your deployment.
      The :manual:`mongodump documentation </reference/program/mongodump/>`
      contains detailed instructions on using the ``mongodump`` utility. Use
      your ObjectRocket credentials to access your ObjectRocket deployment.
      In the following example, a user named ``db_user`` exports all databases
      to a directory named ``dump`` in the current working directory:

      .. code-block:: shell

         mongodump --host iad-mongos2.objectrocket.com --port 12345 --username db_user --password "myPwd" --out dump

   .. step:: Use ``mongorestore`` to restore the ``dump`` directory to your 
      Atlas deployment.
      
      The :manual:`mongorestore documentation </reference/program/mongorestore/>`
      contains detailed instructions on using the ``mongorestore`` utility. Use
      your Atlas credentials to access your Atlas deployment.
      In the following example, a user named ``db_user`` restores the default
      ``dump`` directory to the host ``example1.mongodb.net``:
      
      .. code-block:: shell

         mongorestore --host example1.mongodb.net --port 27017 --username db_user --password "myPwd" dump/

   .. step:: Verify your data integrity.
      
      Use the :atlas:`Atlas Data Explorer </data-explorer>` 
      to verify that all of your collections are present and populate

   .. step:: Update your applications with your new connection string.

      Click the :guilabel:`Connect` button in the cluster panel for your Atlas
      cluster to obtain the connection string to use in your applications.
      To learn more about connecting to your Atlas cluster, see
      :atlas:`Connect to a Cluster </connect-to-cluster>`.

   .. step:: Restart your applications.

      You're ready to start using your Atlas deployment.
