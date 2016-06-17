Collection Interval
+++++++++++++++++++

If a Monitoring Agent is abruptly stopped, without using the |mms| interface
or an :doc:`appropriate stop command </tutorial/start-or-stop-monitoring-agent>`,
|mms| will wait 5 minutes before redistributing that agent's monitoring
assignments, which means there can be up to a five-minute delay before another
Monitoring Agent begins collecting data and sending pings to |mms|. During
this interval, the restarted Monitoring Agent will not collect data.
