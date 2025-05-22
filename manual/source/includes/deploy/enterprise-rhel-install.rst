
.. tabs::

   .. tab:: Latest Release
      :tabid: latest

      To install the latest stable version of MongoDB Enterprise
      {+latest-lts-version+}, issue the following command:
      
      .. code-block:: sh
      
         sudo yum install -y {+package-name-enterprise+}

   .. tab:: Specific Release
      :tabid: specific


      To install a specific release, you must specify each
      component package individually along with the version
      number.

      .. code-block::

         sudo yum install -y \
            {+package-name-enterprise+}-{+release+} \
            {+package-name-enterprise+}-database-{+release+} \
            {+package-name-enterprise+}-server-{+release+} \
            {+package-name+}-mongosh \
            {+package-name-enterprise+}-mongos-{+release+} \
            {+package-name-enterprise+}-tools-{+release+} \
            {+package-name-enterprise+}-cryptd-{+release+} \
            {+package-name-enterprise+}-database-tools-extra-{+release+}

      .. note::
      
         Although you can specify any available version of MongoDB
         Enterprise, ``yum`` upgrades the packages when a newer
         version becomes available. To prevent unintended upgrades,
         pin the package by adding the following ``exclude`` directive
         to your ``/etc/yum.conf`` file:
      
         .. code-block:: ini
      
            exclude=mongodb-enterprise,mongodb-enterprise-database,mongodb-enterprise-server,mongodb-enterprise-shell,mongodb-enterprise-mongos,mongodb-enterprise-tools
