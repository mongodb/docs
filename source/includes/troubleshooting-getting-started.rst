.. index:: troubleshooting
   single: agent; troubleshooting

.. _getting-started-checklist:

Getting Started Checklist
-------------------------

To begin troubleshooting, complete these tasks to check for common, easily
fixed problems:

#. :ref:`troubleshooting-auth-creds`
#. :ref:`troubleshooting-check-logs`
#. :ref:`troubleshooting-one-agent`
#. :ref:`troubleshooting-host-connectivity`
#. :ref:`troubleshooting-mms-connectivity`
#. :ref:`troubleshooting-discover-hosts`

.. _troubleshooting-auth-creds:

Authentication Errors
~~~~~~~~~~~~~~~~~~~~~

If your MongoDB instances run with authentication enabled, ensure |mms| has these
credentials. For new hosts, click the :guilabel:`Add Host` button on the
:guilabel:`Deployment` page then specify credentials for every host with
authentication enabled. For hosts already listed in MMS, click the
:guilabel:`gear icon` to the right of a host name on the :guilabel:`Deployment` page
then select :guilabel:`Edit Host` to provide credentials.

Please consult the :ref:`Authentication Requirements documentation
<security-access-control-authentication>` for details about
how to use authentication.

.. _troubleshooting-check-logs:

Check Agent Output or Log
~~~~~~~~~~~~~~~~~~~~~~~~~

If you continue to encounter problems, check the agent's output for errors.
See :ref:`view-logs-single-agent`.

.. _troubleshooting-one-agent:

Confirm Only One Agent is Actively Monitoring
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you :ref:`run multiple Monitoring Agents
<monitoring-agent-redundancy>`, make sure they are all the same version
and that only one if actively monitoring. When you upgrade a Monitoring
Agent, do not forget to delete any old standby agents.

When you run multiple agents, one runs as the primary agent and the others
as standby agents. Standby agents poll |mms| periodically to get the
configuration but do not send data.

To determine which agent is the primary agent, look at the :guilabel:`Status`
value on the :guilabel:`Administration` tab's :guilabel:`Agents` page. If there
is no last ping value for a listed agent, the agent is a standby agent.

See :ref:`faq-monitoring` and
:doc:`/tutorial/add-hosts-to-monitoring` for more information.

.. _troubleshooting-host-connectivity:

Ensure Connectivity Between Agent and Monitored Hosts
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Ensure the system running the agent can resolve and connect to the
MongoDB instances. To confirm, log into the system where the agent
is running and issue a command in the following form:

.. code-block:: sh

   mongo [hostname]:[port]

Replace ``[hostname]`` with the hostname and ``[port]`` with the
port that the database is listening on.

.. _troubleshooting-mms-connectivity:

Ensure Connectivity Between Agent and |mms| Server
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Verify that the Monitoring Agent can connect on TCP port 443
(outbound) to the |mms| server (i.e. "``mms.mongodb.com``".)

.. _troubleshooting-discover-hosts:

Allow Agent to Discover Hosts and Collect Initial Data
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Allow the agent to run for 5-10 minutes to allow host discovery and initial
data collection.
