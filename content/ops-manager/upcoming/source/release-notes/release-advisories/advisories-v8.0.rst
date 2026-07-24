Before upgrading |onprem| from 7.0 to 8.0, review the following considerations:

Backing Databases
~~~~~~~~~~~~~~~~~

|onprem| 8.0.0 requires a minimum of MongoDB 6.0.0 for |onprem| backing 
databases.

.. include:: /includes/fact-opsmanager-backingdb-version.rst

Compatible MongoDB Tools
~~~~~~~~~~~~~~~~~~~~~~~~

If |onprem| manages your MongoDB Tools, Ops Manager upgrades the tool
versions automatically when you upgrade |onprem|.

If you run |onprem| 8.0.x in :ref:`local mode <om-use-local-mode>`,
you must download and install the latest version of `mongosh
<https://www.mongodb.com/docs/mongodb-shell/install/>`__ and the
:dl:`MongoDB Database Tools TGZ package <database-tools>` version
listed in the :ref:`Database Tools Compatibility table
<ops-manager-dbtools-compatibility>` to the ``versions`` directory.

The Download page offers only the latest Database Tools release. To
download the compatible version instead, see `Archived releases
<https://www.mongodb.com/download-center/database-tools/releases/archive>`__.

|onprem| Platform Support
~~~~~~~~~~~~~~~~~~~~~~~~~

- Removes |onprem| support for RedHat Enterprise Linux 7.
- Removes |onprem| support for SUSE Linux Enterprise Server 12.
- Removes |onprem| support for Ubuntu 20.04 LTS.

.. important::
    
   - Deprecates |onprem| support for Amazon Linux v2 LTS.
   - Deprecates |onprem| support for Debian 11.

Automation Support Changes
~~~~~~~~~~~~~~~~~~~~~~~~~~
     
- Removes support for automating, monitoring, and 
  backing up MongoDB versions 4.2 and earlier. 
  |onprem| can only manage databases that run MongoDB 4.4 or higher. 

.. important::
    
   - Deprecates support for automating, monitoring, and backing up 
     MongoDB versions 5.0 and earlier. 

.. note::

   :ref:`Queryable backups <restore-from-queryable-backup>` 
   are not supported when you use :ref:`config shards <sharded-cluster-config-server-config-shards>`.
