.. list-table::
   :header-rows: 1
   :widths: 25 35 40

   * - Item
     - Location
     - Description

   * - Encryption key ``gen.key``
     - ``/etc/mongodb-mms/gen.key``
     - Encrypts the application database contents. Must match the key
       used for the original installation, or the primary |onprem|
       can't decrypt the restored application database on startup.

   * - |onprem| configuration
     - ``conf-mms.properties`` and JVM configuration files
     - Stores database URIs, blockstore configuration, license keys,
       and TLS certificates. Without it, you must reconfigure the
       primary |onprem| by hand.

   * - Agent configuration
     - ``/etc/mongodb-mms/automation-agent.config`` on each managed
       host
     - Stores the ``mmsGroupId`` and ``mmsApiKey``. These must match
       the restored application database's project records so agents
       re-attach without re-registration.

.. important::

   If the ``gen.key`` file is missing or doesn't match the restored
   application database, the primary |onprem| fails its startup
   preflight check with an error that ``gen.key`` doesn't match the
   key already used for this |onprem| installation. Keep ``gen.key``
   in your disaster recovery backup alongside the application database
   data.
