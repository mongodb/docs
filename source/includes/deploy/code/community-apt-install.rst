
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

      To install a specific release, you must specify each component package
      individually along with the version number.

      .. code-block:: sh

         sudo apt-get install -y \
            {+package-name-org+}={+release+} \
            {+package-name-org+}-database={+release+} \
            {+package-name-org+}-server={+release+} \
            {+package-name+}-mongosh \
            {+package-name-org+}-shell={+release+} \
            {+package-name-org+}-mongos={+release+} \
            {+package-name-org+}-tools={+release+} \
            {+package-name-org+}-database-tools-extra={+release+}

      If you only install ``{+package-name-org+}={+release+}``
      and do not include the component packages, the latest
      version of each MongoDB package will be installed
      regardless of what version you specified.

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

