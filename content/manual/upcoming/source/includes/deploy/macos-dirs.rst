
Formulae that install MongoDB on macOS using Homebrew use a
configuration file. When you start MongoDB as a Homebrew service, it
automatically loads this configuration.

The specific default paths used by MongoDB depend on whether you
installed the Homebrew formulae on an Apple Silicon- or Intel-based
macOS system.

.. tabs::

   .. tab:: Apple Silicon
      :tabid: apple

      The configuration file is at ``/opt/homebrew/etc/mongod.conf``.


   .. tab:: Intel
      :tabid: intel


      The configuration file is at ``/usr/local/etc/mongod.conf``.

Data Directory
~~~~~~~~~~~~~~

.. tabs::
   :hidden:

   .. tab:: Apple Silicon
      :tabid: apple

      The default data directory is ``/opt/homebrew/var/mongodb``.

   .. tab:: Intel
      :tabid: intel

      The default data directory is ``/usr/local/var/mongodb``.

To change this default:

- Update the :setting:`storage.dbPath` setting in the
  configuration file to change the data directory used by
  the service.

- Run :binary:`~bin.mongod` with the
  :option:`--dbPath <mongod --dbpath>` option to change the path
  when manually starting MongoDB.

Log Directory
~~~~~~~~~~~~~

.. tabs::
   :hidden:

   .. tab:: Apple Silicon
      :tabid: apple

      The default log directory is ``/opt/homebrew/var/log/mongodb``.

   .. tab:: Intel
      :tabid: intel

      The default log directory is ``/usr/local/var/log/mongodb``.

To change this default:

- Update the :setting:`systemLog.path` setting in the
  configuration file to change the log directory used by
  the service.

- Run :binary:`~bin.mongod` with the
  :option:`--logpath <mongod --logpath>` option to change the path
  when manually starting MongoDB.

