MMS Installation Guide
======================

This document provides an overview of the MMS installation and
configuration process so you can monitor your MongoDB environment with
MMS. This guide also includes basic :ref:`troubleshooting information <troubleshooting>`
for common issues.

.. _mms-requirements:

Requirements
------------

The MMS agent is a Python daemon with very few dependencies. If
your system runs Python 2.4, however, you may need to install a basic
libraries that are a part of later 2.x versions of Python. Check your
Python version with the following command: ::

     python --version

You will need to install Python's `setup tools <http://pypi.python.org/pypi/setuptools>`_
to continue with the installation. Most platforms have a preferred
method (e.g. packages, etc.) for installing this dependency.

Users of Python versions in the 2.4.x series will need to install the
following Python modules:

- simplejson
- hmac
- hashlib

Use your preferred method to install these Python modules, or issue
the following command: ::

     easy_install simplejson hmac hashlib

All users will need to install the ``pymongo`` driver. Use the
following command: ::

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

Because your account has no MMS agents running, you will see an
informational box. Click the "download agent" link to get the
agent. This MMS agent download is specifically configured for your
account. Instructions for manual agent configuration and a link for
the configured agent is on the "Settings," page, under the "agent"
section.

Installing the MMS Agent
~~~~~~~~~~~~~~~~~~~~~~~~

The agent can run on any system that can connect to the MongoDB
instances you want to monitor. The agent must be able to connect to
the MMS servers via 443. A single agent can monitor multiple MongoDB
instances and you can deploy multiple agents to provide greater
resiliency. See the :doc:`deployment <deployment>` documentation for
more information on strategies for deploying the agent.

Unzip the agent's archive and run the agent with the following
command: ::

     python agent.py

This starts two processes: a parent to monitor the agent daemon and
perform automatic upgrades and an agent process to collect data.

Running the MMS Agent
~~~~~~~~~~~~~~~~~~~~~

The above command is sufficient for testing MMS for production
deployments alternate methods are desirable. Your operating system
likely has a preferred method for managing daemon processes that will
be preferable.

As a temporary solution the following command starts the agent process
detached from the current terminal session: ::

     nohup python agent.py > /[LOG-DIRECTORY]/agent.log 2>&1 &

Replace "``[LOG-DIRECTORY]`` with the directory to your MongoDB log
directory. This command allows the agent survive the current terminal
session and writes all messages to the ``agent.log`` file. You may
include this command in your MongoDB control script or use your
systems ``/etc/rc.local`` equivalent.

You can now return to the web interface to begin configuring MMS for
your deployment.

Working with MMS
----------------

Monitoring Hosts with MMS
~~~~~~~~~~~~~~~~~~~~~~~~~

To add hosts to MMS, click the "plus" (``+``) button next to the word
"Hosts," at the top-center of the Hosts page. This raises a query
element for the hostname, port, and optionally the DB username and DB
password. Provide the necessary information and select the "Add" to
complete this process.

The MMS agent automatically discovers hosts in many situations. The
agent informs MMS of database instances when provided with:

- MongoDB instances running on the same host as the agent.

- Master databases, after adding slave databases.

- Shard clusters, after adding ``mongos`` instances.

- Replica sets, after adding any member of the set.

All information about hosts is fetched *from* MMS by the agent. When
configuring hosts, you may need to wait for several update cycles
(e.g. 5-10 minutes) to complete the auto-discovery process and host
identification.

MMS collects data from agents every minute. Wait several minutes for
MMS to begin collecting data. When you return to MMS later you will be
able to view and begin using the statistics.

.. _troubleshooting:

Basic Troubleshooting
~~~~~~~~~~~~~~~~~~~~~

Consider the following issues if you encounter difficulty wile
installing the MMS agent.

- Make sure that the system running the agent has ``pymongo``
  installed. If your system runs a 2.4.x series Python, verify the
  installation of other :ref:`requirements <mms-requirements>`.

- Ensure the system running the agent can resolve and connect to the
  MongoDB instances.

- Verify that the agent can connect on TCP port 443 (outbound) to the MMS
  server (i.e. "``mms.10gen.com``".)

- Allow the agent to run for a 5-10 minutes to allow  host
  discovery and initial data collection.

- If the ``mongo`` shell would require database credentials to connect
  to a monitored database, make sure that MMS has these credentials.

Using MMS
~~~~~~~~~

Take this opportunity to explore the MMS interface. Click on a host's
name to view the data collected by MMS. The title section of the page
conveys the hostname and port of the monitored server, the type of
node, shard or replica information, and the version of MongoDB that
the host runs. In the sub-header area there are a number of controls
to interact with the data display. Use the "``i``" button at the end
of this row for more information regarding the graph display.

Continue to the :doc:`usage guide </usage>` for an overview of MMS
itself.
