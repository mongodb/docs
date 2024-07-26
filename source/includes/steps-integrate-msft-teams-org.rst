.. procedure::
   :style: normal
      
      
   .. step:: Create the Microsoft Teams incoming webhook.
      
      a. Navigate to the Microsoft Teams channel where you want to add the webhook.
      
      #. Select :icon:`ellipsis-h` from the top navigation bar. A dropdown menu of available options displays.
      
      #. Select :guilabel:`Connectors` from the dropdown menu. A modal with available connectors displays.
      
      #. Search for :guilabel:`Incoming Webhook` and select :guilabel:`Add`. A modal with information about the :guilabel:`Incoming Webhook` connector displays.
      
      #. Click :guilabel:`Add`. The modal closes.
      
      #. Select :icon:`ellipsis-h` from the top navigation bar. A dropdown menu of available options displays.
      
      #. Select :guilabel:`Connectors` from the dropdown menu. The modal with available connectors displays.
      
      #. Search for :guilabel:`Incoming Webhook` and select :guilabel:`Configure`. A configuration modal displays.
      
      #. In the modal, enter a name for your webhook. Optionally, you can upload a unique image to help you identify your webhook.
      
      #. Click :guilabel:`Create`. 
      
      #. Copy the incoming webhook URL. 
         
         .. important::
      
            |mms| requires this URL to configure the integration.
      
      #. Click :guilabel:`Done`.

   .. include:: /includes/nav/steps-org-settings.rst
      
   .. include:: /includes/nav/steps-org-alerts.rst
      
   .. step:: Choose whether to create a new alert setting or clone an existing one.

      To create a new alert:
      
      a. Click :guilabel:`Add Alert`.
      
      To clone an existing alert setting:
      
      a. Click the :guilabel:`Alert Settings` tab.
      #. Locate the alert setting you want to clone.
      #. Click :icon:`ellipsis-h` then :guilabel:`Clone` in that alert
         setting's row.
      
   .. step:: Choose the :guilabel:`Target`.
      
      Click one of the options under :guilabel:`Select a Target`.
      
   .. step:: Choose the :guilabel:`Condition`.
      
   .. step:: Configure the Microsoft Teams integration.
      
      a. Under the :guilabel:`Add Notification Method` heading, click the
         button for :guilabel:`Microsoft Teams`.
      
      #. Enter the incoming webhook URL in the provided text box.
      
      #. To test the integration, click :guilabel:`Post Test Alert`.
      
      #. Under :guilabel:`Recurrence`, set the recurrence conditions
         in the provided text boxes.
      
      #. Click :guilabel:`Add`. 
