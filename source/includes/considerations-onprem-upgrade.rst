- **Backup Database**: There are data migrations that touch the various backup
  data stores that make up the :ref:`backup-database`. The data stores must all be online
  when you upgrade. Any data stores that are no longer in use should be
  deleted through the |onprem| UI before upgrading.

- **Backup Daemon**: Beginning with |onprem| 2.0, there is no separate Backup
  Daemon package. The |onprem| package also installs the Backup Daemon. The
  upgrade procedure includes instructions to upgrade your Backup Daemons to 2.0.

- **Backup HTTP Service**: Beginning with |onprem| 2.0, there is no Backup HTTP Service on port 8081.
  Any Backup Agents that are managed by Automation will be automatically
  updated to use the new port, 8080. For Backup Agents that were installed
  **manually**, you must edit the agent's configuration file, as described in
  the procedure below. You must have access to the servers running any
  manually installed Backup Agents.

  .. warning::

     You must configure the new port for any **manually installed** Backup Agents,
     or the agents will have no access to |onprem|.

- **conf-mms.properties**: Beginning in 2.0, |onprem| stores global configuration settings in the
  |onprem| Application Database and stores only local settings in the |onprem|
  server's ``conf-mms.properties`` file. The upgrade procedure uses the
  existing ``conf-mms.properties`` file to connect to the |application|
  Database before replacing the existing file with the new, smaller 2.0 file.

- **Restore properties**: The following properties no longer apply and are replaced by settings
  specified when initiating a restore:

  - ``mms.backup.restore.linkExpirationHours``

  - ``mms.backup.restore.linkUnlimitedUses``

- **mms.conf**: If you have modified the ``mms.conf`` file in your current
  installation (which is not typical), back up the file. You must use the new
  ``mms.conf`` file installed by the upgrade. You can redo any modifications
  once the upgrade is complete.
