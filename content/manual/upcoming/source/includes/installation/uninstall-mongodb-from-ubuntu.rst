.. procedure::

   .. step:: Stop MongoDB.

      Stop the :binary:`~bin.mongod` process by issuing the following
      command:

      .. code-block:: sh

         sudo systemctl stop mongod

   .. step:: Remove Packages.

      Remove any MongoDB packages that you previously installed.

      .. tabs::

         .. tab:: Enterprise
            :tabid: enterprise

            .. code-block:: sh

               sudo apt purge {+package-name-enterprise+}*

         .. tab:: Community
            :tabid: community

            .. code-block:: sh

               sudo apt purge {+package-name-org+}*

   .. step:: Remove Data Directories.

      Remove MongoDB databases and log files.

      .. code-block:: sh

         sudo rm -r /var/log/mongodb
         sudo rm -r /var/lib/mongodb

   .. step:: Remove Configuration Files.

      Remove the MongoDB configuration file.

      .. code-block:: sh

         sudo rm /etc/mongod.conf
