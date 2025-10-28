.. procedure::
   :style: normal
      
      
   .. step:: Set up database user in the source replica set.
      
      If the source replica set requires authentication, you must include
      user credentials when running |mongomirror|. For requirements, see
      :ref:`source-rs-authorization`.
      
      Make note of the username and password for this user, as you must
      specify these credentials when running ``mongomirror``.

   .. include:: /includes/nav/steps-db-access.rst
      
   .. step:: Set up a database user in the target |service| cluster.
      
      You must specify a database user with the
      :atlasrole:`Atlas admin` role to run |mongomirror|.
      See :ref:`Configure Database Users <add-mongodb-users>` for documentation on creating a database
      user.
      
      If no such user exists, create the user:
      
      a. If it isn't already displayed, click the
         :guilabel:`Database Users` tab.
      
      #. Click :icon-fa5:`plus` :guilabel:`Add New Database User`.
      
      #. Add an :guilabel:`Atlas admin` user.
      
      Make note of the username and password selected for the new
      user, as you must specify these credentials when running
      |mongomirror|.
      
   .. step:: Update IP Access List.
      
      If the host where you will run |mongomirror| is not in your cluster's
      :doc:`IP Access List </security/ip-access-list>`, update the list.
      You can specify either:
      
      - The public IP address of the server on which |mongomirror| will run, or
      
      - If set up for |vpc| peering, either the peer's |vpc| |cidr| block
        (or a subnet) or the Security Group of the peer |vpc|.

   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Click :guilabel:`Connect`.
      
      Click :guilabel:`Connect` for the |service| cluster into which 
      you want to migrate data.
      
   .. step:: Copy the target cluster host information.
      
      You can get your |service| cluster's hostname information from the
      |service| user interface.
      
      .. note::
      
         You don't need to use a driver to migrate data with |mongomirror|.
      
      a. From the :guilabel:`Connect` dialog box, click :guilabel:`Shell`.
      
      #. From the drop-down list, select :guilabel:`3.4 or earlier`. 
         The connection string should look similar to the following example.
         This example has been broken into multiple lines for readability:
      
         .. code-block:: shell
            :copyable: false
      
            mongodb://<db_username>:<db_password>@
            00.foo.mongodb.net:27017,
            01.foo.mongodb.net:27017,
            02.foo.mongodb.net:27017/test?
            ssl=true&replicaSet=myAtlasRS&authSource=admin
      
      #. In a text editor, paste the value of ``replicaSet``, add a forward slash 
         (``/``), and then append the host list as comma-separated values, as shown 
         in the following example:
      
         .. code-block:: shell
            :copyable: false
      
            myAtlasRS/00.foo.mongodb.net:27017,01.foo.mongodb.net:27017,02.foo.mongodb.net:27017
      
      Use this value for :option:`--destination <--destination>` in the next step.
      
   .. step:: Start ``mongomirror``.
