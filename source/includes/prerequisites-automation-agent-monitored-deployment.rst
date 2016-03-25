Installing to a Server that Already Runs MongoDB
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you install the Automation Agent to a server that is already running
a MongoDB process, the agent must have:

- Permission to stop the MongoDB process. The Automation Agent will
  restart the process using the agent's own set of MongoDB binaries. If
  you had installed MongoDB with a package manager, use the same
  package manager to install the Automation Agent. This gives the agent
  the same owner as MongoDB.

- ``Read`` and ``Write`` permissions on the MongoDB data directory and
  log directory.

- Permission to stop, start, and update any existing Monitoring and
  Backup Agents.
