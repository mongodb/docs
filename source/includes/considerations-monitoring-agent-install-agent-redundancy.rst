Monitoring Agent Redundancy
+++++++++++++++++++++++++++

A single Monitoring Agent is sufficient and strongly recommended. However,
you can run additional instances of the agent as hot standbys to provide
redundancy. If the primary agent fails, a standby agent starts monitoring.

When you run multiple agents, only one Monitoring Agent per group or
environment is the **primary agent**. The primary agent reports the
cluster's status to MMS. The remaining agents are completely idle, except
to log their status as standby agents and to periodically ask |mms| whether
they should become the primary.

To install additional agents, simply repeat the installation process.
