.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-project-alerts.rst
      
   .. step:: Click :guilabel:`Alert Settings`.
      
   .. step:: Select the maintenance window alerts you want to configure.
      
      You can configure the following maintenance window alerts:
      
      - :alert:`Maintenance Is Scheduled`
      - :alert:`Maintenance Started`
      - :alert:`Maintenance No Longer Needed`
      
      For the alert you want to configure, click :icon:`ellipsis-h` then :guilabel:`Edit` in that alert setting's row.
      
   .. step:: Select the alert recipients and delivery methods.
      
      In the :guilabel:`Send to` section:
      
      a. (Optional) To help reduce the false positives that |service| 
         sends, in the :guilabel:`send if condition lasts 
         at least` field, specify the minutes to elapse before the 
         condition sends the alert. The next alert check that runs after
         the specified time elapses sends the alert.
         
      #. (Optional) In the :guilabel:`resend after` field, specify the 
         minutes to elapse before the condition resends the alert.
      
      #. Click :guilabel:`Add` and select from the options described in the 
         following table.
         
         .. include:: /includes/list-table-alert-notification-methods.rst
      
   .. step:: Click :guilabel:`Save`.
