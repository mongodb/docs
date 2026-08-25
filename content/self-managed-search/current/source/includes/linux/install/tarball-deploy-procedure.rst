.. procedure::
   :style: normal

   .. step:: Download the ``mongot`` tarball.

      Download the latest Search in Community tarball for your system
      architecture from the `MongoDB Search in Community Download Center
      <https://www.mongodb.com/try/download/search-in-community/>`__.

      To download a specific version from the command line, replace
      ``{VERSION_NUMBER}`` with the version of ``mongot`` that you want
      and run the command for your system architecture:

      .. tabs::

         .. tab:: ARM Architectures
            :tabid: arm-arch

            .. code-block:: shell

               wget https://downloads.mongodb.org/mongodb-search-community/{VERSION_NUMBER}/mongot_community_{VERSION_NUMBER}_linux_aarch64.tgz

         .. tab:: AMD x86_64 Architectures
            :tabid: amd-arch

            .. code-block:: shell

               wget https://downloads.mongodb.org/mongodb-search-community/{VERSION_NUMBER}/mongot_community_{VERSION_NUMBER}_linux_x86_64.tgz

   .. step:: (Optional). Verify the integrity of the tarball package.

      See :ref:`verify-integrity-mongot-packages` for more information.

   .. step:: Extract the ``mongot`` tarball.

      Replace ``{VERSION_NUMBER}`` with the version of ``mongot`` that
      you downloaded and run the command for your system architecture to
      extract the tarball:

      .. tabs::

         .. tab:: ARM Architectures
            :tabid: arm-arch

            .. code-block:: shell

               tar -zxvf mongot_community_{VERSION_NUMBER}_linux_aarch64.tgz

         .. tab:: AMD x86_64 Architectures
            :tabid: amd-arch

            .. code-block:: shell

               tar -zxvf mongot_community_{VERSION_NUMBER}_linux_x86_64.tgz

      .. note::
      
         If your web browser automatically unzips the file as part of the download,
         the file extension is ``.tar``.

      The tarball contains a sample configuration file, the ``mongot``
      launcher script, and {+mdb-search+} license information. 

   .. step:: Configure ``mongod`` to communicate with ``mongot``. 
     
      **If you have an existing replica set that you want to use**, configure the 
      following ``mongod`` parameters to route Search and {+avs+} queries and manage indexes.  

      .. list-table::
         :widths: 30 70
         :header-rows: 1

         * - Parameter
           - Description

         * - ``searchIndexManagementHostAndPort``
           - The host address of ``mongot``.

         * - ``mongotHost``
           - The host address of ``mongot``.

             You must specify the same address in
             ``searchIndexManagementHostAndPort`` and ``mongotHost``. 

         * - ``skipAuthenticationToSearchIndexManagementServer``
           - Specifies whether authentication is enabled for the Search Index
             Management Server

         * - ``useGrpcForSearch``
           - Specifies whether GRPC is enabled for MongoDB Search

      For example, you can add the following lines to your ``mongod`` config
      file and then restart ``mongod``:

      .. code-block:: javascript

         setParameter:
            searchIndexManagementHostAndPort: localhost:27028
            mongotHost: localhost:27028
            skipAuthenticationToSearchIndexManagementServer: false
            useGrpcForSearch: true

      See :ref:`server-parameters` for more information on setting ``mongod``
      parameters. For detailed information about search-specific ``setParameter``
      options, see :ref:`MongoDB Search Options <set-parameter-search-options>`.

      .. note::

         The ``mongotHost``, ``searchIndexManagementHostAndPort``, and
         ``useGrpcForSearch`` parameters are set only at startup. You
         can't change them at runtime with ``setParameter``. To point
         ``mongod`` at a different ``mongot`` instance, update these
         parameters in the ``mongod`` configuration file and restart
         ``mongod``.

      **If you want to deploy a new replica set with keyfile
      authentication**, follow the steps in
      :ref:`deploy-repl-set-with-keyfile`.

   .. step:: Create a user for the ``mongot`` process on your MongoDB deployment.

      ``mongot`` must be able to connect to your MongoDB deployment through a
      user with the :authrole:`searchCoordinator` role.

      a. Connect to ``mongosh`` as the admin user.

         .. code-block:: shell

            mongosh --port 27017 -u <your_admin_username> -p <your_admin_password> 

      b. Connect to the ``admin`` database.
      
         Run the following command to connect to the ``admin`` database:
      
         .. code-block:: shell

            use admin

      c. Create your ``mongot`` user.
      
         To create a user with the ``searchCoordinator`` role:

         - Replace ``<mongot-username>`` with a username for your ``mongot`` user
         - Replace ``<mongot-password>`` with the password that you specify in
           your ``passwordFile`` in the next step
         - Run the following command:

         .. code-block:: shell

            db.createUser(
               {
                  user: <mongot-username>,
                  pwd: <mongot-password>,
                  roles: [ "searchCoordinator"]
               }
            )

   .. step:: Create your password file.

      Create a password file for ``mongot`` to connect to ``mongod``. 

      For example, select your operating system and replace
      ``<mongot-password>`` with your password. Then, run the following command
      to create a file called ``passwordFile``:

      .. tabs::

         .. tab:: Linux/MacOS
            :tabid: linux_macos

            .. code-block:: shell

               echo -n "<mongot-password>" > passwordFile
               chmod 400 passwordFile

            .. note::

               The ``-n`` flag prevents a trailing newline. 

         .. tab:: Windows Command Prompt
            :tabid: windows

            .. code-block:: shell

               echo|set /p="mongotPassword" > passwordFile

         .. tab:: Windows PowerShell
            :tabid: windows-2

            .. code-block:: shell
               
               [System.IO.File]::WriteAllText("passwordFile", "mongotPassword")   

   .. step:: Specify your mongot configuration options.

      You can configure ``mongot`` with a YAML configuration file. Use
      the included sample configuration file named ``config.default.yml`` or a
      new configuration file to define the configuration. For more information
      on ``mongot`` configuration options, see
      :ref:`mongot-configuration-options`. 

      The tarball contains the following sample configuration file,
      ``config.default.yml``, with the default  ``mongot`` settings. You can
      modify the settings for your deployment:

      .. include:: /includes/linux/install/global-interface-warning.rst
 
      .. code-block:: bash

         syncSource:
            replicaSet:
               hostAndPort: "localhost:27017" # Replace with the mongod host and port.
               scramAuth:
                  username: mongotUser # Replace with mongod username enabled with "searchCoordinator" role.
                  authSource: admin # Replace with the database to authenticate the user against.
                  passwordFile: "/etc/mongot/secrets/passwordFile" # Replace with path to password file for the above user.
                  tls:
                     enabled: false
         storage:
            dataPath: "/var/lib/mongot"  # Replace with the path where you want mongot to store search data.
         server:
         grpc:
            address: "localhost:27028" # Replace with the address and port for mongot listen server
            tls:
               mode: "disabled"
         metrics:
            enabled: true
            address: "localhost:9946"
         healthCheck:
            address: "localhost:8080"
         logging:
            verbosity: INFO

      .. note::

         The ``dataPath`` directory in your configuration file must be
         writable by the user that runs ``mongot``.

      The sample configuration uses SCRAM authentication with the
      ``scramAuth`` block. You must configure exactly one authentication
      mechanism for the sync source: either SCRAM or X.509. To
      authenticate with a TLS client certificate instead of a username
      and password, use the ``x509`` block. For both mechanisms,
      including the sharded-cluster ``syncSource.router`` configuration,
      see :ref:`mongot-auth`.

      This sample runs ``mongot`` and ``mongod`` on the same host, so it
      binds ``server.grpc.address`` to ``localhost`` and disables TLS. If
      you run ``mongot`` and ``mongod`` on separate hosts, complete the
      following steps instead:

      - Bind ``server.grpc.address`` to a network interface that
        ``mongod`` can reach, rather than ``localhost``.
      - Set the ``mongod`` ``mongotHost`` and
        ``searchIndexManagementHostAndPort`` parameters to that address.
      - Enable TLS for the sync source and gRPC connections. Running
        without TLS is only appropriate when ``mongot`` and ``mongod``
        run on the same host. To configure TLS, see
        :ref:`mongot-tls-encryption`.

      Use :setting:`logging.logPath` to specify the path of the log file that
      ``mongot`` writes to. If you do not specify a log file path, ``mongot``
      logs to standard output.

   .. step:: Start the mongot process.

      Run the ``mongot`` launcher script that you downloaded with the
      tarball. The script is in the ``mongot-community`` folder.

      Change to the ``mongot-community`` folder:

      .. code-block:: bash

         cd <path-to-mongot> 

      To start ``mongot`` with the sample config file, issue the following
      command:

      .. code-block:: bash

         ./mongot --config config.default.yml

   .. include:: /includes/linux/install/verify-mongot-health.rst
