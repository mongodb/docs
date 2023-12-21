Before upgrading |onprem| from 4.2 to 4.4, review the following
considerations:

Backing Databases
~~~~~~~~~~~~~~~~~

|onprem| 4.4.0 requires a minimum of MongoDB 4.0.0 for |onprem| backing
databases.

.. include:: /includes/fact-opsmanager-backingdb-version.rst

Compatible MongoDB Tools
~~~~~~~~~~~~~~~~~~~~~~~~

If |onprem| manages your MongoDB Tools, the tool versions are upgraded 
when you upgrade |onprem|.

If you run |onprem| 4.4.0 in
:doc:`local mode </tutorial/configure-local-mode>`, you must
:dl:`download and install a compatible version of the MongoDB Tools TGZ package <database-tools>` to the ``versions`` directory.

.. include:: /includes/list-tables/compatibility-matrix/db-tools-OMv4.4.rst

To access older versions of the MongoDB Tools, click
`Archived releases <https://www.mongodb.com/download-center/database-tools/releases/archive>`__ on the Download page.

Personal API Keys
~~~~~~~~~~~~~~~~~

|onprem| 4.4 deprecates the use of Personal |api| Keys.

- Can't create new Personal |api| Keys.
- Removes support for Personal |api| Keys in |onprem| 4.6.

Encryption Using ``gen.key`` File
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

|onprem| 4.4 requires an identical ``gen.key`` file on each server
hosting an |application| or :opsmgr:`Backup Daemon </reference/glossary/#std-term-Backup-Daemon>`.
|onprem| uses the file to encrypt and decrypt |onprem|\'s backing
databases and user credentials. Back up the ``gen.key`` file to a
secure location.

Backup Changes for FCV 4.2 and later
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/facts/fcv-backup-considerations.rst

Platform Support Changes
~~~~~~~~~~~~~~~~~~~~~~~~

Ops Manager Microsoft Windows Support Changes
`````````````````````````````````````````````

.. include:: /includes/facts/opsmgr-windows-stops-4.4.rst

MongoDB Platform Support Changes
````````````````````````````````

|onprem| 4.4 removes support for managing MongoDB deployments with the
MongoDB Agent that run on:

- Amazon Linux 1 on the x86_64 architecture
- RHEL 7.x, Ubuntu 16.x on the PowerPC (``ppc64le``) architecture
- RHEL 6.x/7.x, Ubuntu 18.x, and SUSE 12.x on zSeries (``s390x``)
  architecture

Server Pools
~~~~~~~~~~~~

|onprem| 4.4 removes support for Server Pools.

BI Connector
~~~~~~~~~~~~

If you use an |onprem|-managed 
:ref:`BI Connector <deploy-bi-connector>`, the BI Connector version 
is upgraded when you upgrade |onprem|. You cannot select a different 
version.
