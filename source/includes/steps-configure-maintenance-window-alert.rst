.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-project-alerts.rst

   .. step:: Choose whether to create a new alert setting, clone an existing alert setting, or update an existing alert setting.
      
      To create a new alert without cloning an existing setting:
      
      a. Click :guilabel:`Add`.
      #. Select :guilabel:`New Alert`.
      
      To clone an existing alert setting:
      
      a. Click the :guilabel:`Alert Settings` tab.
      #. Locate the alert setting you want to clone.
      #. Click :icon:`ellipsis-h` then :guilabel:`Clone` in that alert setting's row.
      
      To update an existing alert setting:
      
      a. Click the :guilabel:`Alert Settings` tab.
      #. Locate the alert setting you want to update.
      #. Click :icon:`ellipsis-h` then :guilabel:`Edit` in that alert setting's row.

   .. step:: Select the category and the condition or metric that triggers the alert.
      
      a. In the :guilabel:`Category` section, select :guilabel:`Atlas` as the target component.
      #. In the :guilabel:`Condition/Metric`, select one of the following conditions:

         - :alert:`Maintenance is scheduled <Maintenance is scheduled>`
         - :alert:`Maintenance started <Maintenance started>`
         - :alert:`Maintenance no longer needed <Maintenance no longer needed>`
         - :alert:`Maintenance has been auto-deferred <Maintenance has been auto-deferred>`

         For the alert you want to configure, click :icon:`ellipsis-h` then
         :guilabel:`Edit` in that alert setting's row.

   .. step:: Select the alert recipients and delivery methods.

      - In the :guilabel:`Add Notification Method` section, select from the
        list of roles, and also select a notification method, such as
        :guilabel:`Email` or :guilabel:`SMS`.
  
      - In the :guilabel:`Add Notifier` drop-down menu, select from the options
        described in the following table.

      .. include:: /includes/list-table-alert-notification-methods.rst

   .. step:: Click :guilabel:`Save`.
