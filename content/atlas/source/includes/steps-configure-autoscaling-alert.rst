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
      
      a. In the :guilabel:`Category` section, select :guilabel:`Atlas Auto Scaling` as the target component.
      #. In the :guilabel:`Condition/Metric`, select one of the following conditions.

         You can configure the following auto-scaling alerts:

         - :alert:`Auto-scaling: Compute auto-scaling initiated for base tier <Auto-scaling: Compute auto-scaling initiated for base tier>`
         - :alert:`Auto-scaling: Compute auto-scaling initiated for analytics tier <Auto-scaling: Compute auto-scaling initiated for analytics tier>`
         - :alert:`Auto-scaling: Compute auto-scaling down didn't initiate for base tier due to storage requirements <Auto-scaling: Compute auto-scaling down didn't initiate for base tier due to storage requirements>`
         - :alert:`Auto-scaling: Compute auto-scaling down didn't initiate for analytics tier due to storage requirements <Auto-scaling: Compute auto-scaling down didn't initiate for analytics tier due to storage requirements>`
         - :alert:`Auto-scaling: Compute auto-scaling didn't initiate for base tier due to maximum configured cluster tier <Auto-scaling: Compute auto-scaling didn't initiate for base tier due to maximum configured cluster tier>`
         - :alert:`Auto-scaling: Compute auto-scaling didn't initiate for analytics tier due to maximum configured cluster tier <Auto-scaling: Compute auto-scaling didn't initiate for analytics tier due to maximum configured cluster tier>`
         - :alert:`Auto-scaling: Compute auto-scaling didn't initiate for base tier due to insufficient oplog size <Auto-scaling: Compute auto-scaling didn't initiate for base tier due to insufficient oplog size>`
         - :alert:`Auto-scaling: Compute auto-scaling didn't initiate for analytics tier due to insufficient oplog size <Auto-scaling: Compute auto-scaling didn't initiate for analytics tier due to insufficient oplog size>`
         - :alert:`Auto-scaling: Disk auto-scaling initiated <Auto-scaling: Disk auto-scaling initiated>`
         - :alert:`Auto-scaling: Disk auto-scaling didn't initiate due to the cluster reaching maximum available disk size <Auto-scaling: Disk auto-scaling didn't initiate due to the cluster reaching maximum available disk size>`
         - :alert:`Auto-scaling: Disk auto-scaling didn't initiate due to insufficient oplog size <Auto-scaling: Disk auto-scaling didn't initiate due to insufficient oplog size>`

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
