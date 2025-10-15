.. procedure::
   :style: normal
        
   .. step:: Create a database user in the source replica set.
      
      .. important:: Optional
      
         If your source cluster *doesn't* enforce authentication, skip
         this step.
      
      If the source deployment enforces authentication, you must provide a
      database user with privileges to read any database as part of this
      procedure. To learn more about database user privileges, see
      :manual:`MongoDB Role-Based Access Control </core/authorization>`.
      
      If no such user exists, create a user in your source MongoDB replica
      set with the :manual:`backup </reference/built-in-roles/#backup>`
      role on the ``admin`` database.
      
      .. example::
      
         Run the following command in {+mongosh+} to create the
         ``mySourceUser`` on the ``admin`` database and assign it the
         ``backup`` role. For replica sets, you must run this command
         against the :term:`primary`.
      
         .. code-block:: javascript
      
             use admin
             db.createUser(
               {
                  user: "<mySourceUser>",
                  pwd: "<mySourcePassword>",
                  roles: [ "backup" ]
               }
             )
      
   .. step:: Assemble the ``mongodump`` command.
      
      Based on the type of connection string you use, copy one of the following templates to into your preferred text editor:
      
      .. note::
      
         To connect to |service| clusters, we recommend you connect with a DNS seed list connection string using the ``--uri`` option.
      
      .. tabs::
      
         .. tab:: With a standard connection string
            :tabid: standard_connection
      
            .. code-block:: shell
      
               mongodump --uri "mongodb://username:password@mongodb0.example.com:<Port>,mongodb1.example.com:<Port1>,mongodb2.example.com:<Port2>/?replicaSet=<ReplicaSetName>&authSource=admin" \
                         --archive
      
            Replace the host examples with the information for your replica set members. Replace ``<ReplicaSetName>`` with the name of the source replica set.
      
            For standalone deployments, exclude ``replicaSet=<ReplicaSetName>`` and specify the hostname of the standalone deployment only. For example, ``--uri "mongodb://standalone-mongod.example.net:27017"``
               
         .. tab:: With a DNS seed list connection string
            :tabid: dns_seed_list_connection
      
            .. code-block:: shell
      
               mongodump --uri "mongodb+srv://username:password@cluster0.example.mongodb.net" \
                         --archive
      
            .. include:: /includes/admonitions/notes/note-ubuntu-dns-error.rst
      
      .. note::
      
            If your password contains special characters, it must be percent-encoded.
      
      Do not run this command yet. Proceed to the next step once you have
      modified the template.
      
   .. step:: Set up database user in the target |service| cluster.
      
      To run :binary:`mongorestore` against an |service| cluster, you
      must specify a database user in the |service| cluster
      that has the :atlasrole:`Atlas admin` role.
      
      If no such user exists, create the user:
      
      a. .. include:: /includes/nav/list-db-access.rst
      
      #. Click :icon-fa5:`plus` :guilabel:`Add New Database User`.
      
      #. Add an :guilabel:`Atlas admin` user.
      
      To learn more about user management, see :ref:`mongodb-users`.
      
   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Choose :guilabel:`Command Line Tools` for your desired cluster.

      From the :icon-fa5:`ellipsis-h` menu for the cluster, click
      :guilabel:`Command Line Tools`.
      
   .. step:: Retrieve and modify the ``mongorestore`` connection template.

      The :guilabel:`Binary Import and Export Tools` section of the
      :guilabel:`Command Line Tools` tab displays a copyable template with
      the minimum required options for connecting |mongorestore| to your
      |service| cluster.
      
      The template includes placeholder values for certain options. Copy
      and paste the template into your preferred text editor and make the
      following modifications:
      
      - ``password``: replace this with the password for the user
        specified in ``username``. The template includes a database user
        for the project as the ``username``. If you want to authenticate
        as a different user, replace the value of ``username`` and
        specify the password for that user in ``password``.
      
      - Add :option:`--nsExclude <mongorestore.--nsExclude>` and set its value to ``"admin.system.*"``.
      
      - Add :option:`--archive <mongorestore.--archive>`.
      
      Based on the type of connection string you use, your template should resemble one of the following commands:
      
      .. tabs::
      
          .. tab:: With a standard connection string
             :tabid: standard_connection
      
             .. code-block:: shell
                :copyable: false
      
                mongorestore --uri "mongodb://username:password@00.foo.mongodb.net:27017,01.foo.mongodb.net:27017,02.foo.mongodb.net:27017/?replicaSet=myRepl&authSource=admin" \
                             --archive \
                             --ssl \
                             --nsExclude "admin.system.*"
      
          .. tab:: With a DNS seed list connection string
             :tabid: dns_seed_list_connection
      
             .. code-block:: shell
                :copyable: false
      
                mongorestore --uri "mongodb+srv://username:password@cluster1.example.mongodb.net" \
                             --archive \
                             --nsExclude "admin.system.*"
      
   .. step:: Run |mongodump| and |mongorestore|.
      
      .. important::
      
         Ensure that the host where you are running |mongodump| and
         |mongorestore| is in the project :ref:`IP Access List
         <security-ip-access-list>`.
      
         To review your project IP access list, click :guilabel:`Network
         Access` in the :guilabel:`Security` section of the sidebar. The
         :guilabel:`IP Access List` tab displays. To learn more, see :ref:`security-ip-access-list`. 
      
      In your preferred text editor, use the pipe ``|`` operator to
      separate the |mongodump| and |mongorestore| commands. Based on the type of connection string you use, the final
      command should resemble one of the following:
      
      .. tabs::
      
         .. tab:: With a standard connection string
            :tabid: standard_connection
      
            .. code-block:: sh
      
               mongodump --uri "mongodb://username:password@mongodb0.example.com:27017,mongodb1.example.com:27017,mongodb2.example.com:27017/?replicaSet=sourceRS&authSource=admin" \
                         --archive \
               | \
               mongorestore --uri "mongodb://username:password@00.foo.mongodb.net:27017,01.foo.mongodb.net:27017,02.foo.mongodb.net:27017/?replicaSet=myAtlasRS&authSource=admin" \
                            --archive \
                            --ssl \
                            --nsExclude "admin.system.*"
       
         .. tab:: With a DNS seed list connection string
            :tabid: dns_seed_list_connection
      
            .. code-block:: sh
      
               mongodump --uri "mongodb+srv://username:password@cluster0.example.mongodb.net" \
                         --archive \
               | \
               mongorestore --uri "mongodb+srv://username:password@cluster1.example.mongodb.net" \
                            --archive \
                            --nsExclude "admin.system.*"
      
      Run the completed command from a terminal or shell connected to a
      host machine on your source cluster.
      
      Upon successful completion of the procedure, connect to your
      |service| cluster using {+mongosh+} and verify the result of
      the procedure. To learn how, see :ref:`connect-mongo-shell`.
      
      You must update your applications to point to the |service| cluster
      before resuming write operations. To learn how to connect
      applications to |service|, see :doc:`/driver-connection`.
