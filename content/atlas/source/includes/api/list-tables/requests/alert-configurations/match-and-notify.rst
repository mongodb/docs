.. list-table::
   :widths: 20 14 11 55
   :stub-columns: 1

   * - matchers
     - array of objects
     - Required
     - Rules to apply when matching an object against this alert
       configuration. Only entities that match *all* these rules are
       checked for an alert condition.

       |service| limits filtering alerts using **matchers** when the
       **eventTypeName** specifies an event for the following:

       - a host,
       - a replica set, or
       - a sharded cluster.

       To add one or more **matchers**, see `Filter Results
       <#filter-results>`_.

   * - notifications
     - array of objects
     - Required
     - One or more targets for |service| to send notifications when an
       alert condition is detected. You can configure any number of
       notifications for each alert condition.

       To add one or more **notifications**, see `Set Notifications
       <#set-notifications>`_.

.. tabs::
   :hidden:

   .. tab:: Condition
      :tabid: condition

      .. list-table::
         :widths: 20 14 11 55
         :stub-columns: 1

         * - threshold
           - object
           - Conditional
           - Threshold that triggers an alert. Don't include if
             **"eventTypeName" : "OUTSIDE_METRIC_THRESHOLD"**.

             To add one **threshold**, see `Trigger Alerts
             <#trigger-alerts>`_.

   .. tab:: Metrics
      :tabid: metrics

      .. list-table::
         :widths: 20 14 11 55
         :stub-columns: 1

         * - metricThreshold
           - object
           - Conditional
           - Threshold for the metric that, when exceeded, triggers an
             alert.

             To add one **metricThreshold**, see `Trigger Alerts
             <#trigger-alerts>`_.
