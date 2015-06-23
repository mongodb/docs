Installing to a Server that Already Runs MongoDB
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you install the Automation Agent to a server that is already running a
MongoDB process, the agent must have permission to stop the process. The
agent will restart the process using the agent's own set of MongoDB
binaries. The agent must also have ``Read/Write`` permission on the
MongoDB data and log directories.

If you installed MongoDB with a package manager, use the same package
manager to install the Automation Agent. This gives the agent the same
owner as MongoDB.

In addition, the Automation Agent must have permission to stop, start, and
update any existing Monitoring and Backup Agents.
