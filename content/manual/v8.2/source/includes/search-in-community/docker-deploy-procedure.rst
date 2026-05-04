.. procedure::
   :style: normal

   .. step:: Pull the ``mongot`` Docker image.

      To pull the ``mongot`` Docker image, run the following command:

      .. code-block:: shell

         docker pull mongodb/mongodb-community-search:latest

      To verify the image is on your Docker Desktop, run the following
      command:

      .. code-block:: shell

         docker image ls mongodb/mongodb-community-search

   .. step:: Create a Docker network.

      To create a docker network for inter-container communication between the
      database and search containers, run the following command:

      .. code-block:: shell

         docker network create search-community

   .. step:: Optional. Download the MongoDB Docker image if you haven't installed MongoDB Community Edition.

      If you have already installed MongoDB Community Edition, skip this step. Otherwise, 
      to download the MongoDB Docker image, run the following command:

      .. code-block:: shell

         docker pull mongodb/mongodb-community-server:latest

      .. note::

         You must have a minimum of MongoDB 8.2.0 to use MongoDB Search with an
         on-prem deployment. For more information, see :atlas:`MongoDB Search
         Compatibility </atlas-search/about/feature-compatibility/>`. 

      For additional details on installing MongoDB with Docker,
      see `Install MongoDB Community with Docker 
      <https://www.mongodb.com/docs/manual/tutorial/install-mongodb-community-with-docker/>`_.

   .. step:: Create your keyfile.

      .. _create-your-keyfile-docker:

      Use **Step 1. Create a keyfile** in the :ref:`Deploy New Replica Set with
      Keyfile Access Control <step-1-keyfile>` 
      tutorial to create a keyfile.

      Save the keyfile to a volume that Docker can access.

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

   .. step:: Create your ``mongod`` configuration file.

      .. _create-mongod-config-docker:

      To create your configuration file, save the following code to ``mongod.conf`` 
      or your preferred location.

      .. include:: /includes/search-in-community/sample-mongod-conf-docker.rst

   .. step:: Start your ``mongod``. 

      .. _start-repset-no-auth-docker:

      To start the ``mongod``:

      - Replace ``<your_admin_username>`` with the username you want to specify
        for your admin user
      - Repalce ``<your_admin_password>`` with the password you want to specify
        for your admin user
      - Replace ``</path/to/data/db>`` with the path to the local
        directory for the mounted volume
      - Replace ``</path/to/mongod.conf>`` with the path to the 
        configuration file you created above
      - Replace ``</path/to/keyfile>`` with the path to the keyfile you created above
      - Run the command

      .. code-block:: shell

         docker run --rm \
            --name mongod \
            -e MONGODB_INITDB_ROOT_USERNAME= <your_admin_username> \
            -e MONGODB_INITDB_ROOT_PASSWORD= <your_admin_password> \
            -v </path/to/mongod.conf>:/etc/mongod.conf:ro \
            -v </path/to/data/db>:/data/db \
            -v </path/to/keyfile>:/keyfile \
            -p 27017:27017 \
            --network search-community \
            mongodb/mongodb-community-server:latest \
            --config /etc/mongod.conf \
            --replSetMember=mongod.search-community:27017

   .. step:: In a new shell, start ``mongosh``

      Run the following command to connect to the ``mongod`` instance you
      started on port 27017, replacing ``<your_admin_username>`` and
      ``<your_admin_password>`` with the username and password you created for
      your admin user.

      .. code-block:: shell

         mongosh --port 27017 -u <your_admin_username> -p <your_admin_password>

   .. step:: Create a user for the ``mongot`` process on your MongoDB deployment.

      ``mongot`` must be able to connect to your MongoDB deployment through a
      user with the :authrole:`searchCoordinator` role.

      Run the following command to connect to the ``admin`` database:
      
      .. code-block:: shell

         use admin

      To create a user with the ``searchCoordinator`` role:

      - Replace ``<your-mongot-username>`` with a username for your ``mongot`` user
      - Replace ``<your-mongot-password>`` with the password that you specified in
        your ``passwordFile`` in step 5.
      - Run the command:

        .. code-block:: shell

           db.createUser(
             {
               user: <mongot_username>,
               pwd: <mongot_password>,
               roles: [ "searchCoordinator"]
             }
           )

      For more information on creating users, see :ref:`create-users`.

   .. step:: *Optional*. Create the |api| key files endpoint service |api| keys. 

      If you created the |api| keys for :ref:`automated embedding <avs-auto-embeddings>`, 
      create a credentials files for ``mongot`` to connect to the endpoint service. 

      a. Run the following command to create files called
         ``voyage-api-query-key`` and ``voyage-api-indexing-key`` after 
         replacing ``<your-voyage-api-query-key>`` and 
         ``<your-voyage-api-indexing-key>`` with your valid |voyage| |api| 
         keys: 

         .. code-block:: shell

            printf "<your-voyage-api-query-key>" > voyage-api-query-key
            printf "<your-voyage-api-indexing-key>" > voyage-api-indexing-key

      #. Set the permissions on the |api| key file to ``400``.

         .. code-block:: shell

            chmod 400 voyage-api-query-key 
            chmod 400 voyage-api-indexing-key

      .. note:: 

         The ``mongot`` process uses these |api| keys to generate
         embeddings at index-time and query-time. Although you can use 
         the same key for both, we recommend using different |api| keys from 
         different |service| projects.

   .. step:: Specify your search configuration options.

      .. _mongot-search-config:

      You can configure ``mongot`` with a YAML configuration file. You must
      specify the following: 
      
      - Username that you specified in a prior step as the 
        ``syncSource.replicaSet.username``. 
      - ``passwordFile`` that you created in a prior step as the
        ``syncSource.replicaSet.passwordFile``. 

      You must also specify additional settings if you want :ref:`automated 
      embeddeings <avs-auto-embeddings>`. For more information on all the 
      ``mongot`` configuration options, see :ref:`mongot-configuration-options`. 
      
      For example, you can adapt the settings to your local configuration as shown 
      below:

      .. collapsible::
         :heading: Search and Vector Search without Automated Embedding
         :sub_heading: Sample configuration for deploying mongot without support for automated embedding.
         :expanded: false

         .. include:: /includes/search-in-community/sample-mongot-conf-docker.rst

      .. collapsible::
         :heading: Search and Vector Search with Automated Embedding
         :sub_heading: Sample configuration for deploying mongot with support for automated embedding.
         :expanded: false

         If you want to use automated embedding, you **must** do the following: 
         
         - Set the embedding service provider endpoint URL (on line 29). If you used the 
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
           (on line 30) to ``true``. Set this flag to ``false`` for all other instances.

         .. include:: /includes/search-in-community/sample-mongot-with-auto-embed-conf-docker.rst

      Save your file to ``mongot.config`` or your preferred file location.

      Both containers run on the same ``search-community`` Docker network.

   .. step:: Start the mongot process.

      To start the Search in Community binary, ``mongot``, replace the following placeholder 
      values and then run the command:

      .. list-table:: 
         :stub-columns: 1 

         * - ``</path/to/data/mongot>`` 
           - Path to the local directory for the mounted volume to store 
             ``mongot`` data.
         * - ``</path/to/mongot.conf>`` 
           - Path to the ``mongot`` configuration file that you created.
         * - ``</path/to/passwordFile>`` 
           - Path to the password file you created.
         * - ``</path/to/voyage-api-indexing-key>``
           - (Optional) Path to the |api| key file for indexing.
         * - ``</path/to/voyage-api-query-key>``
           - (Optional) Path to the |api| key file for querying.

      .. code-block:: shell

         docker run --rm \
            --name mongot-community \
            -v </path/to/data/mongot>:/data/mongot \
            -v </path/to/mongot.conf>:/mongot-community/config.default.yml \ 
            -v </path/to/passwordFile>:/passwordFile:ro \
            -v </path/to/voyage-api-indexing-key>:/etc/mongot/voyage-api-indexing-key:ro \
            -v </path/to/voyage-api-query-key>:/etc/mongot/voyage-api-query-key:ro \
            --network search-community \
            -p 8080:8080 \
            -p 9946:9946 \
            mongodb/mongodb-community-search:latest \
            --internalListAllIndexesForTesting=true

      This command:

      - Mounts the volume.
      - Mounts a configuration file from a local volume.
      - Mounts the password file.
      - Mounts the keyfile from a local volume.
      - Mounts the |api| credentials files from a local volume.
      - Specifies the port range.
      - Exposes the metrics port.
      - Configures the system to return index status (if you set the 
        ``internalListAllIndexesForTesting`` flag to ``true``).
      - Starts the container on the ``search-community`` Docker
        network with a container named ``mongot-community``.

   .. include:: /includes/search-in-community/verify-mongot-health.rst
