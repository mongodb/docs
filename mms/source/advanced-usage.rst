Advanced MMS Console Useage
===========================

The MMS web console provides an extensive set of features for
exploring and analyzing all of the statistics that it collects from
the agent. This document provides a more in depth analysis of the MMS
console.

.. contents::

Using the Host Statistics Page
------------------------------

The Host Statistics page conveys an overview of the latest data
gathered from monitored processes. These charts are interactive and
there are a number of tools to make it easier to navigate and work
with the MMS data. Click on the informational buttons that have an
``i`` in a circle to raise informational windows when possible to
explore the functionality of the MMS console and charts.

.. _chart-controls:

Global Page Controls
~~~~~~~~~~~~~~~~~~~~

The first line below the MMS Console's menu bar on the Host Statistics
page has three to five pieces of information about the current
host. From left to right, these are:

- The hostname and port of this process. This links to the raw content
  from the last ping with information about this host.

- The `host type </reference#host-types>`_. Possible types
  include: "primary," "secondary," "standalone," and "conf."

- Optionally, the name of the set cluster to which this process
  belongs. "Conf" and "Standalone" processes lack this point. The
  name of the set is linked to a page that presents all of the data
  from all members of a set for comparison.

- Optionally, the name of the shard cluster to which this process
  belongs. Only shard cluster members have this value.

- The version of MongoDB this process is running.

The second line contains 9 links that control the host statistics
page. The current selection is displayed in They are:

- "minute" is the default setting. All charts plot one data point
  per minute.

- "five minute," re-plots all charts with five-minute averages.

- "hour," re-plots  all charts with hourly averages.

TODO check use of averages above.

- "day," re-plots the chart to display a period of time greater than
  24 hours, Possible scopes are: "week," "two week," "month," "six
  month" and "year."

- "range," allows you to control the specific time rage for each chart
  to display.

- "avg/sec," is the default settings. Charts plot the average
  number of events per second.

- "total," allows you to re-plot the charts using the total number of
  events.

- "gmt," allows you to re-plot the charts to the  GMT zone. This is
  useful if you're correlating MMS data with server logs in GMT,
  rather than your local timezone.

- "refresh" triggers a refresh of all charts.

On the next line, a slider allows you to change the scope of all
charts at once. Move the sliders on either end of this bar to zoom
all of the charts on this page at once.

Specific Chart Controls
~~~~~~~~~~~~~~~~~~~~~~~

You can also interact with the charts on an individual basis. Using
the mouse you can:

- Click and hold to select a portion of the chart to zoom into.

- Double click to revert to the default zoom setting.

- Hold the shift key while clicking and dragging to scroll left and
  right.

Each chart within MMS has several controls at the top right of the
chart container in the chart toolbar. From left to right, these
controls are:

- "Zoom Out," a magnifying glass with a minus sign, reverts the chart
  to the default zoom setting. This item only appears when you have
  zoomed into the chart.

- "Add To Dashboard," a plus sign, raises dialogue box where you
  can add this chart to a custom dashboard of your choice.

- "Zoom In," a magnifying glass with a plus sign, raises a box with a
  larger version of the chart.

- "Link," a chain, links to a page that only displays this chart.

- "Email Chart," an envelope, raises a dialogue box where you can input an
  email address and short message to send the chart to an email
  address of your choice.

- "Info," the character ``i`` in a circle, raises an informational box
  with a key to the chart.

Dashboards
----------

The dashboard functionality of the MMS console, allows users to create
customized overviews and unique collections of charts for easier and
more effective analysis. Dashboards have the same :ref:`chart
controls <chart-controls>` as the host statistics pages.

MMS provides for multiple dashboards. Use the plus sign at the top of
the page to specify a name and create the new dashboard. You can
rename or remove a dashboard by clicking one of the links on the
bottom of a dashboard page.

TODO-RYAN why is the create dashboard button "submit," and not "create?" 

Adding and Removing Charts From the Dashboards
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Using the plus sign (e.g. "``+``") in the chart toolbar you can add
any MMS chart to any dashboard.

To remove a chart from a dashboard, navigate to the dashboard and
select the minus sign (e.g. "``-``") icon in the chart toolbar. 

Advanced Dashboard Creation
~~~~~~~~~~~~~~~~~~~~~~~~~~~

When adding a new dashboard, you can select the "advanced create" to
create a dashboard that includes a custom selection of charts a
dynamically assembled list of hosts. From this page, you can create
new dashboards or edit existing dashboards. You can filter the
included processes by `host type </reference#host-types>`_. 

You can specify the list of hosts included in the dynamic dashboard by
selecting a replica set or shard cluster, or writing a regular
expression to match monitored processes' hostnames. Below the host
configuration options you can toggle an option to group hosts in
chart.

When you have specified the hosts there are 17 `chart types </reference#mms-chart-types>`_
from which you can select charts for this dashboard. In the final row
of buttons you can: test the regexp entered above to make sure that
the intended hosts are included in the dashbaord; preview the charts
to be added to the dashboard, and submit these changes to the.

You can add and remove charts to these dashbaords manually. You, may
also add additional charts using the "advanced create dashboard,"
functionality in the future by specifying the dashboard name in the
first field.

TODO-RYAN is "group hosts in chart" really "group charts by host?"
TODO-RYAN it seems like the advanced create page is really an "'advanced' add charts to dashboard,"
TODO-RYAN the chart selectors and the "test regexp," "preview," and "submit" are not particularly distinct (to me.)

User Management
---------------

You can grant additional users access to your MMS account in the
"Admins" section of the MMS console. To add users to MMS click on the
pencil icon next to your account name at the top of this page. Then,
in the username field, enter the email address of their account. Use
`account registration page <https://mms.10gen.com/user/register/user>`_
to allow your users to create MMS credentials.

Remember that all users will have full global access to your account,
and grant others access to your account with care.

TODO confirm the amount of access user have.
