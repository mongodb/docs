
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

   .. step:: Download the MongoDB Docker image.

      To download the MongoDB Docker image, run the following
      command:

      .. code-block:: shell

         docker pull mongodb/mongodb-community-server:latest

      .. note::

         You must have a minimum of MongoDB 8.2+ to use MongoDB Search with an
         on-prem deployment. For more information, see :atlas:`MongoDB Search
         Compatibility </atlas-search/about/feature-compatibility/>`.

      For additional details on installing MongoDB with Docker,
      see `Install MongoDB Community with Docker
      <https://www.mongodb.com/docs/manual/tutorial/install-mongodb-community-with-docker/>`_.

   .. step:: Create a ``mongot`` sync-user password file.

      Create a password file for ``mongot`` to connect to ``mongod``.
      Select your operating system and run the command:

      .. tabs::

         .. tab:: Linux/MacOS
            :tabid: linux_macos

            Replace ``<mongot_password>`` with your password and run the
            following command to create a file called ``passwordFile``
            in your current directory:

            .. code-block:: shell

               echo -n "<mongot_password>" > passwordFile
               chmod 400 passwordFile

         .. tab:: Windows
            :tabid: windows

            Replace ``<mongot_password>`` with your password and run the
            following command to create a file called ``passwordFile``
            inside a Docker-managed named volume called
            ``mongot-secrets``. You reference this volume instead of a
            host path when you start ``mongot`` in a later step.

            .. code-block:: shell

               docker volume create mongot-secrets
               docker run --rm -v mongot-secrets:/secrets busybox sh -c "echo -n '<mongot_password>' > /secrets/passwordFile && chmod 400 /secrets/passwordFile"

            On Windows, a bind-mounted host file does not preserve Unix
            permission bits inside a Linux container. Docker Desktop's
            file-sharing layer overrides the permissions that you set
            on the NTFS side, and Windows has no native ``chmod``
            equivalent. The throwaway container in the preceding
            command sets the permissions correctly on the Linux side.

      .. note::

         The ``-n`` flag prevents a trailing newline.

   .. step:: Create your mongod configuration file.

      .. _create-mongod-config-docker:

      To create your configuration file, save the following code to ``mongod.conf``
      or your preferred location.

      .. include:: /includes/tutorial/code-snippets/rst/sample-mongod-conf-docker.rst

   .. step:: Start your ``mongod``.

      .. _start-repset-no-auth-docker:

      To start the ``mongod``:

      - Replace ``</path/to/data/db>`` with the path to the local
        directory for the mounted volume.
      - Replace ``</path/to/mongod.conf>`` with the path to the
        configuration file you created above.
      - On Windows, replace the backslash (``\``) at the end of each
        line with the line continuation character for your shell.
        Command Prompt uses a caret (``^``), and PowerShell uses a
        backtick.

      .. code-block:: shell

         docker run --rm \
            --name mongod \
            -v </path/to/mongod.conf>:/etc/mongod.conf:ro \
            -v </path/to/data/db>:/data/db \
            -p 27017:27017 \
            --network search-community \
            mongodb/mongodb-community-server:latest \
            --config /etc/mongod.conf \
            --replSetMember=mongod.search-community:27017

   .. step:: In a new shell, start ``mongosh``.

      Run the following command to connect to the ``mongod`` instance
      you started on port ``27017``:

      .. code-block:: shell

         docker exec -it mongod mongosh --port 27017

   .. step:: Create a user for the ``mongot`` process on your MongoDB deployment.

      ``mongot`` must be able to connect to your MongoDB deployment through a
      user with the :authrole:`searchCoordinator` role.

      Run the following command to connect to the ``admin`` database:

      .. code-block:: javascript

         use admin

      To create a user with the ``searchCoordinator`` role:

      - Replace ``<mongot_username>`` with a username for your ``mongot`` user.
      - Replace ``<mongot_password>`` with the password that you specified in
        your ``passwordFile`` in step 4.
      - Run the following command:

      .. code-block:: javascript

         db.createUser(
            {
               user: "<mongot_username>",
               pwd: "<mongot_password>",
               roles: [ "searchCoordinator" ]
            }
         )

      For more information on creating users, see :ref:`create-users`.

   .. step:: Specify your search configuration options.

      .. _mongot-search-config:

      You can configure ``mongot`` with a YAML configuration file. You must
      specify the username that you specified in the previous step as the
      ``syncSource.replicaSet.scramAuth.username``. You must also specify
      the ``passwordFile`` that you created in the previous step as the
      ``syncSource.replicaSet.scramAuth.passwordFile``.

      For more information
      on ``mongot`` configuration options, see
      :ref:`mongot-configuration-options`.

      For example, you can adapt the settings to your local
      configuration as shown below:

      .. include:: /includes/tutorial/code-snippets/rst/sample-mongot-conf-docker.rst

      Save your file to ``mongot.config`` or your preferred file location.

      Both containers run on the same ``search-community`` Docker network.

   .. step:: Start the mongot process.

      To start the Search in Community binary (``mongot``), select your
      operating system and run the command:

      .. tabs::

         .. tab:: Linux/MacOS
            :tabid: linux_macos

            - Replace ``</path/to/data/mongot>`` with the path to the
              local directory for the mounted volume to store
              ``mongot`` data.
            - Replace ``</path/to/mongot.conf>`` with the path to the
              ``mongot`` configuration file that you created in the
              previous step.
            - Replace ``</path/to/passwordFile>`` with the path to the
              password file that you created.

            .. code-block:: shell

               docker run --rm \
                  --name mongot-community \
                  -v </path/to/data/mongot>:/data/mongot \
                  -v </path/to/mongot.conf>:/mongot-community/config.default.yml \
                  -v </path/to/passwordFile>:/passwordFile:ro \
                  --network search-community \
                  -p 8080:8080 \
                  -p 9946:9946 \
                  mongodb/mongodb-community-search:latest

         .. tab:: Windows
            :tabid: windows

            - Replace ``</path/to/data/mongot>`` with the path to the
              local directory for the mounted volume to store
              ``mongot`` data.
            - Replace ``</path/to/mongot.conf>`` with the path to the
              ``mongot`` configuration file that you created in the
              previous step.
            - Set
              ``syncSource.replicaSet.scramAuth.passwordFile`` in your
              ``mongot`` configuration file to
              ``"/secrets/passwordFile"`` instead of
              ``"/passwordFile"``. The command mounts the
              ``mongot-secrets`` volume that you created in step 4 at
              ``/secrets`` in the container.
            - In PowerShell, replace each caret (``^``) with a backtick.
              The command uses the caret (``^``) line continuation
              character for Command Prompt.

            .. code-block:: shell

               docker run --rm ^
                  --name mongot-community ^
                  -v </path/to/data/mongot>:/data/mongot ^
                  -v </path/to/mongot.conf>:/mongot-community/config.default.yml ^
                  -v mongot-secrets:/secrets:ro ^
                  --network search-community ^
                  -p 8080:8080 ^
                  -p 9946:9946 ^
                  mongodb/mongodb-community-search:latest

      This command:

      - Mounts the volume.
      - Mounts a configuration file from a local volume.
      - Specifies the port range.
      - Exposes the metrics port.
      - Starts the container on the ``search-community`` Docker
        network with a container named ``mongot-community``.

   .. include:: /includes/tutorial/procedures/step-verify-mongot-health.rst
