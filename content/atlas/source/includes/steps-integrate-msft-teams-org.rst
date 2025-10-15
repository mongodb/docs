.. procedure::
   :style: normal
      
   .. step:: Create the Microsoft Teams incoming webhook.
      
      a. Navigate to the Microsoft Teams channel where you want to add the webhook.
      
      #. Select :icon:`ellipsis-h` from the top navigation bar. A dropdown menu of available options displays.
      
      #. Select :guilabel:`Connectors` from the dropdown menu. A modal with available connectors displays.
      
      #. Search for :guilabel:`Incoming Webhook` and select :guilabel:`Add`. A modal with information about the :guilabel:`Incoming Webhook` connector displays.
      
      #. Click :guilabel:`Add`.
      
      #. Click :guilabel:`Configure`. A modal displays.
      
      #. In the modal, enter a name for your webhook. Optionally, you can upload a unique image to help you identify your webhook.
      
      #. Click :guilabel:`Create`. 
      
      #. Copy the incoming webhook URL. 
         
         .. important::
      
            |service| requires this URL to configure the integration.
      
      #. Click :guilabel:`Done`

   .. include:: /includes/nav/steps-org-alerts.rst
      
   .. step:: Choose whether to create a new alert setting, clone an existing alert setting, or update an existing alert setting.

      To create a new alert:
      
      a. Click :guilabel:`Add Alert`.
      
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
      
   .. step:: Choose the :guilabel:`Target`.
      
      Click :guilabel:`User` or :guilabel:`Billing` under
      :guilabel:`Select a Target`.
      
   .. step:: Choose the :guilabel:`Condition`.
      
      Under :guilabel:`Select a Condition`:
      
      - If you chose :guilabel:`User`, select:
      
        - :alert:`Organization users do not have MFA enabled <Users do not have multi-factor authentication enabled>`
        - :alert:`User has joined the organization <User joined the organization>`
        - :alert:`User has left the organization <User left the organization>`
        - :alert:`User's role has been changed <User had their role changed>`
      
      - If you chose :guilabel:`Billing`:
      
        a. Select from the following options:
      
           - :alert:`Credit card is about to expire`
           - :alert:`Amount billed yesterday is above <Amount billed ($) yesterday is above the threshold>`
           - :alert:`Current bill for any single project is above <Current bill ($) for any single project is above the threshold>`
           - :alert:`Current bill for the organization is above <Current bill ($) for the organization is above the threshold>`
      
        b. If :guilabel:`above $` appears next to the option you selected,
           specify the amount in :abbr:`USD (United States Dollars)`
           where |service| should trigger the alert if the selected
           condition exceeds that value.
      
   .. step:: Configure the Microsoft Teams integration.
      
      a. Under the :guilabel:`Add Notification Method` heading, click the
         button for :guilabel:`Microsoft Teams`.
      
      #. Enter the incoming webhook URL in the provided text box.
      
      #. To test the integration, click :guilabel:`Post Test Alert`.
      
      #. Under :guilabel:`Recurrence`, set the recurrence conditions
         in the provided text boxes.
      
      #. Click :guilabel:`Add`.
      