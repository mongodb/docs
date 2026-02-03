This quick start demonstrates how to deploy |fts| and {+avs+} in Docker,
load sample data into the MongoDB cluster, create a vector search index 
for the sample data, and run vector search queries against the sample data.

*Time required: 20 minutes*

The quick start walks you through the following steps:

1. Deploy MongoDB and ``mongot`` in Docker. 

   For more details on deploying by using a tarball or as an image in Docker,
   see :manual:`Install MongoDB Community and MongoDB Search </administration/install-community>`.

#. Load sample data, create a vector search index, and run vector search queries on your local deployment.

.. note::

   The resulting set up of this quick start is not secure. For
   more information on securing your deployment, see :manual:`Security for
   Self-Managed Deployments </administration/security-checklist>`. 

Architecture
~~~~~~~~~~~~

This tutorial creates the following architecture:

- A MongoDB Community Edition Server (``mongod``) with a single node replica set
  on port 27017
- A MongoDB Search (``mongot``) search engine component on port 27028
- Persistant data volumes on both ports
- Pre-loaded sample data

.. note::

   For a production deployment, MongoDB recommends that you use a replica
   set with at least three members.

Before You Begin
----------------

Before you begin, you must complete the following prerequisites:

- Download Docker v4.40 or higher
- Download Docker Compose
- Download the ``curl`` command 
- Download ``mongosh`` locally or have access to it through Docker
- Create |voyage| |api| keys from the :ref:`{+atlas-ui+} <voyage-api-keys>` 
  or directly from :voyage-docs:`Voyage AI </api-key-and-installation>` 
  
  We recommend two separate keys to enable {+avs+} to :ref:`automatically 
  generate embeddings <avs-auto-embeddings>` at index- and query-time.

.. note:: 

   Your provider endpoint for generating embeddings depends on
   whether you create the |api| key from the {+atlas-ui+} or
   directly from |voyage|. 

.. _community-search-quick-start:

Configure MongoDB Community Edition
-----------------------------------

.. procedure:: 
   :style: normal 

   .. step:: Pull the MongoDB Search Docker image and the latest MongoDB Community Edition image.

      To download the ``mongot`` Docker image and the latest MongoDB Community
      Edition image, run the following command:

      .. code-block:: shell

         docker pull mongodb/mongodb-community-server:latest && docker pull mongodb/mongodb-community-search:latest
         
      .. note::

         You must have a minimum of MongoDB 8.2.0 to use MongoDB Search with a
         self-managed deployment. For more information, see :ref:`MongoDB Search
         Compatibility <fts-feature-availability>`. 

   .. step:: Download an archive of sample data.

      To download the sample data, run the following command: 

      .. code-block:: shell 

         curl https://atlas-education.s3.amazonaws.com/sampledata.archive -o sampledata.archive
         
   .. step:: Create your password file.

      Create a password file for ``mongot`` to connect to ``mongod``. 

      .. important::

         Do not include trailing newlines in your password file. ``mongot``
         rejects password files that contain trailing newlines. 

      Select your operating system and run the command to create your password file:

      .. tabs::

         .. tab:: Linux/MacOS
            :tabid: linux_macos

            .. code-block:: shell

               echo -n "mongotPassword" > pwfile
               chmod 400 pwfile

            .. note::

               The ``-n`` flag prevents a trailing newline. 

         .. tab:: Windows Command Prompt
            :tabid: windows

            .. code-block:: shell

               echo|set /p="mongotPassword" > pwfile

            .. include:: /includes/security/windows-password-permissions.rst 

         .. tab:: Windows PowerShell
            :tabid: windows-2

            .. code-block:: shell

               [System.IO.File]::WriteAllText("pwfile", "mongotPassword")    

            .. include:: /includes/security/windows-password-permissions.rst 

      .. note::

         - If you change the ``mongot`` password, you must also update the
           password value in the ``init-mongo-sh`` script. 

         - Most text editors automatically add newlines to files when you
           edit files manually. 

   .. step:: Set up the credentials file for |api| authentication. 

      Create credentials files for ``mongot`` to connect to |voyage| to enable 
      {+avs+} to automatically generate embeddings for text fields in your 
      collection and text strings in your queries.

      .. note::

         If you create a Voyage AI API key through the `Atlas UI <https://www.mongodb.com/docs/voyageai/management/api-keys/>`__, the key only 
         authenticates requests to ``https://ai.mongodb.com/v1/embeddings``. 
         
         Conversely, API keys created directly through `VoyageAI <https://docs.voyageai.com/docs/api-key-and-installation>`__ only 
         authenticate requests to ``https://api.voyageai.com/v1/embeddings``. 

         Requests that include an API key to the opposite endpoint result in an 
         authentication error (``403``).
      
      a. Run the following command after replacing ``<your-voyage-api-key>``
         with your valid |voyage| |api| key to create two files named
         ``voyage-api-indexing-key`` and ``voyage-api-query-key``: 

         .. code-block:: shell

            echo -n "<your-voyage-api-key>" > voyage-api-indexing-key
            echo -n "<your-voyage-api-key>" > voyage-api-query-key

      #. Set the permissions on the |api| key file to ``400``.

         .. code-block:: shell

            chmod 400 voyage-api-indexing-key 
            chmod 400 voyage-api-query-key

      .. note:: 

         The ``mongot`` process uses these |api| keys to generate embeddings.

   .. step:: Set up your configuration files.

      Create the following configuration files in your project folder and paste
      the provided code for each file:

      .. collapsible::
         :heading: docker-compose.yml 
         :expanded: false
         
         .. code-block:: shell
            :linenos:

            services:
               mongod:
                  image: mongodb/mongodb-community-server:latest
                  container_name: mongod-community
                  command: >-
                     mongod
                     --config /etc/mongod.conf 
                     --replSetMember=mongod.search-community:27017
                  ports:
                     - 27017:27017
                  extra_hosts:
                     - "host.docker.internal:host-gateway"
                  volumes:
                     - mongod_data:/data/db
                     - ./mongod.conf:/etc/mongod.conf:ro
                     - ./sampledata.archive:/sampledata.archive
                     - ./init-mongo.sh:/docker-entrypoint-initdb.d/init-mongo.sh:ro
                  networks:
                     - search-community


               mongot:
                  image: mongodb/mongodb-community-search:latest
                  entrypoint:
                     - /mongot-community/mongot
                     - --config=/mongot-community/config.default.yml
                     - --internalListAllIndexesForTesting=true
                  container_name: mongot-community-pupr
                  networks:
                     - search-community
                  volumes:
                     - mongot_data:/data/mongot
                     - ./mongot.conf:/mongot-community/config.default.yml
                     - ./pwfile:/mongot-community/pwfile:ro
                     - ./voyage-api-query-key:/mongot-community/voyage-api-query-key:ro # Omit if you don't want Automated Embedding
                     - ./voyage-api-indexing-key:/mongot-community/voyage-api-indexing-key:ro # Omit if you don't want Automated Embedding
                  depends_on:
                     - mongod
                  ports:
                     - 27028:27028  # Query server port from config
                     - 9946:9946    # Metrics port from config

            volumes:
               mongod_data:
               mongot_data:

            networks:
               search-community:
                  name: search-community
                  external: true  # Use an external network if it exists. Comment this line if you want to create a new network.

      .. collapsible::
         :heading: init-mongo.sh
         :expanded: false

         .. note::

            If you specified a custom password in your password file, update the
            ``mongotPassword`` in the ``init-mongo.sh`` file to your custom password. 

            The ``mongotUser`` in this file is only in use for the ``mongod`` to
            authorize ``mongot`` through the ``searchCoordinator`` role. 
         
         .. code-block:: shell
            :linenos:
   
            #!/bin/bash
            set -e

            echo "Starting MongoDB initialization..."
            sleep 2

            # Create user using local connection (no port specification needed)
            echo "Creating user..."
            mongosh --eval "
            const adminDb = db.getSiblingDB('admin');
            try {
               adminDb.createUser({
                  user: 'mongotUser',
                  pwd: 'mongotPassword',
                  roles: [{ role: 'searchCoordinator', db: 'admin' }]
               });
               print('User mongotUser created successfully');
            } catch (error) {
               if (error.code === 11000) {
                  print('User mongotUser already exists');
               } else {
                  print('Error creating user: ' + error);
               }
            }
            "

            # Check for existing data
            echo "Checking for existing sample data..."
            if mongosh --quiet --eval "db.getSiblingDB('sample_airbnb').getCollectionNames().includes('listingsAndReviews')" | grep -q "true"; then
            echo "Sample data already exists. Skipping restore."
            else
            echo "Sample data not found. Running mongorestore..."
            if [ -f "/sampledata.archive" ]; then
               mongorestore --archive=/sampledata.archive
               echo "Sample data restored successfully."
            else
               echo "Warning: sampledata.archive not found"
            fi
            fi

            echo "MongoDB initialization completed."

      .. collapsible::
         :heading: mongod.conf
         :expanded: false

         .. note::

            If you deploy ``mongot`` in a production environment,
            MongoDB recommends that you enable security and configure TLS. For
            more information about ``mongod`` security settings, see
            :manual:`Self-Managed Security <core/self-managed-security>`. 
               
         .. code-block:: shell 
            :linenos:
   
            # mongod.conf
            storage:
               dbPath: /data/db

            net:
               port: 27017
               bindIp: 0.0.0.0  

            setParameter:
               searchIndexManagementHostAndPort: mongot.search-community:27028
               mongotHost: mongot.search-community:27028
               skipAuthenticationToSearchIndexManagementServer: false
               useGrpcForSearch: true

            replication:
               replSetName: rs0

      Select one of the two following ``mongot.conf`` configurations based on
      whether you created |voyage| |api| keys for Automated Embedding in the 
      {+atlas-ui+} or directly from |voyage|.

      .. collapsible::
         :heading: mongot.conf (Voyage API Key Created from the {+atlas-ui+})
         :expanded: false

         .. code-block:: shell
            :linenos:

            syncSource:
               replicaSet:
                  hostAndPort: "mongod.search-community:27017"
                  username: "mongotUser"
                  passwordFile: "/mongot-community/pwfile"
                  authSource: "admin"
                  tls: false
                  readPreference: "primaryPreferred"
            storage:
               dataPath: "data/mongot"
            server:
               grpc:
                  address: "mongot.search-community:27028"
                  tls:
                     mode: "disabled"
            embedding:
               queryKeyFile: "/mongot-community/voyage-api-query-key"
               indexingKeyFile: "/mongot-community/voyage-api-indexing-key"
               providerEndpoint: "https://ai.mongodb.com/v1/embeddings"
               isAutoEmbeddingViewWriter: true
            metrics:
               enabled: true
               address: "mongot.search-community:9946"
            healthCheck:
               address: "mongot.search-community:8080"
            logging:
               verbosity: INFO

      .. collapsible::
         :heading: mongot.conf (Voyage API Key Created directly from Voyage AI)
         :expanded: false

         .. code-block:: shell
            :linenos:

            syncSource:
               replicaSet:
                  hostAndPort: "mongod.search-community:27017"
                  username: "mongotUser"
                  passwordFile: "/mongot-community/pwfile"
                  authSource: "admin"
                  tls: false
                  readPreference: "primaryPreferred"
            storage:
               dataPath: "data/mongot"
            server:
               grpc:
                  address: "mongot.search-community:27028"
                  tls:
                     mode: "disabled"
            embedding:
               queryKeyFile: "/mongot-community/voyage-api-query-key"
               indexingKeyFile: "/mongot-community/voyage-api-indexing-key"
               providerEndpoint: "https://api.voyageai.com/v1/embeddings"
               isAutoEmbeddingViewWriter: true
            metrics:
               enabled: true
               address: "mongot.search-community:9946"
            healthCheck:
               address: "mongot.search-community:8080"
            logging:
               verbosity: INFO

   .. step:: Set up the Docker environment.
      
      To create the Docker network, run the following command: 

      .. code-block:: shell 

         docker network create search-community

   .. step:: Start ``mongod`` and ``mongot``.

      Use the following steps to launch both services:

      a. Launch ``mongod`` and ``mongot``:

         .. code-block:: shell

            docker compose up -d

      #. Wait for both services to fully initialize. 

         To monitor the logs of both services, run the following command: 

         .. code-block:: shell

            docker compose logs -f

         The initialization is complete when the logs return ``MongoDB
         initialization completed``.