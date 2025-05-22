MongoDB Enterprise contains the following configuration files to
support SNMP:

- ``MONGOD-MIB.txt``:

  The management information base (MIB) file that defines MongoDB's
  SNMP output.

- ``mongod.conf.subagent``:

  The configuration file to run |mongod-program| as the SNMP
  subagent. This file sets SNMP run-time configuration options,
  including the ``AgentX`` socket to connect to the SNMP master.

- ``mongod.conf.master``:

  The configuration file to run |mongod-program| as the SNMP
  master. This file sets SNMP run-time configuration options.
