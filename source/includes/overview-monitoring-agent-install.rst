.. This is the Overview content for all the Monitoring Agent install tutorials.

The MMS Monitoring Agent is a lightweight component that runs within your
infrastructure, connects to your MongoDB processes, collects data about the
state of your deployment, and then sends the data to the |monitoring| service
which processes and renders this data. The agent initiates all connections to
the |monitoring| service, and communications between the agent and the
|monitoring| service are encrypted. A single agent can collect data from
multiple MongoDB processes. Consider the following diagram of an example
deployment:

.. include:: /images/mms-deployment.rst

.. only:: onprem

   This tutorial will guide you through the steps necessary
   to install or update |monitoring| on your system. You must install
   the On Prem Monitoring server itself before installing the
   Monitoring Agent.

.. only:: classic or cloud

   This tutorial will guide you through the steps necessary
   to install or update the Monitoring Agent on your system.

See :ref:`faq-monitoring` for additional information.
