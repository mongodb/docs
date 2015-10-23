- Beginning with |onprem| 2.0, there is no Backup Daemon package. The upgrade
  instructions describe how to upgrade Backup Daemons from pre-2.0
  installations.

- Beginning with |onprem| 2.0, there is no Backup HTTP Service on port 8081.
  Any Backup Agents that are managed by Automation will be automatically
  updated to use the new port, 8080. For Backup Agents that were installed
  **manually**, you must edit the agent's configuration file, as described in
  the procedure below. You must have access to the servers running any
  manually installed Backup Agents.

  .. warning::

     You must configure the new port for **manually** installed Backup Agents,
     or the agents will have no access to |onprem|.

- Beginning in 2.0, |onprem| stores global configuration settings in the
  |onprem| Application Database and stores only local settings in the |onprem|
  server's ``conf-mms.properties`` file. The upgrade procedure uses the
  existing ``conf-mms.properties`` file to connect to the |application|
  Database before replacing the existing file with the new, smaller 2.0 file.

- The following properties no longer apply and are replaced by settings
  specified when initiating a restore:

  - ``mms.backup.restore.linkExpirationHours``

  - ``mms.backup.restore.linkUnlimitedUses``
