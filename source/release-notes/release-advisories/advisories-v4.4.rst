Before upgrading |onprem| from 4.2 to 4.4, review the following
considerations:

Backing Databases
~~~~~~~~~~~~~~~~~

|onprem| 4.4.0 requires a minimum of MongoDB 4.0.0 for |onprem| backing
databases.

Personal API Keys
~~~~~~~~~~~~~~~~~

|onprem| 4.4 deprecates the use of Personal |api| Keys.

- Can't create new Personal |api| Keys.
- Removes support for Personal |api| Keys in |onprem| 4.6.

Platform Support Changes
~~~~~~~~~~~~~~~~~~~~~~~~

Ops Manager Microsoft Windows Support Changes
`````````````````````````````````````````````

- |onprem| 4.4 will be the last release series with support for running
  |onprem| services on the Windows platform.

- Future releases of |onprem| will continue to support the management
  of MongoDB deployments on Windows.

MongoDB Platform Support Changes
````````````````````````````````

- |onprem| 4.4 removes support MongoDB deployments run on the following
  platforms:

  - Amazon Linux 1 on the x86_64 architecture
  - Ubuntu 16.04 on the ppc64le architecture

Backup Support Changes
~~~~~~~~~~~~~~~~~~~~~~

|onprem| 4.4 can't back up MongoDB |fcv-link| 4.2 or later deployments
to Filesystem Snapshot Stores.

Support will be added in a later 4.4.x release.

Server Pools
~~~~~~~~~~~~

|onprem| 4.4 removes support for Server Pools.

.. include:: /release-notes/release-advisories/advisories-chronological-releases.rst
