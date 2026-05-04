Optional override for |parameter| to set the |maximum-or-minimum| number
of outbound connections each TaskExecutor connection pool can open to a
:ref:`configuration server <sharding-config-server>`.

When set to:
       
- ``-1``, |parameter| is used. This is the default.
       
- an integer value greater than ``-1``, overrides the
  |maximum-or-minimum| number of outbound connections each TaskExecutor
  connection pool can open to a configuration server.

Parameter only applies to sharded deployments.
