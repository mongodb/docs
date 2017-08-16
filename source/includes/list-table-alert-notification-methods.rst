.. only:: onprem

   .. list-table::
      :widths: 35 65
      :header-rows: 1
 
      * - Notification Option
 
        - Description
 
      * - Project *(project or global alerts only)*
 
        - Sends the alert by email or SMS to the project. If you select
          :guilabel:`SMS`, |mms| sends the text message to the number
          configured on each user's :ref:`Account page <profile-page>`. To
          send only to specific roles, deselect :guilabel:`All Roles` and
          select the desired roles.
 
      * - |mms| User
 
        - Sends the alert by email or SMS to a specified |mms| user. If you
          select :guilabel:`SMS`, |mms| sends the text message to the number
          configured on the user's :ref:`Account page <profile-page>`.
 
      * - SNMP Host
 
        - Specify the hostname that will receive the v2c trap on standard port
          ``162``. The MIB file for SNMP is `available for download here
          <http://downloads.mongodb.com/on-prem-monitoring/MMS-10GEN-MIB.txt>`_.
 
      * - Email
 
        - Sends the alert to a specified email address.
 
      * - SMS
 
        - Sends the alert to a specified mobile number.
 
          Available only if |onprem| is configured for Twilio integration.
 
      * - HipChat
 
        - Sends the alert to a HipChat room message stream. Enter the HipChat
          room name and API token.
 
      * - Slack
 
        - Sends the alert to a Slack channel. Enter the channel name and either an API
          token or a Bot token. To create an API token, see the `<https://api.slack.com/web>`_
          page in your Slack account. For information on Bot users in Slack,
          see `<https://api.slack.com/bot-users>`_.
 
      * - Flowdock
 
        - Sends the alert to a Flowdock account. Enter the following:
 
          - :guilabel:`Org Name`: The Flowdock organization name in
            lower-case letters. This is the name that appears after
            ``www.flowdock.com/app/`` in the URL string.
 
          - :guilabel:`Flow Name`: The flow name in lower-case letters. The
            flow name appears after the org name in the URL string:
            ``www.flowdock.com/app/orgname/flowname``.
 
          - :guilabel:`User API Token`: Your Flowdock "personal API token"
            found on the `<https://www.flowdock.com/account/tokens>`_ page of
            your Flowdock account.
 
      * - PagerDuty
 
        - Sends the alert to a `PagerDuty
          <http://www.pagerduty.com/?utm_source=mongodb&utm_medium=docs&utm_campaign=partner>`_
          account. Enter only the PagerDuty service key. Define escalation rules
          and alert assignments directly in PagerDuty.
 
          This option is available only for alerts that require acknowledgement.
          Informational alerts, such as the alert that a replica set has elected
          a new primary, cannot use this notification method.
 
          Users can acknowledge PagerDuty alerts only from the PagerDuty
          dashboard.
 
      * - Webhook *(project alerts only)*
 
        - Sends an HTTP POST request to an endpoint for programmatic
          processing. The request body contains a JSON document that uses
          the same format as the Public API's :doc:`Alerts resource
          </reference/api/alerts>`. This option is available only if you
          have configured Webhook settings on the :ref:`Project Settings
          <group-settings-page>` page.
 
      * - Administrators *(global or system alerts only)*
 
        - Sends the alert to the email address specified in the :guilabel:`Admin
          Email Address` field in the |onprem| configuration options.
 
      * - Global Alerts Summary Email *(global alerts only)*
 
        - Sends a summary email of all global alerts to the specified email address.
 
.. only:: cloud

   .. list-table::
      :widths: 35 65
      :header-rows: 1
   
      * - Notification Option
   
        - Description
   
      * - Project
   
        - Sends the alert by email or SMS to the project. If you select
          :guilabel:`SMS`, |mms| sends the text message to the number
          configured on each user's :ref:`Account page <profile-page>`. To
          send only to specific roles, deselect :guilabel:`All Roles` and
          select the desired roles.
   
      * - |mms| User
   
        - Sends the alert by email or SMS to a specified |mms| user. If you
          select :guilabel:`SMS`, |mms| sends the text message to the number
          configured on the user's :ref:`Account page <profile-page>`.
   
      * - Email
   
        - Sends the alert to a specified email address.
   
      * - SMS
   
        - Sends the alert to a specified mobile number.
   
          |mms| removes all punctuation and letters and uses only the digits. If
          you are outside of the United States or Canada, include '011' and the
          country code. For example, for New Zealand enter '01164' before the
          phone number. As an alternative, use a Google Voice number. |mms| uses
          the U.S.-based `Twilio <https://www.twilio.com>`_ to send SMS
          messages.
   
      * - HipChat
   
        - Sends the alert to a HipChat room message stream. Enter the HipChat
          room name and API token.
   
      * - Slack
   
        - Sends the alert to a Slack channel. Enter the channel name and either an API
          token or a Bot token. To create an API token, see the `<https://api.slack.com/web>`_
          page in your Slack account. For information on Bot users in Slack,
          see `<https://api.slack.com/bot-users>`_.
   
      * - Flowdock
   
        - Sends the alert to a Flowdock account. Enter the following:
   
          - :guilabel:`Org Name`: The Flowdock organization name in
            lower-case letters. This is the name that appears after
            ``www.flowdock.com/app/`` in the URL string.
   
          - :guilabel:`Flow Name`: The flow name in lower-case letters. The
            flow name appears after the org name in the URL string:
            ``www.flowdock.com/app/orgname/flowname``.
   
          - :guilabel:`User API Token`: Your Flowdock "personal API token"
            found on the `<https://www.flowdock.com/account/tokens>`_ page of
            your Flowdock account.
   
      * - PagerDuty
   
        - Sends the alert to a `PagerDuty
          <http://www.pagerduty.com/?utm_source=mongodb&utm_medium=docs&utm_campaign=partner>`_
          account. Enter only the PagerDuty service key. Define escalation rules
          and alert assignments directly in PagerDuty.
   
          This option is available only for alerts that require acknowledgement.
          Informational alerts, such as the alert that a replica set has elected
          a new primary, cannot use this notification method.
   
          Users can acknowledge PagerDuty alerts only from the PagerDuty
          dashboard.
   
      * - Webhook
   
        - Sends an HTTP POST request to an endpoint for programmatic
          processing. The request body contains a JSON document that uses
          the same format as the Public API's :doc:`Alerts resource
          </reference/api/alerts>`. This option is available only if you
          have configured Webhook settings on the :ref:`Project Settings
          <group-settings-page>` page.

