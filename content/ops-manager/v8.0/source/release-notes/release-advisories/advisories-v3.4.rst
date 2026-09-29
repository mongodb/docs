Before upgrading |onprem| from 2.0.x to 3.4, complete the following 
actions:

- Upgrade backing databases to at least MongoDB 3.0.8.
  MongoDB 2.6 is no longer allowed as a backing store.

- Ensure the data partitions for the |application| Database have at 
  least 50% free disk space.

  Once the |onprem| upgrade to 3.4 completes, |onprem| begins 
  migrating of all monitoring data to a new schema in the background. 
  This migration requires significant free disk space.

- Add necessary IP addresses or |cidr| blocks for to the access lists
  for any API clients connecting to the Automation configuration 
  endpoints.

- Back up the ``mms.conf`` file in your current installation if you 
  have modified it.

  This is not a regular practice as ``mms.conf`` contains platform and
  network administration settings for Java VM and |mms| network port
  settings. You must use the new ``mms.conf`` file the upgrade 
  installs. Reapply any modifications from your backed up copy to the 
  new ``mms.conf`` after completing  the upgrade.
