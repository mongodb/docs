.. list-table::
   :widths: 15 85
   :header-rows: 1

   * - Notification Option

     - Description

   * - |service| Project

     - Sends the alert by email or text message to users with
       specific roles in the Project.

       1. Select the Project roles that should receive the alerts
          from the :guilabel:`Select Role(s)` check boxes or select
          :guilabel:`All Roles` for all users in the Project to
          receive the alert.

       2. Select :guilabel:`SMS` to send these alerts to the mobile
          number configured for each |service| Project user in their
          :ref:`Account page <profile-page>`.

       3. Select :guilabel:`Email` to send these alerts to the email
          address configured for each |service| Project user in their
          :ref:`Account page <profile-page>`.
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
          their :ref:`Account page <profile-page>`.

       3. Select :guilabel:`Email` to send these alerts to the email
          address configured for each |service| Organization user in
          their :ref:`Account page <profile-page>`.
          :guilabel:`Email` is checked by default.

   * - |service| User

     - Sends the alert by email or text message to a specified
       |service| user.

       1. Select :guilabel:`SMS` to send these alerts to the mobile
          number configured for the |service| user in their
          :ref:`Account page <profile-page>`.

       2. Select :guilabel:`Email` to send these alerts to the email
          address configured for the |service| user in their
          :ref:`Account page <profile-page>`.
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

       .. example::

          For New Zealand enter ``01164`` before the phone number. 

   * - HipChat

     - Sends the alert to a HipChat room message stream. Enter the
       HipChat room name and |api| token.

   * - Slack

     - Sends the alert to a Slack channel. Enter the channel name and
       either an |api| token or a Bot token. To create an |api| token,
       see the `<https://api.slack.com/web>`__ page in your Slack
       account. To learn more about Bot users in Slack, see
       `<https://api.slack.com/bot-users>`__.

   * - Flowdock

     - Sends the alert to a Flowdock account. Enter the following:

       :guilabel:`Org Name`:
          The Flowdock organization name in lower-case letters. This
          is the name that appears after ``www.flowdock.com/app/`` in
          the |url| string.

       :guilabel:`Flow Name`:
          The flow name in lower-case letters. The flow name appears
          after the organization name in the |url| string:

          ``www.flowdock.com/app/<organization-name>/<flow-name>``

       :guilabel:`User API Token`:
          Your Flowdock personal |api| token found on the 
          `<https://www.flowdock.com/account/tokens>`_ page of your Flowdock account.

   * - PagerDuty

     - Sends the alert to a `PagerDuty
       <http://www.pagerduty.com/?utm_source=mongodb&utm_medium=docs&utm_campaign=partner>`__
       account. Enter only the PagerDuty service key. Define
       escalation rules and alert assignments directly in PagerDuty.

       This option is available only for alerts that require 
       acknowledegment. Informational alerts, such as the alert that a 
       user has joined a project, cannot use this notification method.

       Users can acknowledge PagerDuty alerts only from the PagerDuty
       dashboard.

   * - DataDog

     - Sends the alert to a `DataDog <https://www.datadoghq.com/alerts/>`_
       account as a DataDog
       `event <https://docs.datadoghq.com/graphing/event_stream/>`_. 

       When the alert is first opened, |service| sends the alert as an
       "error" event. Subsequent updates are sent as "info" events.
       When the alert is closed, |service| sends a "success" event.

       If prompted, enter your DataDog |api| key under 
       :guilabel:`API Key` and click
       :guilabel:`Validate Datadog API Key`.

   * - VictorOps

     - Sends the alert to a `VictorOps <https://victorops.com/>`_ 
       account. Enter a VictorOps |api| key and an optional
       `routing key <https://help.victorops.com/knowledge-base/routing-keys/>`_
       for routing alerts to a specific VictorOps group. Define
       escalation and routing rules directly in VictorOps.

       This option is available only for alerts that require 
       acknowledgement. Informational alerts, such as the alert that a 
       user has joined a project, cannot use this notification method.

       Users can acknowledge VictorOps alerts only from the VictorOps 
       dashboard.

   * - OpsGenie

     - Sends the alert to an `OpsGenie <https://www.opsgenie.com/>`_
       account. Enter only the OpsGenie |api| key. Define escalation
       rules and alert assignments directly in OpsGenie.

       This option is available only for alerts that require 
       acknowledgement. Informational alerts, such as the alert that a 
       user has joined a project, cannot use this notification method.

       Users can acknowledge OpsGenie alerts only from the OpsGenie
       dashboard.

   * - Webhook

     - Sends an HTTP POST request to an endpoint for programmatic
       processing. The request body contains a JSON document that uses
       the same format as the |service| |api|\'s
       :doc:`Alerts resource </reference/api/alerts>`.
       This option is available only if you have configured Webhook
       settings on the
       :doc:`Project Settings </tutorial/manage-project-settings>`
       page.

       Grant the following CIDR ranges access to the endpoint resource:
       
       - 4.71.186.128/25
       - 4.35.16.128/25
       
       .. important::
       
          MongoDB reserves the right to change these IP addresses at
          any time without user notice.
