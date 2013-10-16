=================================
Activity -- MMS Alerts and Events
=================================

Page
----

As of {time} all new groups created in MMS have a new
alerting and events interface. The new *Activity* tab includes
information and elements previously available in the *Events* and
*Alerts* pages in the MMS interface. 

The *Activiy* page has three sections: 

#. *All Activity*, which shows a feed of all MMS events as well as all
   open alerts.

#. *Closed Alerts*, which shows a list of alerts that users have
   closed explicitly or where the metric has dropped below the
   threshold of the alert.
   
#. *Settings*, which provides an interface to create new alerts and
   manage existing alerts.   

Create an Alert
---------------

To create an alert: 

#. In the *Settings* tab, there's an *Add Alert* button in the top
   right of the page. Select that Button. This will open an interface
   where you can configure the alert.

#. In the first section, chose the target category to monitor. Target
   categories refer to the monitored target and include: hosts, agents
   and backups.
   
   - If you select a host, choose the host type and then the condition
     or metric.
     
   - If you select an agent, choose the agent to monitor.
     
   - If you select backup, choose which condition to use for the alert.
     
#. In the second section, choose either to create an alert for
   *either* any monitored target (i.e. host, agent, or backup) *or* a
   subset of the monitored targets.
   
   If you want to specify a subset of monitored targets, you can
   specify the criteria used to select targets here.

#. In the third section, you may add recipients (i.e. users, groups,
   email addresses, and SMS,) to the distribution list for the alert.

Configure Existing Alerts
-------------------------

To modify an existing alert, select the *Settings* tab to view all of
the available alerts. In the settings drop down on the right side of
each alert, you can edit, clone, disable, or delete the alert.

Each alert has a distribution list that you can edit *and* a frequency
setting that controls how often MMS will distribute the alert.

View Open Alerts
----------------
    
To view open alerts visit the *All Activity* tab. Open alerts appear
above the "Feed" section in an "Open Alerts" section that only appears
if there are open alerts. From this interface you can acknowledge an
alert and select the duration of the acknowledgment.
