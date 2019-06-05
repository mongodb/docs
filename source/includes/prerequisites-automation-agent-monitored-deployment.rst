Installing to a Host that Already Runs MongoDB
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you install the {+mdbagent+} to a host on which Automation is
managing a MongoDB process, the {+mdbagent+} system user must have the following permissions:

- To stop the MongoDB process. The {+mdbagent+} restarts the process
  using its own set of MongoDB binaries. If you had installed MongoDB
  with a package manager, use the same package manager to install the
  {+mdbagent+}. This gives the {+mdbagent+} the same owner as MongoDB.

- To ``Read`` and ``Write`` to the MongoDB data and log directories.

