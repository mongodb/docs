
Packages that install MongoDB on Linux-based operating systems place the
configuration file at ``/etc/mongod.conf``. When you start MongoDB
through systemd, it automatically loads this configuration.

Data Directory
~~~~~~~~~~~~~~

The configuration file sets the data directory to different paths,
depending on your distribution:

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - Distributions
     - Path
   * - RHEL, SUSE, and Amazon Linux
     - ``/var/lib/mongo``
   * - Debian and Ubuntu
     - ``/var/lib/mongodb``

To change this default:

- Update the :setting:`storage.dbPath` setting in the configuration file
  to change the data directory used by the service.

- Run :binary:`~bin.mongod` with the
  :option:`--dbPath <mongod --dbpath>` option to change the path
  when manually starting MongoDB.

Log Directory
~~~~~~~~~~~~~

The configuration file sets the log directory to ``/var/log/mongodb``.
To change this default:

- Update the :setting:`systemLog.path` setting in the configuration
  file to change the log directory used by the service.

- Run :binary:`~bin.mongod` with the
  :option:`--logpath <mongod --logpath>` option to change the path
  when manually starting MongoDB.

