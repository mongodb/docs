
.. tabs::

   .. tab:: Latest Release
      :tabid: latest

      To install the latest stable version of MongoDB, run the
      following command:
      
      .. code-block:: sh
      
         sudo yum install -y {+package-name-org+}

   .. tab:: Specific Release
      :tabid: specific

      To install a specific release of MongoDB, specify
      each component package individually and append the version
      number to the package name.

      .. code-block:: sh
      
         sudo yum install -y \
            {+package-name-org+}-{+release+} \
            {+package-name-org+}-database-{+release+} \
            {+package-name-org+}-server-{+release+} \
            {+package-name+}-mongosh \
            {+package-name-org+}-mongos-{+release+} \
            {+package-name-org+}-tools-{+release+} \
            {+package-name-org+}-database-tools-extra-{+release+}

      .. note::

         ``yum`` automatically upgrades packages when newer versions
         become available. To prevent updates, configure ``yum``
         to exclude the relevant packages in the
         ``/etc/yum.conf`` file:

         .. code-block:: ini
      
            exclude=mongodb-org,mongodb-org-database,mongodb-org-server,mongodb-mongosh,mongodb-org-mongos,mongodb-org-tools

