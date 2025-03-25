You can install either the latest stable release of MongoDB or a
specific release of MongoDB.

.. tabs::

   .. tab:: Latest Release
      :tabid: latest

      To install the latest version of MongoDB, run the
      following command:

      .. code-block:: sh

         sudo zypper -n install mongodb-org

   .. tab:: Specific Release
      :tabid: specific

      To install a specific release of MongoDB, specify each
      component package individually and append the version
      number to the package name, as in the following example:

      .. code-block:: sh

         sudo zypper install \
            mongodb-org-{+release+} \
            mongodb-org-database-{+release+} \
            mongodb-org-server-{+release+} \
            mongodb-mongosh \
            mongodb-org-cryptd-{+release+} \
            mongodb-org-mongos-{+release+} \
            mongodb-org-tools-{+release+} \
            mongodb-org-database-tools-extra-{+release+}

      You can specify any available version of MongoDB. However,
      zypper upgrades the packages when a newer version becomes
      available. To prevent unintended upgrades, pin the
      packages by running the following command:

      .. code-block:: sh

         sudo zypper addlock \
            mongodb-org-{+release+} \
            mongodb-org-database-{+release+} \
            mongodb-org-server-{+release+} \
            mongodb-mongosh \
            mongodb-org-cryptd-{+release+} \
            mongodb-org-mongos-{+release+} \
            mongodb-org-tools-{+release+} \
            mongodb-org-database-tools-extra-{+release+}

      Previous versions of MongoDB packages use a different
      repository location. Refer to the version of the
      documentation appropriate for your MongoDB version.
