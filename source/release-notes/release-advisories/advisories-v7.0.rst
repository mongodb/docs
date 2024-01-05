Before upgrading |onprem| from 6.0 to 7.0, review the following considerations:

Backing Databases
~~~~~~~~~~~~~~~~~

|onprem| 7.0.0 requires a minimum of MongoDB 5.0.0 for |onprem| backing 
databases.

.. include:: /includes/fact-opsmanager-backingdb-version.rst

Compatible MongoDB Tools
~~~~~~~~~~~~~~~~~~~~~~~~

If |onprem| manages your MongoDB Tools, the tool versions are upgraded 
when you upgrade |onprem|.

If you run |onprem| 7.0.x in :doc:`local mode
</tutorial/configure-local-mode>`, you must :dl:`download and
install a compatible version of the MongoDB Tools TGZ package
<database-tools>` to the ``versions`` directory.

.. include:: /includes/list-tables/compatibility-matrix/db-tools-OMv7.0.rst

To access older versions of the MongoDB Tools, click
`Archived releases <https://www.mongodb.com/download-center/database-tools/releases/archive>`__ on the Download page.

|onprem| and Automation Platform Support
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- Removes |onprem| and {+mdbagent+} support for Debian 10.
- Removes |onprem| and {+mdbagent+} support for Ubuntu 18.04 LTS.

.. important::
   
   |onprem| 7.0 deprecates support for RedHat Enterprise Linux 7, 
   SUSE Linux Enterprise Server 12, and Ubuntu 20.04 LTS.

Automation Support Changes
~~~~~~~~~~~~~~~~~~~~~~~~~~

- Removes support for automating, monitoring, and backing up MongoDB 
  versions 4.0 and earlier. |onprem| can only manage databases that 
  run MongoDB 4.2 or later. 

- Removes support for |snmp| alerts. 

  - You can monitor your clusters with |onprem| instead. To
    learn about other alert options, see :ref:`third-party-integrations`.

- Removes support for the Manage Sharded Collections UI. 
  
  - Removes the ability to shard a collection, 
    manage the sharded cluster balancer, and manage sharded 
    zones through the UI. You still have full control
    of your sharded cluster available through the command line 
    by using {+mongosh+}.

Migration
~~~~~~~~~

- Removes support for the MongoDB Cloud Migration Service in |onprem|. 
  If you need to use push-based migrations to migrate your 
  deployments to |service|, you can use the Cloud Migration Service in |cloud|.

User Interface
~~~~~~~~~~~~~~

- Removes support for Internet Explorer 11.
