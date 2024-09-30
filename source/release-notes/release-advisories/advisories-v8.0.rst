Before upgrading |onprem| from 7.0 to 8.0, review the following considerations:

Backing Databases
~~~~~~~~~~~~~~~~~

|onprem| 8.0.0 requires a minimum of MongoDB 6.0.0 for |onprem| backing 
databases.

.. include:: /includes/fact-opsmanager-backingdb-version.rst

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
   are not supported when you use :manual:`config shards 
   </core/sharded-cluster-config-servers/#config-shards>`.
