MMS Console Overview
====================

The MMS web console provides an extensive set of features for
analyzing the statistics collected by the MMS agent. For a basic
overview of the console, see the :doc:`usage </usage>`
documentation. This document provides a more in-depth guide of the MMS
console.

Host Statistics
---------------

In the "Hosts" section, click any hostname link to view the data
collected from that process. The charts on this "Host Statistics" page
are interactive, and provide tools for navigating and working with the
MMS data. Click on the "info" buttons with an ``i`` in a circle to
raise informational boxes, to explore the functionality of the MMS
console and charts.

.. _chart-controls:

Global Page Controls
~~~~~~~~~~~~~~~~~~~~

There are three to five items in the line below the MMS Console's menu
bar. From left to right, these are:

- The hostname and port of the process. This is a link to the raw JSON
  content of the latest information gathered from this host.

- The :ref:`host type <host-types>`. Possible types include:
  "primary," "secondary," "master," "slave," "standalone,"
  "recovering," and "unknown."

- Optionally, the name of the replica set to which this process
  belongs. Only replica set members have this value. The name of the
  set links to a page with all of the charts from all members of a
  set.

- Optionally, the name of the shard cluster to which this process
  belongs. Only shard cluster members have this value.

- The version of MongoDB running on this process.

The second line contains nine links that control the host statistics
page. The current selection is displayed in a larger font. These
options are:

- "by minute," which is the default setting. All charts plot one data point
  per minute.

- "by 5min," which re-plots all charts with five-minute averages.

- "by hour," which re-plots all charts with hourly averages.

- "by day," which re-plots the chart to display a period of time greater
  than 24 hours, Possible scopes are: "week," "two week," "month,"
  "six month" and "year."

- "range," which allows you to specify a time rage for the charts to
  display.

- "avg/sec," which is the default setting. When selected, charts
  display the average number of events per second.

- "total," which allows you to re-plot the charts to display the total
  number of events.

- "gmt," which allows you to re-plot the charts to the GMT zone. Use
  this option when correlating MMS data with server logs in GMT rather
  than your local timezone.

- "refresh," which triggers a refresh of all charts.

On the next line, a slider allows you to change the scope of all
charts at once. Move the sliders on either end of this bar to narrow
all of the charts on this page at once.

Specific Chart Controls
~~~~~~~~~~~~~~~~~~~~~~~

You may also interact with the charts individually. Using the mouse you
can:

- Click-and-drag to select a portion of the chart to zoom into.

- Double-click to revert to the default zoom setting.

- Shift-click-and-drag (i.e. hold the shift key while clicking and
  dragging) to scroll left and right.

Each MMS chart has several controls at the top right of the chart
container in the "chart toolbar." From left to right, these controls
are:

- "Zoom Out," a magnifying glass with a minus sign, reverts the chart
  to the default zoom setting. This item only appears when you have
  zoomed into the chart.

- "Add To Dashboard," a plus sign, takes you to a dashboard creation
  page where you can create a new dashboard and add a collection of
  charts to the new dashboard.

- "Zoom In," a magnifying glass with a plus sign, raises a box with a
  larger version of the chart.

- "Link," a chain, links to a page that only displays this chart.

- "Email Chart," an envelope, raises a dialogue box where you can
  input an email address and short message to send the chart to an
  arbitrary email address.

- "Info," the character ``i`` in a circle, raises a box with a key to
  the chart.


Host Aliases
------------

The Edit button (e.g. "pencil") in every row of the left column in the
Hosts page opens an interface so that you can create a host aliases
for the hosts you monitor with MMS. These aliases is arbitrary, and
are useful if your machines have existing hostnames that do not
sufficiently describe the system in the context of MMS. Port numbers
are not appended to host aliases.

Dashboards
----------

With MMS dashboards, you can create customized collections of charts
for easier data analysis. You can access the "Dashboard" section of
the MMS console from the first button in the menu bar at the top of
the console interface. You can configure MMS to automatically load a
dashboard rather than the Hosts page from the MMS settings interface.

You can create multiple dashboards as your needs dictate. Use the plus
icon at the top of the page to specify a name and create a new
dashboard, or select "New Dashboard..." when adding a chart to a
dashboard . You can rename or remove a dashboard from links on the
bottom of a dashboard page. Dashboards have the same :ref:`chart
controls <chart-controls>` as the host statistics pages.

Adding and Removing Charts from Dashboards
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can add any MMS chart to any dashboard with the plus sign
(e.g. "``+``") in the chart toolbars.

To remove a chart from a dashboard, navigate to the dashboard and
select the minus sign (e.g. "``-``") icon in the chart toolbar.

Advanced Dashboard Creation
~~~~~~~~~~~~~~~~~~~~~~~~~~~

When adding a new dashboard, you can select the "advanced create or
append to dashboard" link to create a dashboard that includes a custom
selection of charts, or a collection of charts from a dynamically
assembled list of hosts. From this page, you may create new dashboards
or append new charts to existing dashboards. You can filter the
included processes by :ref:`host type <host-types>`.

Specify the list of hosts to include in this dashboard by selecting a
replica set or shard cluster or writing a regular expression to match
monitored processes' hostnames. The "Host Alias In Regexp" check box
allows you to, if checked, use the regular expression to select the
*aliased* hostname you configured, rather than the actual
hostname. Below the host configuration options you may toggle an
option to "group hosts in chart," which creates a single composite
chart for all matching charts.

Below this, there are 17 :ref:`chart types <mms-chart-types>` that
you can use to select charts for this dashboard. Below the chart
selection, the final row of buttons allows you to: (optionally) test
the "host regexp" to make sure that the intended hosts are included in
the dashboard; preview the charts to be added to the dashboard; and
submit these changes to the dashboards.

You can add and remove charts to these dashbaords manually. You may
also add additional charts using the "advanced create dashboard"
functionality in the future by specifying an existing dashboard in the
first field.

User Management
---------------

You can grant additional users access to your MMS account in the
"Admins" section of the MMS console. To add users to MMS click on the
plus (e.g. "``+``") icon next to your account name at the top of this
page. Then, in the "username" field, enter the email address of their
account. Use (or have your users) create a corresponding account on the
"`account registration page <https://mms.10gen.com/user/register/user>`_"
to create the create MMS credentials.

Remember that all users attached to your account will have full global
access to your account. Grant others access with great care.
