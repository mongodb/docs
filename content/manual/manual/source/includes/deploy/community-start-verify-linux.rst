.. MongoDB Community/Enterprise procedure to start and verify mongod

.. procedure::
   :style: normal

   .. step:: Verify the MongoDB |edition| installation.

      .. include:: /includes/deploy/community-version.rst

   .. step:: Start MongoDB |edition|.

      To start the MongoDB service, use the ``systemctl`` command:

      .. code-block:: bash

         sudo systemctl start mongod

   .. step:: Verify that MongoDB |edition| is running.

      To verify that the MongoDB service is running, check its status
      with the ``systemctl`` command:

      .. io-code-block::

         .. input::
            :language: bash

            systemctl status mongod

         .. output::
            :language: none

            ● mongod.service - High-performance, schema-free document-oriented database
                 Loaded: loaded (/lib/systemd/system/mongod.service; enabled;
                 vendor preset: enabled)
                 Active: active (running) since Mon 2026-09-21 09:41:13 UTC;
                 4 days ago
                   Docs: https://docs.mongodb.org/manual
               Main PID: 8642 (mongod)
                 Memory: 148.1M
                     CPU: 2m 15s
                 CGroup: /system.slice/mongod.service
                         └─8642 /usr/bin/mongod --config /etc/mongod.conf

   .. step:: Configure systemd to start MongoDB on boot.

      To configure the MongoDB service to start on boot, use the
      ``systemctl`` command:

      .. io-code-block::

         .. input::
            :language: bash

            sudo systemctl enable mongod

         .. output::
            :language: none

            Created symlink /etc/systemd/system/multi-user.target.wants/mongod.service → /usr/lib/systemd/system/mongod.service.

