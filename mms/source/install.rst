MMS Installation Guide
======================

This document describes the installation and configuration of the
MongoDB Monitoring Service or MMS. The guide also shows :ref:`how to
troubleshoot <troubleshooting>` common installation problems.

.. _mms-requirements:

Requirements
------------

This section outlines MMS's requirements and provides basic
instructions for fulfilling them.

1. Python 2.4 or greater.

2. Python's `setuptools <http://pypi.python.org/pypi/setuptools>`_.

   In most cases, setuptools is packaged by your operating system. For
   Debian and Ubuntu users, use the following command to install the package: ::

        sudo apt-get install python-setuptools

3. If your system is running Python 2.4, you will need to install the
   following Python modules:

   - simplejson
   - hmac
   - hashlib

   If you do not have a preferred method for installing Python
   modules, issue the following command: ::

        easy_install simplejson hmac hashlib

4. All users must install `Pymongo <http://pypi.python.org/pypi/pymongo/>`_,
   the Python driver for MongoDB.  If you do not have a preferred
   method for installing Python modules, issue the following command: ::

        easy_install pymongo

You can now proceed with the installation.

Installation
------------

Registering for MMS
~~~~~~~~~~~~~~~~~~~

If you already have `jira account <http://jira.10gen.com/>`_ you may
sign in with these credentials. Otherwise, register for an MMS account
using the `MMS registration page <https://mms.10gen.com/user/register>`_.
After completing the registration process, you will arrive at the "MMS
Hosts," page.

Because there are no MMS agents attached to your account, you will see
an informational box. Click the "download agent" link to get the
agent. This MMS agent download is specifically configured for your
account.

Installing the MMS Agent
~~~~~~~~~~~~~~~~~~~~~~~~

The agent can run on any system that can connect to the MongoDB
instances you want to monitor. The agent must be able to connect to
the MMS servers by way of port 443. A single agent can monitor
multiple MongoDB instances.

Unzip the archive and run the agent with the following command: ::

     python agent.py

This starts two processes: a parent to monitor the agent daemon and
perform automatic upgrades and a child process to collect data.

Running the MMS Agent
~~~~~~~~~~~~~~~~~~~~~

The above command is sufficient for testing the MMS agent. For production
deployments, you will want to daemonize the process and ensure
that it restarts following a system restart. Your operating system
likely has a preferred method for managing daemon processes.

As a temporary alternative, the following command will start the agent
process detached from the current terminal session: ::

     nohup python agent.py > /[LOG-DIRECTORY]/agent.log 2>&1 &

Replace "``[LOG-DIRECTORY]`` with the path to your MongoDB logs.
This command allows the agent survive the current terminal
session and writes all messages to the ``agent.log`` file. You may
include this command in your MongoDB control script or use your
system's ``/etc/rc.local`` equivalent.

See the :doc:`deployment <deployment>` documentation for more
information on strategies for deploying the agent and your monitoring
architecture.

You can now return to the web interface to begin configuring MMS for
your deployment.

Working with MMS
----------------

Monitoring Hosts with MMS
~~~~~~~~~~~~~~~~~~~~~~~~~

The MMS agent automatically discovers objects for monitoring running
on the same host as the agent. Otherwise, manually add at least one
MongoDB instance from the MMS console.

To add a host to MMS, click the "plus" (``+``) button next to the word
"Hosts," at the top-center of the Hosts page. This raises a query
element for the hostname, port, and optionally the DB username and
password. Provide the necessary information and select "Add."

The agent can discover MongoDB instances and inform MMS of:

- Master databases, after adding slave databases.

- Shard clusters, after adding ``mongos`` instances.

- Replica sets, after adding any member of the set.

All information about MongoDB infrastructure fetched *from* MMS by the
agent. When configuring the monitoring environment, you may need to
wait for several update cycles (e.g. 5-10 minutes) to complete the
auto-discovery process and host identification. The agent reports to
MMS every minute. You may have to wait several minutes for data and
all host information to propagate to the MMS console.

You will find evidence of a working installation in the agent output
or logs. For more information, check the MMS console's "Hosts,"
section in the "Agent Log" and "Pings" tabs. Once MMS has data, you
can view and begin using the statistics.

.. _troubleshooting:

Basic Troubleshooting
~~~~~~~~~~~~~~~~~~~~~

Consider the following issues if you encounter difficulty installing
the MMS agent.

- Make sure that the system running the agent has ``pymongo``
  installed. If your system runs a 2.4.x series Python, verify the
  installation of other :ref:`requirements <mms-requirements>`.

- Ensure the system running the agent can resolve and connect to the
  MongoDB instances.

- Verify that the agent can connect on TCP port 443 (outbound) to the MMS
  server (i.e. "``mms.10gen.com``".)

- Allow the agent to run for a 5-10 minutes to allow host discovery
  and initial data collection.

- If your MongoDB instances run with authentication enabled, ensure
  that MMS has these credentials.

- If you continue to encounter challenges, check the agent's output or
  logs for errors.

Next Steps with MMS
~~~~~~~~~~~~~~~~~~~

Take this opportunity to explore the MMS interface. Click on a host's
name to view the data collected by MMS. Continue to the :doc:`usage
guide </usage>` for an overview of the MMS console. If you have more
questions about deployment and architectures, consider the
:doc:`deployment guide </deployment>`.
