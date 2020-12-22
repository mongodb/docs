Before upgrading |onprem| from 4.2 to 4.4, review the following
considerations:

Backing Databases
~~~~~~~~~~~~~~~~~

|onprem| 4.4.0 requires a minimum of MongoDB 4.0.0 for |onprem| backing
databases.

Compatible MongoDB Tools
~~~~~~~~~~~~~~~~~~~~~~~~

If you run |onprem| 4.4.0 in
:doc:`local mode </tutorial/configure-local-mode>`, you must
:dl:`download and install a compatible version of the MongoDB Tools <database-tools>`.

.. list-table::
   :widths: 40 60
   :header-rows: 1

   * - Ops Manager Server Version
     - Compatible MongoDB Database Tools Version

   * - :ref:`4.4.5 <opsmgr-server-4.4.5>`
     - :dl:`100.2.0 <database-tools>`

   * - :ref:`4.4.4 <opsmgr-server-4.4.4>`
     - :dlarch:`100.1.0 <database-tools>`

   * - :ref:`4.4.3 <opsmgr-server-4.4.3>`
     - :dlarch:`100.1.0 <database-tools>`

   * - :ref:`4.4.2 <opsmgr-server-4.4.2>`
     - :dlarch:`100.1.0 <database-tools>`

   * - :ref:`4.4.1 <opsmgr-server-4.4.1>`
     - :dlarch:`100.0.2 <database-tools>`

   * - :ref:`4.4.0 <opsmgr-server-4.4.0>`
     - :dlarch:`100.0.2 <database-tools>`

To access older versions of the MongoDB Tools, click
:dlarch:`Archived releases <database-tools>` on the Download page.

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

.. include:: /includes/facts/opsmgr-windows-stops-4.4.rst

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
