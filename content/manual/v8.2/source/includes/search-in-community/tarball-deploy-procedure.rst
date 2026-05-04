.. procedure::
   :style: normal

   .. step:: Download the tarball. 

      Download the MongoDB Search in Community tarball from the `MongoDB Download
      Center <https://www.mongodb.com/try/download/search-in-community>`__. 

   .. step:: Extract the tarball from the downloaded file.

      Replace ``{VERSION_NUMBER}``  with the ``mongot`` version that you downloaded
      from the MongoDB Download Center and run the following command to extract the tarball:
      
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

      **If you want to deploy a new replica set with keyfile
      authentication**, follow the steps in
      :ref:`<deploy-rs-for-mongot>`. 

   .. step:: Create your password file.

      Create a password file for ``mongot`` to connect to ``mongod``. 

      For example, select your operating system and replace
      ``<mongot_password>`` with your password. Then, run the following command
      to create a file called ``passwordFile``:

      .. tabs::

         .. tab:: Linux/MacOS
            :tabid: linux_macos

            .. code-block:: shell

               echo -n "mongotPassword" > passwordFile
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

         - Replace ``<your-mongot-username>`` with a username for your ``mongot`` user
         - Replace ``<your-mongot-password>`` with the password that you specified in
           your ``passwordFile``
         - Run the command:

           .. code-block:: shell

              db.createUser(
                {
                  user: <mongot_username>,
                  pwd: <mongot_password>,
                  roles: [ "searchCoordinator"]
                }
              )

   .. step:: **Optional**. Create the |api| key files. 

      If you created the |api| keys for :ref:`automated embedding <avs-auto-embeddings>`, 
      create the files for ``mongot`` to connect to the endpoint service.

      a. Create a secure directory for storing the secret.

         .. code-block:: shell 

            sudo mkdir -p /etc/mongot/secrets
            sudo chmod 700 /etc/mongot/secrets

      #. Create the credential files.

         To create the files, run the following commands after you replace
         ``<your-query-api-key>`` and ``<your-indexing-api-key>`` with your 
         |voyage| |api| keys.

         .. code-block:: shell 

            echo -n "<your-query-api-key>"  | sudo tee /etc/mongot/secrets/voyage-api-query-key   > /dev/null
            echo -n "<your-index-api-key>" | sudo tee /etc/mongot/secrets/voyage-api-indexing-key > /dev/null

         .. note:: 

            The ``mongot`` process uses these |api| keys to generate
            embeddings at index-time and query-time. Although you can use 
            the same key for both, we recommend using different |api| keys from 
            different |service| projects.

      #. Set the permissions on the |api| key file to ``400``.

         .. code-block:: shell

            sudo chmod 400 /etc/mongot/secrets/voyage-api-query-key
            sudo chmod 400 /etc/mongot/secrets/voyage-api-indexing-key

      #. Ensure that the ``mongot`` user with the ``searchCoordinator``
         role that you created in step 5.c owns the file.  

         .. code-block:: shell 

            sudo chown <mongot_username>:<mongot_username> /etc/mongot/secrets/*

   .. step:: Specify your ``mongot`` configuration files.
      
      You can configure ``mongot`` with a YAML configuration file. Use
      the included sample configuration file named ``config.default.yml`` or a
      new configuration file to define the configuration. For more information
      on ``mongot`` configuration options, see
      :ref:`mongot-configuration-options`. 

      The tarball contains the following sample configuration file,
      ``config.default.yml``, with the default  ``mongot`` settings. You can
      modify the settings for your deployment. You can deploy ``mongot`` with or 
      without the configuration settings for :ref:`automated embedding 
      <avs-auto-embeddings>`.

      .. include:: /includes/search-in-community/global-interface-warning.rst

      .. collapsible::
         :heading: Search and Vector Search without Automated Embedding
         :sub_heading: Sample configuration for mongot without the configuration for automated embedding.
         :expanded: false
      
         .. code-block:: bash
            :linenos:

            syncSource:
               replicaSet:
                  hostAndPort: "localhost:27017" # Replace with the mongod host and port.
                  username: mongotUser # Replace with mongod username enabled with "searchCoordinator" role.
                  passwordFile: "/etc/mongot/secrets/passwordFile" # Replace with path to password file for the above user.
                  tls: false
                  readPreference: primaryPreferred
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

      .. collapsible::
         :heading: Search and Vector Search with Automated Embedding
         :sub_heading: Sample configuration for mongot with the configuration for automated embedding.
         :expanded: false

         If you want to use automated embedding, you **must** do the following: 
         
         - Set the embedding service provider endpoint URL (on line 13). If you used the 
           {+atlas-ui+} to create the |api| keys, you can specify the following, which is 
           the default, as the ``providerEndpoint``: 

           .. code-block:: shell 

              https://ai.mongodb.com/v1/embeddings

           If you created the key from |voyage|, override with the following endpoint URL 
           for |voyage|:

           .. code-block:: shell 

              https://api.voyageai.com/v1/embeddings
      
         - Configure one instance of ``mongot`` as the leader responsible for writing 
           to the automated embedding View. For deployments with multiple instances, 
           you can designate only one instance as the leader for writing to materialized 
           view by setting the boolean flag for the ``embedding.isAutoEmbeddingViewWriter`` 
           (on line 14) to ``true``. Set this flag to ``false`` for all other instances.

         .. code-block:: bash
            :linenos:
            :emphasize-lines: 13

            syncSource:
               replicaSet:
                  hostAndPort: "localhost:27017" # Replace with the mongod host and port.
                  username: mongotUser # Replace with mongod username enabled with "searchCoordinator" role.
                  passwordFile: "/etc/mongot/secrets/passwordFile" # Replace with path to password file for the above user.
                  tls: false
                  readPreference: primaryPreferred
            storage:
               dataPath: "/var/lib/mongot"  # Replace with the path where you want mongot to store search data.
            embedding:
               queryKeyFile: /etc/mongot/secrets/voyage-api-indexing-key # Replace with the path where you stored the API key.
               indexingKeyFile: /etc/mongot/secrets/voyage-api-query-key # Replace with the path where you stored the API key.
               providerEndpoint: <Provider-Endpoint> lowing endpoint URL if you created API key directly from Voyage AI: .
               isAutoEmbeddingViewWriter: true # Designate this as leader instance for writing the automated embeddings to the View.
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

   .. step:: Start the mongot process.

      Run the ``mongot`` launcher script that you downloaded with the
      tarball. The script is in the ``mongot-community`` folder.

      Change to the ``mongot-community`` folder:

      .. code-block:: bash

         cd <path-to-mongot> 

      To start ``mongot`` with the sample config file, issue the following
      command:

      .. code-block:: bash

         ./mongot --config config.default.yml --internalListAllIndexesForTesting=true

      .. note:: 

         The ``internalListAllIndexesForTesting`` flag configures the system to return 
         index status. 

   .. include:: /includes/search-in-community/verify-mongot-health.rst
