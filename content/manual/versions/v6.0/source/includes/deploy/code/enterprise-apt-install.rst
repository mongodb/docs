
.. tabs::

   .. tab:: Latest Release
      :tabid: latest

      To install the latest release of MongoDB Enterprise
      Server, run the following command:

      .. code-block:: bash

         sudo apt-get install -y {+package-name-enterprise+}

   .. tab:: Specific Release
      :tabid: specific

      .. include:: /includes/release/pin-version-intro.rst
      .. include:: /includes/release/pin-repo-to-version-deb-enterprise.rst
      .. include:: /includes/release/pin-version-outro-enterprise.rst

      Although you can specify any available version of MongoDB,
      ``apt-get`` upgrades the packages when a newer version
      becomes available. To prevent unintended upgrades, pin the
      package. To pin the version of MongoDB at the currently
      installed version, issue the following command sequence:

      .. code-block:: bash

         echo "{+package-name-enterprise+} hold" | sudo dpkg --set-selections
         echo "{+package-name-enterprise+}-server hold" | sudo dpkg --set-selections
         echo "{+package-name-enterprise+}-database hold" | sudo dpkg --set-selections
         echo "{+package-name+}-mongosh hold" | sudo dpkg --set-selections
         echo "{+package-name-enterprise+}-mongos hold" | sudo dpkg --set-selections
         echo "{+package-name-enterprise+}-cryptd hold" | sudo dpkg --set-selections
         echo "{+package-name-enterprise+}-tools hold" | sudo dpkg --set-selections
         echo "{+package-name-enterprise+}-databae-tools-extra hold" | sudo dpkg --set-selections
 
