
.. tabs::

   .. tab:: Latest Release
      :tabid: latest

      To install the latest stable version of MongoDB Enterprise
      {+latest-lts-version+}, issue the following command:
      
      .. code-block:: sh
      
         sudo yum install -y {+package-name-enterprise+}

   .. tab:: Specific Release
      :tabid: specific

      .. include:: /includes/release/pin-version-intro.rst
      .. include:: /includes/release/pin-repo-to-version-yum-enterprise.rst
       
      .. note::
      
         Although you can specify any available version of MongoDB
         Enterprise, ``yum`` upgrades the packages when a newer
         version becomes available. To prevent unintended upgrades,
         pin the package by adding the following ``exclude`` directive
         to your ``/etc/yum.conf`` file:
      
         .. code-block:: ini
      
            exclude=mongodb-enterprise,mongodb-enterprise-database,mongodb-enterprise-server,mongodb-enterprise-shell,mongodb-enterprise-mongos,mongodb-enterprise-tools
