Before upgrading to |onprem| 2.0, ensure the following are true:

Backup Database
  Databases that store the :ref:`backup-database` must be online.

  There are data migrations that touch the various backup data stores 
  that make up the :ref:`backup-database`. Any data stores that are no 
  longer in use should be deleted through the |onprem| UI before
  upgrading.

Backup Daemon
  The |onprem| package installs the :cloudmgr:`Backup Daemon </reference/glossary/#term-backup-daemon>`.
  When started, the |onprem| package automatically starts two
  services: the |application| and the Backup Daemon. You choose on
  which hosts to "activate" the Backup Daemon. The daemon always
  runs, but performs no operations until activated.

  After upgrading to 2.0, a host that runs **only** the |application| continues also runs a "dormant" Backup Daemon service. The Backup Daemon remains dormant as long as you do not activate it.

  A host that runs **only** a Backup Daemon runs |onprem| with an "activated" Backup Daemon and a "dormant" |application|. The |application| remains dormant as long as you do not direct HTTP traffic to it.

Backup HTTP Service
  Change the :bsetting:`mothership` setting in all Backup Agent
  configuration files for any **manually** installed agents to use port
  ``8080``. Any **manually installed** Backup   Agents that are not set
  to use port ``8080`` cannot connect to |onprem| You must have access
  to the hosts running any manually installed Backup Agents.

  Beginning with |onprem| 2.0, there is no Backup HTTP Service on port 
  ``8081``. Any Backup Agents that Automation manages are updated to 
  use the new port (``8080``) automatically.

Agent Updates
  The agents have not been updated before the |application| has been upgraded. If you use Automation,
  |onprem| prompts you to update the agents after you upgrade.
  Follow the prompts to update the agents through the |application|.
  Do *not* update the agents manually.

conf-mms.properties
  Beginning in 2.0, |onprem| stores global configuration settings
  in the |onprem| Application Database and stores only local
  settings in the |onprem| host's ``conf-mms.properties`` file.
  The upgrade procedure uses the existing ``conf-mms.properties``
  file to connect to the |application| Database before replacing
  the existing file with the new, smaller 2.0 file.

Restore properties
  The following properties no longer apply and are replaced by
  settings specified when initiating a restore:

  - ``mms.backup.restore.linkExpirationHours``

  - ``mms.backup.restore.linkUnlimitedUses``

- If you have modified the ``mms.conf`` file in your current
  installation, you have backed it up. 

  This is not a regular practice as ``mms.conf`` contains platform and
  network administration settings for Java VM and |mms| network port
  settings. You must use the new ``mms.conf`` file the upgrade 
  installs. Reapply any modifications from your backed up copy to the 
  new ``mms.conf`` after completing  the upgrade.
