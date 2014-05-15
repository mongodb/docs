.. This is the Overview content for all the monitoring agent install tutorials.

The MMS monitoring agent is a lightweight component that runs within your
infrastructure, connects to your MongoDB processes, collects data about the
state of your deployment, and then sends the data to the |monitoring| service
which processes and renders this data. The agent initiates all connections to
the |monitoring| service, and communications between the agent and the
|monitoring| service are encrypted. A single agent can collect data from
multiple MongoDB processes. Consider the following diagram of an example
deployment:

.. include:: /images/mms-deployment.rst

.. only:: hosted

   This tutorial will guide you through the steps necessary
   to install or update |monitoring| on your system. You must install
   the On-Prem Monitoring server itself before installing the
   monitoring agent.

.. only:: saas

   This tutorial will guide you through the steps necessary
   to install or update the Monitoring agent on your system.

See the :doc:`/faq/monitoring` page for additional information.
