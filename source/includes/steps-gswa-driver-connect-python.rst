.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Click :guilabel:`Connect`.
      
      Click :guilabel:`Connect` for the {+database-deployment+} to 
      which you want to connect.

   .. include:: /includes/cluster-connection-options.rst
      
   .. step:: Click :guilabel:`Drivers`.
      
      From the `Connect Modal 
      <https://cloud.mongodb.com/go?l=https%3A%2F%2Fcloud.mongodb.com%2Fv2%2F%3Cproject%3E%23%2Fclusters%2Fconnect%3FclusterId%3D%3Ccluster%3E>`__, click :guilabel:`Drivers`.
      
   .. step:: Select ``Python`` and your version of the driver.

      The connection string displays.
      
   .. step:: Copy the provided connection string.
      
   .. step:: Configure the provided connection string.
      
      Replace ``<password>`` with the password specified when you created your database user.
      
      .. include:: /includes/admonitions/notes/note-escape-special-chars-pwd.rst
      
   .. step:: Import MongoClient from PyMongo.

      To connect to a running MongoDB instance, PyMongo
      requires ``MongoClient``. In the Python shell running in your
      terminal, run the following
      command to import ``MongoClient``:
      
      .. code-block:: python
      
          from pymongo import MongoClient
      
   .. step:: Connect to your cluster.

      Create the command that specifies a client for connecting to
      your cluster.
      
      a. In your Python shell, paste your updated connection string 
         into the following command:
      
         .. code-block:: python
      
            client = MongoClient('<connection-string>')
      
      #. Update the connection string with your database user password.
      #. Verify that you have enclosed the connection string in single quotes.
      #. Run the resulting command. It specifies a client that will
         connect to your cluster.
      #. Connect to your cluster using this client.
      