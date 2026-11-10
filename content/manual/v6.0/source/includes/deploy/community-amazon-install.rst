
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
      number to the package name, as in the following example:
      
      .. include:: /includes/release/pin-repo-to-version-yum.rst
      
      .. note::

         ``yum`` automatically upgrades packages when newer versions
         become available. To prevent updates, configure ``yum``
         to exclude the relevant packages in the
         ``/etc/yum.conf`` file:

         .. code-block:: ini
      
            exclude=mongodb-org,mongodb-org-database,mongodb-org-server,mongodb-mongosh,mongodb-org-mongos,mongodb-org-tools

