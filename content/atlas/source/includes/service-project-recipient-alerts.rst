|service| Project is the default alert recipient. You can
configure the roles the alert is sent to and how it's
delivered. You can't add a second |service| Project as the
recipient.

.. note::

   If the :authrole:`Project Owner` role is assigned to a human project
   member, |service| delivers alerts to that member's configured email address
   or SMS target.

   If the :authrole:`Project Owner` role is assigned programmatically,
   ensure you configure an explicit notification target (such as an
   email address, PagerDuty, Slack, or Webhook) to receive alerts.
   Programmatic API keys and service accounts do not receive alert
   notifications by default.

|service| Project is available as an option in the 
:guilabel:`Add` list only if it is not currently in the 
recipients list.
