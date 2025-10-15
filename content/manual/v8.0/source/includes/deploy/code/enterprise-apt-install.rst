
.. tabs::

   .. tab:: Latest Release
      :tabid: latest

      To install the latest release of MongoDB Enterprise
      Server, run the following command:

      .. code-block:: bash

         sudo apt-get install {+package-name-enterprise+}

   .. tab:: Specific Release
      :tabid: specific

      To install a specific release, you must specify each component package
      individually along with the version number.

      .. code-block:: sh

         sudo apt-get install -y \
            {+package-name-enterprise+}={+release+} \
            {+package-name-enterprise+}-database={+release+} \
            {+package-name-enterprise+}-server={+release+} \
            {+package-name+}-mongosh \
            {+package-name-enterprise+}-shell={+release+} \
            {+package-name-enterprise+}-mongos={+release+} \
            {+package-name-enterprise+}-tools={+release+} \
            {+package-name-enterprise+}-cryptd={+release+} \
            {+package-name-enterprise+}-database-tools-extra={+release+}

      If you only install
      ``{+package-name-enterprise+}={+release+}`` and do not
      include the component packages, the latest version of each
      MongoDB package will be installed regardless of what
      version you specified.

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
 
