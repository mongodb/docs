.. _monitoring-agent-redundancy:

Monitoring Agent Redundancy
+++++++++++++++++++++++++++

A single Monitoring Agent is sufficient and strongly recommended. However,
you can run additional instances of the agent as hot standbys to provide
redundancy. If the primary agent fails, a standby agent starts monitoring.

When you run multiple agents, only one Monitoring Agent per group or
environment is the **primary agent**. The primary agent reports the
cluster's status to |mms|. The remaining agents are completely idle, except
to log their status as standby agents and to periodically ask |mms| whether
they should become the primary. :setting:`mms.monitoring.agent.standbyCollectionFactor`
configures the frequency at which the standby agents check to see if
they have become the primary agent. By default, the standby agents
check every 14 seconds. See the :setting:`mms.monitoring.agent.standbyCollectionFactor`
reference for details.

|mms| promotes a standby agent to primary after not hearing from the
current primary for at least the interval specified by
:setting:`mms.monitoring.agent.session.timeoutMillis`. The default delay
is 90 seconds (90000 milliseconds), which is also the minimum. 

You can tune :setting:`mms.monitoring.agent.standbyCollectionFactor` and
:setting:`mms.monitoring.agent.session.timeoutMillis` by editing
:ref:`conf-mms.properties`.

To install additional agents, simply repeat the installation process.
