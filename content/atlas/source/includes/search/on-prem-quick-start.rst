.. _community-search-quick-start:

This quick start demonstrates how to deploy MongoDB Search and MongoDB Vector
Search in Docker, load sample data into the MongoDB cluster, create search index
for the sample data, and run search queries against the sample data.

*Time required: 20 minutes*

About This Task
---------------

This quick start walks you through the following steps:

1. Deploy MongoDB and ``mongot`` in Docker. 

   For more details on deploying by using a tarball or as an image in Docker,
   see :ref:`Install and Deploy MongoDB Search <community-search-deploy>`.

#. Load sample data, create search index, and run search queries on your local deployment.

.. note::

   The resulting set up of this quick start is not secure. For more information
   on securing your deployment, see :manual:`Security for Self-Managed Deployments
   </administration/security-checklist>`. 

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

Procedure 
---------

.. procedure:: 
   :style: normal 

   .. step:: Pull the MongoDB Search Docker image and the latest MongoDB Community Edition image

      To download the ``mongot`` Docker image and the latest MongoDB Community
      Edition image, run the following command:

      .. code-block:: shell

         docker pull mongodb/mongodb-community-server:latest && docker pull mongodb/mongodb-community-search:latest
         
      .. note::

         You must have a minimum of MongoDB 8.2.0 to use MongoDB Search with a
         self-managed deployment. For more information, see :ref:`MongoDB Search
         Compatibility <fts-feature-availability>`. 

   .. step:: Download an archive of sample data

      To download the sample data, run the following command: 

      .. code-block:: shell 

         curl https://atlas-education.s3.amazonaws.com/sampledata.archive -o sampledata.archive
         
   .. step:: Create your password file

      Create a password file for ``mongot`` to connect to ``mongod``. 

      .. note::

         Do not include trailing newlines in your password file. 
         ``mongot`` rejects password files that contain trailing newlines. 

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

   .. step:: Set up your configuration files

      Create the following configuration files in your project folder:

      .. collapsible::
         :heading: docker-compose.yml 
         :expanded: false
         
         .. code-block:: shell

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
                  container_name: mongot-community-pupr
                  networks:
                     - search-community
                  volumes:
                     - mongot_data:/data/mongot
                     - ./mongot.conf:/mongot-community/config.default.yml
                     - ./pwfile:/mongot-community/pwfile:ro
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
            :manual:`Self-Managed Security </core/self-managed-security>`. 
               
         .. code-block:: shell 
   
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

      .. collapsible::
         :heading: mongot.conf 
         :expanded: false
               
         .. code-block:: shell

            syncSource:
               replicaSet:
                  hostAndPort: "mongod.search-community:27017"
                  username: mongotUser
                  passwordFile: /mongot-community/pwfile
                  authSource: admin
                  tls: false
                  readPreference: primaryPreferred
            storage:
               dataPath: "data/mongot"
            server:
               grpc:
                  address: "mongot.search-community:27028"
                  tls:
                     mode: "disabled"
            metrics:
               enabled: true
               address: "mongot.search-community:9946"
            healthCheck:
               address: "mongot.search-community:8080"
            logging:
               verbosity: INFO

   .. step:: Set up the Docker environment
      
      To create the Docker network, run the following command: 

      .. code-block:: shell 

         docker network create search-community

   .. step:: Start ``mongod`` and ``mongot``

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
   
   .. step:: Create a {+fts+} index

      a. Connect to MongoDB with ``mongosh``

         .. code-block:: shell
            
            mongosh

      b. In the MongoDB shell, run the following commands to create a search
         index on the sample data

         .. code-block:: javascript         

            // Switch to the sample database
            use sample_mflix

            // Create a search index on the movies collection
            db.movies.createSearchIndex(
               "default",
               { mappings: 
                  { dynamic: true } 
               }
            )

   .. step:: Test your search functionality

      To test your ``mongot`` functionality, run a search query:

      .. code-block:: javscript 

         // Search for movies with "baseball" in the plot
         db.movies.aggregate( [
            {
               $search: {
                  "text": {
                  "query": "baseball",
                  "path": "plot"
                  }
               }
            },
            {
               $limit: 5
            },
            {
               $project: {
                  "_id": 0,
                  "title": 1,
                  "plot": 1
               }
            }
         ] )

      The results should include movies that mention "baseball" in their plots. 

Learn More
----------

To learn how to create indexes and run queries against the sample data
and against your own data, see the following documentation:

- :ref:`MongoDB Search <what-is-fts>`
- :ref:`MongoDB Vector Search <avs-overview>`