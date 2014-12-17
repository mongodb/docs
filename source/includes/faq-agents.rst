|monitoring| Agent
~~~~~~~~~~~~~~~~~~

Do I need a Monitoring Agent for every MongoDB Instance?
++++++++++++++++++++++++++++++++++++++++++++++++++++++++

No. A single Monitoring Agent can connect to all MongoDB databases
in your |mms| group. Unless you have multiple groups, complete your
initial Monitoring Agent setup with a single agent.

For redundancy, you may wish to run a second Monitoring Agent. See the
:ref:`monitoring-agent-redundancy` for more information.

Can I use two Monitoring Agents to connect MongoDBs in different data centers?
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

No, not within the same group. The group's Monitoring Agent must connect to
every server in the MongoDB
deployment. Configure firewalls to allow the Monitoring Agent to connect across
data centers and servers.

Use multiple Monitoring Agents within a single |mms| group *only* :ref:`to
provide redundancy <monitoring-agent-redundancy`>. For each |mms| group, the
agent must be able to connect
to every monitored MongoDB. Unless you have multiple groups,
complete your initial Monitoring Agent setup with a single agent.

What happens if a Monitoring Agent becomes unavailable? How can I ensure my MongoDBs are always monitored?
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

You can run multiple Monitoring Agents. If one Monitoring Agent fails,
another starts monitoring. As long as at least one Monitoring Agent is
available, |mms| will not trigger a *Monitoring Agent Down* alert. To run multiple
Monitoring Agents, see :ref:`monitoring-agent-redundancy`.

You also can create an alert to notify you when an agent is down. In MMS,
click the :guilabel:`Activity` tab and then :guilabel:`Alert Settings`. Click the
:guilabel:`Add Alert` button then set the alert through the fields in the
:guilabel:`Create a New Alert` window.

Where should I run the Monitoring Agent?
++++++++++++++++++++++++++++++++++++++++

The amount of resources the Monitoring Agent requires varies depending on
infrastructure size, the number of servers and the databases it's monitoring. Run
the agent on an existing machine with additional capacity that *does not* run a
:program:`mongod` instance. You may also run the Monitoring Agent
on a smaller dedicated instance.

The Monitoring Agent load scales with the number of monitored ``mongod`` plus
``mongos`` processes and the number of databases in your MongoDB environment.

.. include:: /includes/fact-host-for-monitoring-agent.rst

Can I run the Monitoring Agent on an AWS micro server?
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++

If you monitor five or fewer ``mongod`` instances, you can use
a AWS micro server.

Why can't the Monitoring Agent connect to my host?
++++++++++++++++++++++++++++++++++++++++++++++++++

The most common problem is that the agent is unable to resolve the
hostname of the server. Check DNS and the ``/etc/hosts`` file.

The second most common problem is that there are firewall rules in
place that prohibit access to the server from the agent.

To test the connection, login to the server running the agent and run:
``mongo hostname:port/test`` If you are unable to connect, the agent
will not be able to connect.

In addition, |monitoring| supports monitoring for
Kerberos-enabled instances.

Why does the Monitoring Agent connect with hostnames instead of IP addresses?
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

By default, the Monitoring Agent tries to connect by resolving hostnames. If
the agent cannot connect by resolving a hostname, you can force the Monitoring
Agent to prefer an IP address over its corresponding hostname for a specific
IP address.

To create a preferred hostname, select the :guilabel:`Administration` tab, then the
:guilabel:`Group Settings` page, and then click the :guilabel:`Add` button for
the :guilabel:`Preferred Hostnames` setting. If your IP addresses have a common
prefix, create a preferred hostname with the :guilabel:`ends-with` button or
click the :guilabel:`regexp` button to use a regular expression.

Preferred hostnames also allow you to specify the hostname to use for servers
with multiple aliases. This prevents servers from appearing multiple times
under different names in the |mms| interface.

How do I download the Monitoring Agent?
++++++++++++++++++++++++++++++++++++++++++

You can update the Monitoring Agent from the :guilabel:`Agents` page on the MMS
`Administration tab`_.

.. _`Administration tab`: https://mms.mongodb.com/settings

How do I setup and configure the agent?
+++++++++++++++++++++++++++++++++++++++

See the ``README`` file included in the agent download.

.. only:: classic

   Can I run the Backup and Monitoring Agents on a Single System?
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   .. include:: /includes/faq-backup-and-monitoring-agent-on-one-server.rst

How do I delete a Monitoring Agent from MMS?
++++++++++++++++++++++++++++++++++++++++++++

Monitoring Agents report their status to the |mms|. When an agent does not
report for more than 24 hours, the agent no longer appears in MMS.

For more details, see :doc:`/tutorial/delete-monitoring-agent`.

Can I run the |mms| Monitoring Agent with |mms| Backup On Prem?
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Yes. Both the |mms| Monitoring Service and |mms| Backup On Prem can operate in
the same environment. You will need to install and configure two separate
Monitoring Agents: configure one agent for the On Prem environment and
the other for the |mms| Service.
