
To install the latest stable version of MongoDB, issue the
following command:

.. code-block:: sh

   sudo yum install -y {+package-name-org+}

Alternatively, to install a specific release of MongoDB, specify
each component package individually and append the version
number to the package name, as in the following example:

.. include:: /includes/release/pin-repo-to-version-yum.rst

.. note::
 
   ``yum`` automatically upgrades packages when newer versions
   become available. If you want to prevent MongoDB upgrades, pin
   the package by adding the following ``exclude`` directive to
   your ``/etc/yum.conf`` file:

   .. code-block:: ini

      exclude=mongodb-org,mongodb-org-database,mongodb-org-server,mongodb-mongosh,mongodb-org-mongos,mongodb-org-tools
