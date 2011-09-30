MMS Console Usage Overview
==========================

This document provides a high level overview of the MMS web console
and describes the basic functionality. The best way to learn about
MMS's capabilities is to browse the interface with live data. For
additional documentation of the MMS console see the :doc:`advanced
usage document </advanced-usage>`. If you haven't done so already,
please :doc:`install the MMS agent </install>` before proceeding.

.. contents::

Hosts
-----

The "Hosts" section is the primary location for monitoring information
in the MMS console. There are several tabs that contain monitored processes:

- "**Hosts**" displays all non-arbiter ``mongod`` instances.

- "**Mongos**" displays all ``mongos`` instances.

- "**Conf**" displays all ``conf`` database instances.

- "**Abiters**" lists the ``mongod`` processes functioning as arbiters in
  replica sets.

- "**Agents**" lists the MMS agents attached to this MMS account.

The remaining "Host" section tabs contain information about the
monitoring process and environment.

- "**Agent Log**" displays a log of the MMS agent's activity.

- "**Pings**" provides access to the raw JSON document of the last 20
  pings sent to MMS by the agent.

- "**Host Aliases**" shows the mapping between system hostnames and
  the names provided by the monitored process (e.g. ``mongod`` and
  ``mongos``.) In most cases, hosts are automatically aliased during
  auto-discovery. If needed, you may modify and configure the alias
  mapping in the "Settings" section of the console.

All of these interfaces provide a search field in the upper right
corner to filter the lists in real time.

.. _host-views:

Host Views
~~~~~~~~~~

Each non-arbiter processes in the "Hosts" section links to an overview
of the data collected for that process. On each of these pages, MMS
provides the following tabs:

- "**DB Stats**," which displays charts using data provide
  by the MMS agent.

- "**Hardware**," which displays information gathered about underlying
  system. To collect this information, you will need to install and run
  the ``munin-node`` software.

  On Debian and Ubuntu systems, use the "``sudo apt-get install
  munin-node``" command. RedHat, CentOS and Fedora users should issue
  the "``sudo yum install munin-node``" command.

TODO ensure that there are no additional required munin-node configurations.

- "**Last Ping**," which displays the raw JSON document sent by the
  agent to MMS.

- "**Daily Pings**," which displays the raw JSON content of the last
  ping for every day. This page displays pings from the last TK days.

TODO how many daily pings does MMS store?

- "**Profile Data**," which displays information on performance
  gathered by the database profiler. See the section on :ref:`database
  profiling <db-profiling>` for more information.

Host Groups
~~~~~~~~~~~

From the host page, you can display groups of hosts in one view. By
following a link from the "Cluster" or "Repl Set" columns, you can see
a side-by-side comparison of charts from all hosts in a given cluster
or replica set.

.. _db-profiling:

DB Profiling
~~~~~~~~~~~~

MMS can collect data from MongoDB's profiler to provide statistics
about performance and database operations.

This data can include sensitive information, including the content of
database queries. Ensure that exposing this to MMS is consistent with
your information security practices. Additionally, be aware that the
profiler can consume resources which may adversely effect DB
performance. Consider the implications before enabling profiling.

To allow MMS to collect profile data for a specific host, click the
"Enable profile data transmission," button in the far right column of
the host listing. It is the middle of the three icons. This raises a
dialogue box that describes the implications of DB profiling and
allows you to enable the transmission of the profiling data to MMS.

When you select "Enable Profile Info Transmission," the agent will begin
sending profile data to MMS.

However, to begin collecting profile data you need
to modify the value of ``setProfilingLevel`` on the database itself. See
the `database profiler <http://www.mongodb.org/display/DOCS/Database+Profiler>`_
documentation for instructions on how to do this.

Events
------

The "Events" section relays information about the MMS agent's
operations. Possible event types are:

- "**new host**" occurs when the agent identifies a new MongoDB host.

- "**restart**" occurs when a ``mongod`` or other monitored
  instance restarts.

- "**upgrade**" occurs when a ``mongod`` is upgraded to a new
  version.

- "**now secondary**" occurs when a ``mongod`` instance becomes
  secondary in a replica set.

- "**now primary**" occurs when a ``mongod`` instance becomes
  primary in a replica set .

TODO check the events and get list

Alerts
------

The "Alerts" section provides access to MMS's alert system. This
section has three tabs: unresolved alerts, resolved alerts, and alert
settings.

Types
~~~~~

There are three possible alerts:

- "**Old Host Version**" is triggered when the version of ``mongod``
  is out of date.

- "**Host Down**" is triggered when a ``mongod`` or other monitored
  instance restarts or fails to check in to MMS.

- "**Agent Down**" is triggered when the agent fails to report to MMS
  for 2 minutes.

MMS will add additional alert types in the near future.

TODO clarify what constitutes an old version.
TODO confirm host down alert threshold.
TODO confirm agent down alert threshold.

Configuring Notifications
~~~~~~~~~~~~~~~~~~~~~~~~~

You can create notifications for any of the above alert types. Click on
the plus sign (e.g. ``+``) next to the word "Alerts" at the top of
these pages. This will raise a dialogue where you can create email
alerts for any of these event types. You can configure:

- **Address** to specify where alert emails are sent.

- **Type** to select between text and HTML formats.

- **Frequency** to select how often alerts will be sent, in minutes.

- **Minimum Time Before Notification** to determine how long MMS will
  wait before sending a notification. Raising this value will increase
  the amount of time between the identification of an issue and the
  alert, but it may reduce potential false positives.

TODO determine what linear frequency means.

Unresolved Alerts
~~~~~~~~~~~~~~~~~

The "Unresolved" tab displays a list of all monitored instances that
have current unresolved alerts. Check this tab to make sure that there
are no outstanding alerts.

Resolved Alerts
~~~~~~~~~~~~~~~

The "Resolved" tab displays a record of all historical alerts. Use
this tab as a record of past activity.

Alert Settings
~~~~~~~~~~~~~~

The "Settings" tab provides an interface for configuring alerts. Using
the function buttons in the right hand column you can delete and
disable existing alerts.

Next Steps with the MMS Console
-------------------------------

The MMS web console contains a great deal of functionality beyond the
scope of this overview. Continue to explore the functionality
addressed above in your own system, with your own data. The
:doc:`Advanced MMS Console Usage </advanced-usage>` provides a deeper
exploration of key usage patterns for the MMS console.
