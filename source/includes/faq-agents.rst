Monitoring Agent
~~~~~~~~~~~~~~~~

Do I need a Monitoring Agent for every MongoDB instance?
++++++++++++++++++++++++++++++++++++++++++++++++++++++++

No. In your |mms| project, a single Monitoring Agent connects to all
MongoDB databases. Configure firewalls to allow the
Monitoring Agent to connect across data centers and servers.

Beginning with Monitoring Agent version 5.0.0, you can run multiple
agents to distribute monitoring assignments and provide failover.
|mms| distributes monitoring assignments among up to 100 running
Monitoring Agents. If you run more than 100 Monitoring Agents, the
additional agents behave as "standby" agents.

.. cond:: cloud

   **Cloud Manager Premium** uses 10-second granularity for monitoring
   metrics.

Where should I run the Monitoring Agent?
++++++++++++++++++++++++++++++++++++++++

The amount of resources the Monitoring Agent requires varies depending
on infrastructure size, the number of servers and the databases it is
monitoring. Run the agent on an existing machine with additional
capacity that *does not* run a |mongod| instance. You may
also run the Monitoring Agent on a smaller dedicated instance.

The Monitoring Agent load scales with the number of monitored |mongod|
plus |mongos| processes and the number of databases in your MongoDB
environment.

For production environments, it is recommended to install the
Monitoring Agent on a dedicated server, and not on the
the same host as a data bearing |mongod| instance. This
allows you to perform maintenance on the |mongod| and its
host without affecting the monitoring for your deployment.
Additionally, a Monitoring Agent may contend for resources with the
|mongod|.

You can install the Monitoring Agent on the same system as an
:term:`arbiter`, a |mongos|, or an application server depending on the
requirements of these services and available resources.

Can I run the Monitoring Agent on an AWS micro server?
++++++++++++++++++++++++++++++++++++++++++++++++++++++

If you monitor five or fewer |mongod| instances, you can use an |aws|
micro server.

Why can't the Monitoring Agent connect to my host?
++++++++++++++++++++++++++++++++++++++++++++++++++

The most common problem is that the agent is unable to resolve the
hostname of the host. Check DNS and the ``/etc/hosts`` file.

The second most common problem is that there are firewall rules in
place that prohibit access to the host from the agent.

To test the connection, login to the host running the agent and try
to connect using {+mongosh+}:

.. code-block:: sh

   mongosh <hostname>:<port>/test

.. note::

   .. include:: /includes/fact-port-forwarding-unsupported.rst

Why does the Monitoring Agent connect with hostnames instead of IP addresses?
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

By default, the Monitoring Agent resolves hostnames to connect. If
the agent cannot connect by resolving a hostname, you can force the
Monitoring Agent to prefer an IP address over its corresponding
hostname for a specific IP address. Preferred hostnames also allow you
to specify the hostname to use for servers with multiple aliases. This
prevents servers from appearing multiple times under different names
in the |mms| interface.

To create a preferred hostname, go to
:doc:`Project Settings </tutorial/manage-project-settings>` and add a
:guilabel:`Preferred Hostnames` entry. For details, see
:doc:`/tutorial/manage-project-settings`

How do I setup and configure the agent?
+++++++++++++++++++++++++++++++++++++++

See the ``README`` file included in the agent download.

How do I delete a Monitoring Agent from |mms|?
++++++++++++++++++++++++++++++++++++++++++++++

See :doc:`/tutorial/delete-monitoring-agent`.
