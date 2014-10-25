Hosts
~~~~~

.. This "Hosts" section is referring to what are now called "deployments." This section
   also needs updating per the new UI.

Hosts are not Visible
+++++++++++++++++++++

Problems with the Monitoring Agent detecting hosts can be caused by a few
factors.

**Host not added to MMS**: In MMS, select the :guilabel:`Deployment` tab, then
the :guilabel:`Deployment` page, and then click
the :guilabel:`Add Host` button. In the :guilabel:`New Host` window, specify
the host type, internal hostname, and port. If appropriate, add the database
username and password and whether or not MMS should use SSL to connect with
your Monitoring Agent. Note it is not necessary to restart your Monitoring
Agent when adding (or removing) a host.

**Accidental duplicate mongods** If you add the host after a crash and restart
the Monitoring Agent, you might not see the hostname on the MMS
:guilabel:`Deployment` page. MMS detects the host as a duplicate and suppresses its
data. To reset, select the :guilabel:`Administration` tab, then :guilabel:`Group Settings`,
and then the :guilabel:`Reset Duplicates` button.

**Too many Monitoring Agents installed**: Only one Monitoring Agent is needed
to monitor all hosts within a single network. You can use a single Monitoring
Agent if your hosts exist across multiple data centers and can be discovered by
a single agent. Check you have only one Monitoring Agent and remove old agents
after upgrading the Monitoring Agent.

A second Monitoring Agent can be set up for redundancy. However, the MMS
Monitoring Agent is robust. MMS sends an *Agent Down* alert only when there are
no available Monitoring Agents available. See :ref:`Monitoring FAQ
<faq-monitoring>` and :doc:`Monitoring Architecture
</tutorial/add-hosts-to-monitoring>` for more information.

Cannot Delete a Host
++++++++++++++++++++

In rare cases, the :program:`mongod` is brought down and the replica set is
reconfigured. The down host cannot be deleted and returns an error message,
"This host cannot be deleted because it is enabled for backup." `Contact MMS
Support <https://mms.mongodb.com/links/support>`_ for help in deleting these
hosts.

For more information on deleted hosts, see :ref:`removing-hosts`.
