.. list-table::
   :widths: 15 85
   :header-rows: 1

   * - Notification Option

     - Description

   * - |service| Project

     - Sends the alert by email or text message to users with
       specific roles in the Project.

       .. include:: /includes/service-project-recipient-alerts.rst

       1. Select the Project roles that should receive the alerts
          from the :guilabel:`Select Role(s)` check boxes or select
          :guilabel:`All Roles` for all users in the Project to
          receive the alert.

       2. Select :guilabel:`SMS` to send these alerts to the mobile
          number configured for each |service| Project user in their
          Account page.

       3. Select :guilabel:`Email` to send these alerts to the email
          address configured for each |service| Project user in their
          Account page.
          :guilabel:`Email` is checked by default.

   * - |service| Organization

     - Sends the alert by email or text message to users with
       specific roles in the Organization.

       1. Select the Organization roles that should receive the
          alerts from the :guilabel:`Select Role(s)` check boxes or
          select :guilabel:`All Roles` for all users in the
          Organization to receive the alert.

       2. Select :guilabel:`SMS` to send these alerts to the mobile
          number configured for each |service| Organization user in
          Account page.

       3. Select :guilabel:`Email` to send these alerts to the email
          address configured for each |service| Organization user in
          Account page.
          :guilabel:`Email` is checked by default.

   * - |service| User

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

     - Sends the alert to an email address.

   * - SMS

     - Sends the alert to a mobile number. |service| removes all
       punctuation and letters and uses only the digits. If you are
       outside of the United States or Canada, include ``011`` and the
       `country code <https://countrycode.org/>`__  because |service|
       uses the U.S.-based `Twilio <https://www.twilio.com>`_ to send
       text messages. As an alternative to your non-U.S. telephone
       number, use a `Google Voice <https://voice.google.com>`__
       telephone number.

       For example, enter ``01164`` before the phone number to send the alert
       to a New Zealand mobile number. 

   * - Slack

     - Sends the alert to a Slack channel. Enter the channel name and
       either an |api| token or a Bot token. To create an |api| token,
       see the `<https://api.slack.com/web>`__ page in your Slack
       account. To learn more about Bot users in Slack, see
       `<https://api.slack.com/bot-users>`__.

       .. include:: /includes/fact-api-key-redacted.rst

   * - PagerDuty

     - Sends the alert to a `PagerDuty
       <http://www.pagerduty.com/?utm_source=mongodb&utm_medium=docs&utm_campaign=partner>`__
       account. Enter only the PagerDuty service key. Define
       escalation rules and alert assignments directly in PagerDuty.

       Users can acknowledge PagerDuty alerts only from the PagerDuty
       dashboard.

       .. include:: /includes/fact-pagerduty-api-key-decommission.rst

       .. include:: /includes/fact-api-key-redacted.rst

   * - Datadog

     - Sends the alert to a `Datadog <https://www.datadoghq.com/alerts/>`_
       account as a Datadog event.

       When the alert is first opened, |service| sends the alert as an
       "error" event. Subsequent updates are sent as "info" events.
       When the alert is closed, |service| sends a "success" event.

       1. Enter your DataDog |api| key under :guilabel:`API Key` and
          click :guilabel:`Validate Datadog API Key`.
       #. Enter your |api| region. 
  
          .. include:: /includes/fact-datadog-supported-regions.rst

          .. include:: /includes/fact-api-key-redacted.rst

       #. (Optional) To enable database metrics tracking, toggle
          :guilabel:`Send Database Metrics` to :guilabel:`On`.
         
       #. (Optional) To enable collection latency metrics tracking, 
          toggle :guilabel:`Send Collection Latency Metrics` to 
          :guilabel:`On`.

       #. (Optional) To enable query shape metrics tracking, 
          toggle :guilabel:`Send Query Shape Metrics` to 
          :guilabel:`On`.

       #. Click :guilabel:`Save`.

   * - VictorOps

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

       This option is available only for alerts that require 
       acknowledgement. You can receive informational alerts from this 
       :ref:`third-party monitoring service <third-party-integrations>` 
       in |service|. However, you must resolve these alerts within the 
       external service. Acknowledge VictorOps alerts from the 
       VictorOps dashboard.

       .. include:: /includes/fact-api-key-redacted.rst

   * - Opsgenie

     - Sends the alert to an `Opsgenie <https://www.opsgenie.com/>`_
       account. Enter only the Opsgenie |api| key. Define escalation
       rules and alert assignments directly in Opsgenie.

       This option is available only for alerts that require 
       acknowledgement. You can receive informational alerts from this 
       :ref:`third-party monitoring service <third-party-integrations>` 
       in |service|. However, you must resolve these alerts within the 
       external service. Acknowledge Opsgenie alerts from the Opsgenie
       dashboard.

       .. include:: /includes/fact-api-key-redacted.rst

   * - Microsoft Teams

     - Sends the alert to a 
       `Microsoft Teams <https://www.microsoft.com/en-us/microsoft-teams/group-chat-software/>`_  
       channel as an
       `Adaptive Card <https://docs.microsoft.com/en-us/microsoftteams/platform/task-modules-and-cards/cards/cards-reference#adaptive-card/>`_.


       To send alert notifications to a Microsoft Teams channel,
       you must create a Microsoft Teams incoming webhook. 
       After creating the webhook, you can use the automatically
       generated URL to configure your Microsoft Teams integration
       in |service|.

       To setup the integration, see 
       :ref:`Integrate with Microsoft Teams <integrate-with-microsoft-teams>`.

       .. include:: /includes/fact-ms-teams-redacted.rst

   * - Webhook
        
     - Sends an |http| POST
       request to an endpoint for programmatic processing. The 
       request body contains a |json| document that uses the same
       format as the {+atlas-admin-api+}
       :oas-bump-atlas-op:`Alerts resource <listgroupalerts>`.
        
       This option is available only if you have configured Webhook 
       settings on the :ref:`Integrations 
       <third-party-integrations>` page.

       .. include:: /includes/fact-webhook-redacted.rst

       1. In the :guilabel:`Webhook URL` field, specify the target 
          |url| for webhook-based alerts.

       #. (Optional) If you set up your Webhook integration with a 
          secret, in the :guilabel:`Webhook Secret` field, specify the 
          authentication secret for webhook-based alerts.
  