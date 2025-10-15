.. procedure::
   :style: normal

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
      
      Under :guilabel:`Select a Target`, click :guilabel:`Service Account`, :guilabel:`Billing`, 
      or :guilabel:`User`.
      
   .. step:: Choose the :guilabel:`Condition`.
      
      Under :guilabel:`Select a Condition`:
      
      - If you chose :guilabel:`Service Account`:

        a. Select from the following options:

           - :alert:`Service Account Secrets have expired`
           - :alert:`Service Account Secrets are about to expire`
        
        b. If :guilabel:`in  DAY(S)` appears next to the option you selected,
           specify the number of days before your service account secret expires 
           that you want to be notified. 

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

   .. step:: Click :guilabel:`Next`.

   .. step:: Select the :guilabel:`Notification Method`.
      
      Under the :guilabel:`Add Notification Method` heading, click the
      button for the particular notification method you want to use.
      
      .. include:: /includes/list-table-alert-notification-methods-org.rst
      
   .. step:: Click :guilabel:`Save`.
