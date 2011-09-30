MMS Installation Guide
======================

This document describes the installation and configuration of the
MongoDB Monitoring Service (MMS). The guide also provides
:ref:`troubleshooting <troubleshooting>` advice.

.. contents::

.. _mms-requirements:

Requirements
------------

This section outlines MMS's requirements and provides basic
instructions for fulfilling them.

1. You must have Python 2.4 or greater.

2. You'll need Python's `setuptools <http://pypi.python.org/pypi/setuptools>`_.

   In most cases, setuptools is packaged by your operating system. For example,
   Debian and Ubuntu users can use the following command to install the package: ::

        sudo apt-get install python-setuptools

3. If your system is running Python 2.4, you will need to install the
   following Python modules:

   - simplejson
   - hmac
   - hashlib

   Issue the following command: ::

        easy_install simplejson hmac hashlib

   Do not use ``pip``, as there are some compatibility issues. 

4. If your system is running Python 2.5, you will need to install the
   ``simplejson`` module. Issue the following command: ::

        easy_install simplejson

4. All users must install `PyMongo  <http://pypi.python.org/pypi/pymongo/>`_,
   the Python driver for MongoDB. While the native C extensions are
   not required, they significantly improve performance. To install
   these extensions, make sure you have a C compiler (e.g. ``gcc``)
   and Python header files installed on your system. Debian and Ubuntu
   users should issue the following command: ::

        sudo apt-get install build-essentials python-dev

   RedHat, CentOS, and Fedora Users should issue the following
   command: ::
   
        sudo yum install gcc python-devel

   ``pymongo`` Version 1.9 is required, but the latest version is
   recommended. If you have not installed ``pymongo`` issue the
   following command: ::

        easy_install pymongo

   To upgrade to the latest version of the driver, use the following
   command: ::

        easy_install -U pymongo

   For more information about installing PyMongo instillation, consider
   `the PyMongo documentation <http://api.mongodb.org/python/2.0.1/installation.html>`_.

Consider the ``README`` file distributed with the agent for more
information.

When all dependencies are successfully installed, you may proceed with
the installation.

Installation
------------

Registering for MMS
~~~~~~~~~~~~~~~~~~~

If you already have `jira account <http://jira.mongodb.org/>`_ you may
sign in with your JIRA credentials. Otherwise, register for an MMS account
using the `MMS registration page <https://mms.10gen.com/user/register>`_.
After completing the registration process, you will arrive at the "MMS
Hosts," page.

Because there are no MMS agents attached to your account, you will
at first see instructions for download the MMS agent. Click the "download agent"
link to get an agent specifically configured for your
account.

Installing the MMS Agent
~~~~~~~~~~~~~~~~~~~~~~~~

You can run the agent on any system that can connect to the MongoDB
instances you want to monitor. As long as it can connect to each instance,
you can use a single agent to do all the monitoring.
Do be sure that the agent can make outgoing connections
via HTTPS on port 443.

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

As a temporary measure, the following command will start the agent
process detached from the current terminal session: ::

     nohup python agent.py > /[LOG-DIRECTORY]/agent.log 2>&1 &

Replace "``[LOG-DIRECTORY]`` with the path to your MongoDB logs.

This command allows the agent survive the current terminal session and
writes all messages to the ``agent.log`` file. You may include this
command in your MongoDB control script or use your system's
``/etc/rc.local`` equivalent; however, avoid running the agent as
root.

See the :doc:`deployment <deployment>` documentation for more
information on strategies for deploying the agent and your monitoring
architecture.

Once the agent is running, you can return to the web interface to
begin configuring MMS for your deployment.

Installing MMS on Windows
~~~~~~~~~~~~~~~~~~~~~~~~~

The MMS agent distribution includes a ``WINDOWS.txt`` file with
instructions for using the agent on Windows platforms. Consider the
following special requirements:

- Install the 32-bit build of Python 2.7.

- Use the Windows installer to install `PyMongo from PyPi <http://pypi.python.org/pypi/pymongo/2.0.1>`_.

- ``srvany.exe``, which is included in the agent distribution may
  already...

TODO clarify the above.

- Enable PowerShell Script Execution.

  Right click the PowerShell icon in the Start Menu, and run
  PowerShell as administrator. Issue the following command: ::

       Set-ExecutionPolicy -ExecutionPolicy RemoteSigned

  Agree, when promoted to the policy change.

- Run ``mongommsinstall.bat`` from an administrator command window to
  install and start the Windows service.

Updating the MMS Agent
----------------------

The agent perform automatic self-updates when new versions of the
agent daemon are released.

Auto-updating requires that agent run as a user that is capable of
writing files to the directory that contains the agent. To manually
update the agent, stop both agent processes, download the latest agent
from the "Settings" page of the MMS console, and start the agent
again.

Working with MMS
----------------

Monitoring Hosts with MMS
~~~~~~~~~~~~~~~~~~~~~~~~~

The MMS agent automatically discovers MongoDB processes based on
existing cluster configuration. You'll have to manually "seed" at
least one of these hosts from the MMS console.

To add a host to MMS, click the "plus" (``+``) button next to the word
"Hosts," at the top-center of the Hosts page. This raises a query
element for the hostname, port, and optionally the DB username and
password. Provide the necessary information and select "Add."

Once it has a seed host, the agent will discover any other nodes
from associated clusters. These clusters, and their respective seed
hosts, include:

- Master databases, after adding slave databases.

- Shard clusters, after adding ``mongos`` instances.

- Replica sets, after adding any member of the set.

Once you add these seed node, the MMS agent will fetch this
information *from* the MMS servers. This, when configuring the
monitoring environment, you may need to wait for several update cycles
(e.g. 5-10 minutes) to complete the auto-discovery process and host
identification.

The agent reports to MMS every minute, so, again, there may be a delay
of several minutes before data and host information propagate to the
MMS console.

You can find immediate evidence of a working installation in the agent
output or logs. For more information, check the MMS console's "Hosts,"
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
  MongoDB instances. To confirm, log into the system where the agent
  is running and issue a command in the following form: ::

       mongo [hostname]:[port]

  Replace ``[hostname]`` with the hostname and ``[port]`` with the
  port that the database is listening on.

- Verify that the agent can connect on TCP port 443 (outbound) to the MMS
  server (i.e. "``mms.10gen.com``".)

- Allow the agent to run for 5-10 minutes to allow host discovery
  and initial data collection.

- If your MongoDB instances run with authentication enabled, ensure
  that MMS has these credentials.

- If you continue to encounter problems, check the agent's output or
  logs for errors.

Next Steps with MMS
~~~~~~~~~~~~~~~~~~~

Take this opportunity to explore the MMS interface. Click on a host's
name to view the data collected by MMS. Continue to the :doc:`usage
guide </usage>` for an overview of the MMS console. If you have more
questions about deployment and architectures, consider the
:doc:`deployment guide </deployment>`.
