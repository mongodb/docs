=======================
Deploying the MMS Agent
=======================

The :doc:`installation </install>` document outlines a basic setup
process for MMS and the agent. This guide provides a more in depth
review of deployment and MMS agent configuration.

Resource Requirements
---------------------

The agent does have some resource requirements and should run on
separate systems to avoid impacting ``mongod`` and ``mongos``
performance. To monitor five or fewer nodes, you can safely deploy on
an AWS "micro instance." Similarly, if you are only monitoring a small
number of databases, you may be able to deploy the agent on the system
running the ``mongos`` process. Running PyMongo with the native
extensions, which requires GCC, provides signifigant performance
improvements. See :doc:`install` for more information.

Monitoring Architecture
-----------------------

Only one agent per-group or environment will report to MMS at a time,
but you can run multiple instances of the agent to provide
redundancy. Secondary agents act as host standbys If you stop the
agent process, MMS removes the agent from the "Agents" tab within a
day. If an agent is offline the last ping times for that agent do not
update. To install a second or third agent, Simply repeat the
installation process in the :doc:`installation guide </install>` for
each new agent. See instructions for automating the agent installation
in the next section.

.. _db-stats-warning:

Database and Collection Statistics
----------------------------------

In most cases MMS can intelligently scale it's request cycle for more
expensive statistics gathering, to limit it's impact. However, in
cases where MongoDB instances have thousands of databases and/or
collections, getting collection level statistics will hinder your
database's performance and could potentially incapacitate the agent.

In these situations you must disable database stats collection. See
the "DB Stats" section on the "Settings" page in the MMS Console
before starting your agent.

.. _mms-groups:

Multiple Environments
---------------------

If you have multiple MongoDB systems in distinct environments and
cannot monitor both system with a single agent, you will need to add a
new group. Having a second group makes it possible to run two agents,
because the AjikkrPI and secret keys are unique to the group.

To add a new group click on the "Admins" page, and click on the "Add
New Group" link on the upper right hand side of the page. Then,
specify the new group name and select the "Add New Group" button on
the following next page to create the new group. After creating a
group, only the current user account is a member that group.To add
more people, click on the "Admins" page in your new group.

You may also use a second group and agent to monitor a different set
of MongoDB instances in the same environment if you want to segregate
the hosts within the MMS console. A user can only view data from the
hosts monitored in a single group at once.

After adding a second group, MMS interface will have a drop down list
that will allow you to change groups. Selecting a new group will
refresh the current page with the data available from the servers in
this group.

Although it's not possible to delete a group, you can remove your user
account from a group to suppress that data.

.. _automated-agent-installation:

Automated Agent Installation
----------------------------

The agent you downloaded from the MMS site is automatically configured
with the credentials for your account. If you want to automate MMS
agent deployments from the command line, you will need to manually
configure the agent. Download an unconfigured agent from the following
URL: ::

      https://mms.10gen.com/settings/10gen-mms-agent.zip

Unzip this archive and edit the ``settings.py`` file. Replace the
strings "``@API_KEY@``" and "``@SECRET_KEY@``" with the "API" and
"Secret Keys" defined for your account. You can find these
in the "Settings" page of the MMS console.

You may embed this process in your existing deployment scripts to
automatically install or redeploy new agents.

Automated Agent Updates
-----------------------

The agent perform automatic self-updates when 10gen releases new
versions of the agent daemon.

Auto-updating requires that agent run as a user that is capable of
writing files to the directory that contains the agent.

Control Scripts
---------------

If you need to create an initialization script to control the
demonized process, consider the following resources:

- `Ubuntu Boot Up How To <https://help.ubuntu.com/community/UbuntuBootupHowto>`_
- `Debian Linux Control/Init Scripts <http://wiki.debian.org/LSBInitScripts>`_
- `Arch Linux rc.d Scripts <https://wiki.archlinux.org/index.php/Writing_rc.d_scripts>`_
- Debian and Ubuntu Systems have an example control script located at
  ``/etc/init.d/skeleton`` that you can use as a template.
- RedHat Enterprise Linux and related distributions (e.g. Fedora,
  CentOS, etc.) provide example control scripts in the
  ``/usr/share/doc/initscripts-*/sysvinitfiles/`` directory.

You may also examine the scripts in your system's ``/etc/init.d/`` or
``/etc/rc.d/`` directory. Ensure that the agent does not run with root
privileges.

Use the ``update-rc.d`` utility on Debian and Ubuntu and the
``chkconfig`` tool on RedHat related systems to add these scripts to
the initialization process. Be sure to test the control script
configuration. It is essential that you be able to start, stop, and
restart the agent following a system reboot.
