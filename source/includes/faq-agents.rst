{+magent+}
~~~~~~~~~~~~~~~~

Do I need a {+magent+} for every MongoDB instance?
++++++++++++++++++++++++++++++++++++++++++++++++++++++++

No. In your |mms| project, a single {+magent+} connects to all
MongoDB databases. Configure firewalls to allow the
{+magent+} to connect across data centers and servers.

Beginning with {+magent+} version 5.0.0, you can run multiple
agents to to distribute monitoring assignments and provide failover.
|mms| distributes monitoring assignments among up to 100 running
{+magent+}s. If you run more than 100 {+magent+}s, the
additional agents behave as "standby"agents. For more information, see
:ref:`multiple-monitoring-agents`.

.. only:: cloud

   .. note:: Also beginning with {+magent+} version 5.0.0,
             **Cloud Manager Premium** uses 10-second granularity
             for monitoring metrics.

Where should I run the {+magent+}?
++++++++++++++++++++++++++++++++++++++++

The amount of resources the {+magent+} requires varies depending
on infrastructure size, the number of servers and the databases it is
monitoring. Run the agent on an existing machine with additional
capacity that *does not* run a :binary:`~bin.mongod` instance. You may
also run the {+magent+} on a smaller dedicated instance.

The {+magent+} load scales with the number of monitored
:binary:`~bin.mongod` plus :binary:`~bin.mongos` processes and the
number of databases in your MongoDB environment.

For production environments, it is recommended to install the
{+magent+} on a dedicated server, and not on the
the same host as a data bearing :binary:`~bin.mongod` instance. This
allows you to perform maintenance on the :binary:`~bin.mongod` and its
host without affecting the monitoring for your deployment.
Additionally, a {+magent+} may contend for resources with the
:binary:`~bin.mongod`.

You can install the {+magent+} on the same system as an
:term:`arbiter`, a :program:`mongos`, or an application server
depending on the requirements of these services and available
resources.

Can I run the {+magent+} on an AWS micro server?
++++++++++++++++++++++++++++++++++++++++++++++++++++++

If you monitor five or fewer ``mongod`` instances, you can use
a AWS micro server.

Why can't the {+magent+} connect to my host?
++++++++++++++++++++++++++++++++++++++++++++++++++

The most common problem is that the agent is unable to resolve the
hostname of the host. Check DNS and the ``/etc/hosts`` file.

The second most common problem is that there are firewall rules in
place that prohibit access to the host from the agent.

To test the connection, login to the host running the agent and try
to connect using the ``mongo`` shell:

.. code-block:: sh

   mongo hostname:port/test

.. note::

   .. include:: /includes/fact-port-forwarding-unsupported.rst

Why does the {+magent+} connect with hostnames instead of IP addresses?
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

By default, the {+magent+} resolves hostnames to connect. If
the agent cannot connect by resolving a hostname, you can force the
{+magent+} to prefer an IP address over its corresponding
hostname for a specific IP address. Preferred hostnames also allow you
to specify the hostname to use for servers with multiple aliases. This
prevents servers from appearing multiple times under different names
in the |mms| interface.

To create a preferred hostname, go to :doc:`Project Settings
</tutorial/manage-project-settings>` and add a :guilabel:`Preferred
Hostnames` entry. For details, see
:doc:`/tutorial/manage-project-settings`

How do I setup and configure the agent?
+++++++++++++++++++++++++++++++++++++++

See the ``README`` file included in the agent download.

How do I delete a {+magent+} from |mms|?
++++++++++++++++++++++++++++++++++++++++++++++

See :doc:`/tutorial/delete-monitoring-agent`.
