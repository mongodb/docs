Multiple Monitoring Agents
++++++++++++++++++++++++++

You can run multiple Monitoring Agents to distribute monitoring assignments
and provide failover. |mms| distributes monitoring assignments among up to 100
running agents. Each agent monitors a different set of MongoDB processes.
|mms| redistributes assignments automatically as agents are added or shut down.

.. important:: To distribute monitoring assignments among multiple Monitoring Agents,
               you must use **Monitoring Agent version 5.0.0 or higher**.

If you run more than 100 Monitoring Agents, the additional agents run as
standby agents. A standby agent is completely idle, except to log its status
as a standby and periodically ask |mms| if it should begin monitoring.

For versions of the Monitoring Agent earlier than version 5.0.0, only one
agent handles monitoring assignments. All other running agents are standby agents.

To install multiple agents, simply repeat the installation process.
