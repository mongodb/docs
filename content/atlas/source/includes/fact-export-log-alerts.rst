To ensure you are notified if {+service+} stops exporting logs to your external sink, 
configure a project-level alert:

.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-project-alerts.rst

   .. step:: Click :guilabel:`Add New Alert`.
  
   .. step:: Select the condition that triggers the alert.
      
      In the :guilabel:`Condition/Metric` dropdown menu, select 
      :guilabel:`Log export is unable to export logs on this host`.
         
   .. step:: Select the recipient, notification method, and frequency of the alert.
   
      a. In the :guilabel:`Add Notification Method` section, select from the list of roles.
      
      b. In the :guilabel:`Add Notifier` dropdown menu, select from the options
         described in the following table.
         
         .. include:: /includes/list-table-alert-notification-methods.rst
      
      c. In the :guilabel:`Recurrence` section, set the alert to trigger when the 
         log export failure condition lasts longer than ``60`` minutes and to resend every 
         ``10080`` minutes (7 days) until the issue is resolved. 
      
         This way, you will be notified if log export failures persist for an extended period, 
         while avoiding excessive notifications for transient issues.

   .. step:: Click :guilabel:`Save`.

      For more details on configuring alerts, see :ref:`configure-alert-settings`.