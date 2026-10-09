
Packages that install MongoDB on Windows place the configuration
file at ``<install directory>\bin\mongod.cfg``. When you start
MongoDB as a Windows service, the service automatically loads this
configuration.

Data Directory
~~~~~~~~~~~~~~

The configuration file sets the data directory to
``C:\Program Files\MongoDB\Server\{+version+}\data``.
To change this default:

- Update the :setting:`storage.dbPath` setting in the
  configuration file to change the data directory used by the
  service.

- Run :binary:`~bin.mongod` with the
  :option:`--dbPath <mongod --dbpath>` option to change the path
  when manually starting MongoDB.

Log Directory
~~~~~~~~~~~~~

The configuration file sets the log directory to
``C:\Program Files\MongoDB\Server\{+version+}\log\mongod.log``.
To change this default:

- Update the :setting:`systemLog.path` setting in the
  configuration file to change the log directory used by the
  service.

- Run :binary:`~bin.mongod` with the
  :option:`--logpath <mongod --logpath>` option to change the path
  when manually starting MongoDB.

