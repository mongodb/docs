.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-access.rst

   .. step:: Set up a database user in the target |service| cluster.
      
      To run |mongoimport| to write to |service| cluster, you
      must specify a database user that has :manual:`readWrite
      </reference/built-in-roles/#readWrite>` privileges in the database
      into which to import data.
      For example, a user with :atlasrole:`Atlas admin`
      role provides these privileges.
      
      If no such user exists, create the user:
      
      a. If it isn't already displayed, click the
         :guilabel:`Database Users` tab.
      
      #. Click :icon-fa5:`plus` :guilabel:`Add New Database User`.
      
      #. Add an :guilabel:`Atlas admin` user.
      
   .. include:: /includes/nav/steps-db-deployments-page.rst
   
   .. step:: Click :guilabel:`Connect`.
      
      Click :guilabel:`Connect` for the |service| cluster into which 
      you want to migrate data.   
      
   .. step:: Update IP Access List.

      If the host where you will run |mongoimport| is not in the
      :doc:`IP Access List </security/ip-access-list>`, update the list.
      You can specify either:
      
      - The public IP address of the server on which |mongoimport|
        will run, or
      
      - If set up for |vpc| peering, either the peer's |vpc| |cidr| block
        (or a subnet) or the peer |vpc|\'s Security Group, if you chose
        |aws| as your cloud provider.
      
   .. step:: Copy the target cluster URI / host information.
      
      .. include:: /includes/extracts/uri-connection-mongoimport.rst
      
   .. step:: Run mongoimport.
