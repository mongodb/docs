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

Encryption Using ``gen.key`` File
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

|onprem| 4.4 requires an identical ``gen.key`` file on each server 
hosting an |application| or :term:`Backup Daemon <Backup Daemon>`. 
|onprem| uses the file to encrypt and decrypt |onprem|\'s backing 
databases and user credentials. Back up the ``gen.key`` file to a 
secure location.

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

Server Pools
~~~~~~~~~~~~

|onprem| 4.4 removes support for Server Pools.

.. include:: /release-notes/release-advisories/advisories-chronological-releases.rst
