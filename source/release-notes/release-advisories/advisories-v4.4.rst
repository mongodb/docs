Before upgrading |onprem| from 4.2 to 4.4, review the following
considerations:

Backing Databases
~~~~~~~~~~~~~~~~~

|onprem| 4.4 requires a minimum of MongoDB 4.0 for |onprem| backing databases.

Personal API Keys
~~~~~~~~~~~~~~~~~

|onprem| 4.4 deprecates use of Personal API Keys.

- Can't create new Personal API Keys.
- Removes support for Personal API Keys in |onprem| 4.6.

Platform Support Changes
~~~~~~~~~~~~~~~~~~~~~~~~

- |onprem| 4.4 will be the last release series with support for running
  |onprem| services on the Windows platform.

- Future releases of |onprem| will continue to support the management
  of MongoDB deployments on Windows.

Backup Support Changes
~~~~~~~~~~~~~~~~~~~~~~

|onprem| 4.4 will support of Filesystem Snapshot Stores for backups of
MongoDB 4.2 or later databases in a future |onprem| 4.4.x release.

Server Pools
~~~~~~~~~~~~

|onprem| 4.4 removes support for Server Pools.

.. include:: /release-notes/release-advisories/advisories-chronological-releases.rst
