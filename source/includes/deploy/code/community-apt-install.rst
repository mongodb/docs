
You can install either the latest stable version of MongoDB or a
specific version of MongoDB.

.. tabs::

   .. tab:: Latest Release
      :tabid: latest

      To install the latest stable version, issue the following

      .. code-block:: bash

         sudo apt-get install -y {+package-name-org+}

   .. tab:: Specific Release
      :tabid: specific

      .. include:: /includes/release/pin-version-intro.rst
      .. include:: /includes/release/pin-repo-to-version-deb.rst
      .. include:: /includes/release/pin-version-outro-org.rst

      Optional. Although you can specify any available version of MongoDB,
      ``apt-get`` will upgrade the packages when a newer version becomes
      available. To prevent unintended upgrades, you can pin the package
      at the currently installed version:

      .. code-block:: bash

         echo "{+package-name-org+} hold" | sudo dpkg --set-selections
         echo "{+package-name-org+}-database hold" | sudo dpkg --set-selections
         echo "{+package-name-org+}-server hold" | sudo dpkg --set-selections
         echo "{+package-name+}-mongosh hold" | sudo dpkg --set-selections
         echo "{+package-name-org+}-mongos hold" | sudo dpkg --set-selections
         echo "{+package-name-org+}-cryptd hold" | sudo dpkg --set-selections
         echo "{+package-name-org+}-tools hold" | sudo dpkg --set-selections
         echo "{+package-name-org+}-database-tools-extra hold" | sudo dpkg --set-selections

