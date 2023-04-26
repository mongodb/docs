.. list-table::
   :widths: 15 10 10 65
   :header-rows: 1

   * - Notification Option
     - User Alerts
     - Billing Alerts
     - Description

   * - |service| Organization

     - :icon:`check`

     - :icon:`check`

     - Sends the alert by email or text message to users with
       specific roles in the Organization.

       1. Select the Organization roles that should receive the
          alerts from the :guilabel:`Select Role(s)` check boxes or
          select :guilabel:`All Roles` for all users in the
          Organization to receive the alert.

       2. Select :guilabel:`SMS` to send these alerts to the mobile
          number configured for each |service| Organization user in
          their Account page.

       3. Select :guilabel:`Email` to send these alerts to the email
          address configured for each |service| Organization user in
          their Account page.
          :guilabel:`Email` is checked by default.

   * - |service| User

     - :icon:`check`

     - :icon:`check`

     - Sends the alert by email or text message to a specified
       |service| user.

       1. Select :guilabel:`SMS` to send these alerts to the mobile
          number configured for the |service| user in their
          Account page.

       2. Select :guilabel:`Email` to send these alerts to the email
          address configured for the |service| user in their
          Account page.
          :guilabel:`Email` is checked by default.

   * - Email

     - :icon:`check`

     - :icon:`check`

     - Sends the alert to any email address you provide.

   * - Mobile Number

     - :icon:`check`

     - :icon:`check`

     - Sends the alert to a mobile number. |service| removes all
       punctuation and letters and uses only the digits. If you are
       outside of the United States or Canada, include ``011`` and the
       `country code <https://countrycode.org/>`__  because |service|
       uses the U.S.-based `Twilio <https://www.twilio.com>`_ to send
       text messages. As an alternative to your non-U.S. telephone
       number, use a `Google Voice <https://voice.google.com>`__
       telephone number.

       .. example::

          For New Zealand enter ``01164`` before the phone number. 

   * - Slack

     - :icon:`check`

     - :icon:`check`

     - Sends the alert to a Slack channel in the authorized Slack
       workplace for the Organization. To learn more about Slack
       authorization, see
       :ref:`Authorize Slack to Receive Organization Alerts <add-slack-to-organization>`.
       Enter the channel name.

       .. include:: /includes/fact-api-key-redacted.rst

   * - PagerDuty

     - 

     - :icon:`check`

     - Sends the alert to a 
       `PagerDuty <http://www.pagerduty.com/?utm_source=mongodb&utm_medium=docs&utm_campaign=partner>`_
       account. Enter only the PagerDuty service key. Define
       escalation rules and alert assignments directly in PagerDuty.

       Acknowledge PagerDuty alerts from the PagerDuty dashboard.

       .. include:: /includes/fact-pagerduty-api-key-decommission.rst

       .. include:: /includes/fact-api-key-redacted.rst

   * - Datadog

     - :icon:`check`

     - :icon:`check`

     - Sends the alert to a `Datadog <https://www.datadoghq.com/alerts/>`_
       account as a Datadog
       `event <https://docs.datadoghq.com/graphing/event_stream/>`_. 

       When the alert is first opened, |service| sends the alert as an
       "error" event. Subsequent updates are sent as "info" events.
       When the alert is closed, |service| sends a "success" event.

       1. Enter your DataDog |api| key under :guilabel:`API Key` and
          click :guilabel:`Validate Datadog API Key`.
       #. Enter your |api| region. 
  
          .. include:: /includes/fact-datadog-supported-regions.rst

       .. include:: /includes/fact-api-key-redacted.rst

   * - VictorOps

     - 

     - :icon:`check`

     - Sends the alert to a `VictorOps <https://victorops.com/>`_ 
       account. 
       
       Enter the alphanumeric
       `API key <https://help.victorops.com/knowledge-base/rest-endpoint-integration-guide/>`_ 
       from VictorOps to integrate the VictorOps endpoint for alerts. Add dashes 
       to the API key so it matches the format ``xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx``. 
       For example, ``489f7he7-790b-9896-a8cf-j4757def1161``. Enter an optional 
       `routing key <https://help.victorops.com/knowledge-base/routing-keys/>`_
       to route alerts to a specific VictorOps group. Click 
       :guilabel:`Post Test Alert` to test the VictorOps configuration. 
       Define escalation and routing rules directly in VictorOps.

       This option is available only for alerts that you must
       acknowledge. Informational alerts like |a-service| user has 
       joined the organization can't use this notification method.

       Acknowledge VictorOps alerts from the VictorOps dashboard.

       .. include:: /includes/fact-api-key-redacted.rst

   * - Opsgenie

     - 

     - :icon:`check`

     - Sends the alert to an `Opsgenie <https://www.opsgenie.com/>`_
       account. Enter only the Opsgenie API key from an Opsgenie |rest| 
       |api| integration. Define escalation rules and alert assignments 
       in Opsgenie.

       This option is available only for alerts that you must
       acknowledge. Informational alerts like |a-service| user has 
       joined the organization can't use this notification method.

       `Acknowledge Opsgenie 
       alerts <https://docs.opsgenie.com/docs/acknowledge-and-unacknowledge>`_ 
       from the Opsgenie dashboard.

       .. include:: /includes/fact-api-key-redacted.rst

   * - Microsoft Teams

     - :icon:`check`

     - :icon:`check`

     - Sends the alert to a `Microsoft Teams <https://www.microsoft.com/en-us/microsoft-teams/group-chat-software/>`_  
       channel. You can view these alerts in the 
       `Adaptive Card <https://docs.microsoft.com/en-us/microsoftteams/platform/task-modules-and-cards/cards/cards-reference#adaptive-card/>`_ 
       displayed in your channel.

       To send alert notifications to a Microsoft Teams channel,
       you must create a Microsoft Teams incoming webhook. 
       After creating the webhook, you can use the automatically
       generated URL to configure your Microsoft Teams integration
       in |service|.

       To setup the integration, see 
       :ref:`Integrate with Microsoft Teams <integrate-with-microsoft-teams>`.

       .. include:: /includes/fact-ms-teams-redacted.rst