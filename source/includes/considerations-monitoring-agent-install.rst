.. This is the Considerations content for all the monitoring agent install tutorials.

Connectivity
++++++++++++

You must configure the networking rules of your deployment so that:

- the Monitoring Agent can connect to all :program:`mongod` and
  :program:`mongos` instances that you want to monitor.

.. only:: saas

   - the Monitoring agent can connect to ``mms.mongodb.com`` on port 443
     (i.e. ``https``.)

.. only:: hosted

   - the Monitoring agent can connect to |monitoring| server on port 443
     (i.e. ``https``.)

The |monitoring| server does not make *any* outbound connections to the agents
or to MongoDB instances. If :ref:`Exposed DB Host Check is enabled,
<exposed-hosts-alert>` the |monitoring| server will attempt to connect to
your servers occasionally as part of a vulnerability check.

Ensure all :program:`mongod` and :program:`mongos` instances are not
accessible to hosts outside your deployment.



.. !!

.. todo: We need a solution for this target below, now that this is 
   shared content. Unfortunately, the docs that link to this target
   can't really link to something less granular.

.. _monitoring-agent-redundancy:

Monitoring Agent Redundancy
+++++++++++++++++++++++++++

Only one Monitoring agent per group or environment will report to |monitoring|
at a time. If your monitoring agent can connect to all hosts in your
deployment, a single monitoring agent is sufficient and strongly recommended.
Multiple agents can cause unexpected problems.

However, you can run a second instance of the
agent to provide redundancy as a hot standby. To install secondary
agents, simply repeat the installation process.

Access Control
++++++++++++++

If you are using MongoDB authentication, see the :doc:`Authentication
Requirements documentation </reference/authentication>`.

Collection Interval
+++++++++++++++++++

If you are updating the agent, keep in mind that when the Monitoring agent
restarts, there is a five-minute delay before that agent begins collecting
data and sending pings to |monitoring|. If you have multiple agents, this
delay permits other agents in your infrastructure to become the primary
agent and permits |monitoring| to determine which agent will be primary.

During this interval, the restarted Monitoring agent will not
collect data.
