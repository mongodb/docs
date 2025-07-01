.. This is the Overview content for all the Monitoring Agent install tutorials.

The |mms| Monitoring Agent is a lightweight component that runs within your
infrastructure, connects to your MongoDB processes, collects data about the
state of your deployment, and then sends the data to |mms|,
which processes and renders this data. The agent initiates all connections
between the agent and |mms|, and communications between the agent and
|mms| are encrypted.

A single agent can collect data for your entire deployment. You can run
multiple agents to distribute assignments and to provide agent failover.

.. include:: /includes/extracts/monitoring-agent-install-note.rst

This tutorial guides you through the steps necessary
to install or update the Monitoring Agent on your system. You must install
the |onprem| itself before installing the
Monitoring Agent.

See :ref:`faq-monitoring` for additional information.
