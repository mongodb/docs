.. procedure::
   :style: normal
      
   .. step:: Create the Microsoft Teams incoming webhook.
      
      a. In Microsoft Teams, open :guilabel:`Workflows`.
      
      #. Search for the :guilabel:`Send webhook alerts to a channel`
         template. Microsoft also offers :guilabel:`Send webhook alerts
         to a channel from specific people` and
         :guilabel:`Send webhook alerts to a channel from people in an
         org` templates. Each template uses a different authentication
         type.
      
      #. Select the :guilabel:`Team` and :guilabel:`Channel` where you
         want to receive alerts.
      
      #. Click :guilabel:`Save` to create the workflow.
      
      #. On the workflow's details page, copy the webhook URL.
         
         .. important::
      
            |service| requires this URL to configure the integration.
      
   .. include:: /includes/nav/steps-project-integrations.rst
      
   .. step:: Configure the Microsoft Teams integration.
      
      a. Search for :guilabel:`Microsoft Teams` and click :guilabel:`Configure`. A configuration modal displays.
      
      #. Enter the incoming webhook URL in the provided text box.
      
      #. To test the integration, click :guilabel:`Test Integration`.
      
      #. Click :guilabel:`Activate`.

   .. include:: /includes/nav/steps-project-alerts.rst
      
   .. step:: Choose whether to create a new alert setting, clone an existing alert setting, or update an existing alert setting.

      To create a new alert without cloning an existing setting:
      
      a. Click :guilabel:`Add`.
      #. Select :guilabel:`New Alert`.
      
      To clone an existing alert setting:
      
      a. Click the :guilabel:`Alert Settings` tab.
      #. Locate the alert setting you want to clone.
      #. Click :icon:`ellipsis-h` then :guilabel:`Clone` in that alert
         setting's row.
      
      To update an existing alert setting:
      
      a. Click the :guilabel:`Alert Settings` tab.
      #. Locate the alert setting you want to update.
      #. Click :icon:`ellipsis-h` then :guilabel:`Edit` in that alert
         setting's row.
      
   .. step:: Select the condition that triggers the alert.

      In the :guilabel:`Alert if` section, select the target component and
      the condition. To learn more about alert conditions, see
      :ref:`alert-conditions`.
      
   .. step:: Apply the alert only to specific targets. (Optional)

      If the options in the :guilabel:`For` section are available, you can
      optionally filter the alert to apply only to a subset of the targets.
      
      The :guilabel:`matches` field can use regular expressions.
      
   .. step:: Select the alert recipients and delivery methods.

      In the :guilabel:`Send to` section:
      
      a. (Optional) To help reduce the false positives that |service| 
         sends, in the :guilabel:`send if condition lasts 
         at least` field, specify the minutes to elapse before the 
         condition sends the alert. The next alert check that runs after
         the specified time elapses sends the alert.
         
      #. (Optional) In the :guilabel:`resend after` field, specify the 
         minutes to elapse before the condition resends the alert. The
         resend interval must be at least 5 minutes.
      
      #. Click :guilabel:`Add` and select :guilabel:`Microsoft Teams`
      
         The incoming webhook URL is automatically populated in the text 
         box.
      
   .. step:: Click :guilabel:`Save`.
