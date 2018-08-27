.. list-table::
   :widths: 35 65
   :header-rows: 1

   * - Notification Option

     - Description

   * - Project

     - Sends the alert to a project, either by email or SMS. 
       :guilabel:`SMS` uses the number configured for each |service|
       user's account. To send to specific roles, deselect
       :guilabel:`All Roles` and select the roles.

   * - |service| User

     - Sends the alert to a |service| user, either by email or SMS. 
       :guilabel:`SMS` uses the number configured for the |service|
       user's account.

   * - Email

     - Sends the alert to an email address configured in the |service|
       user's account.

   * - SMS

     - Sends the alert to a mobile number. |service| removes all
       punctuation and letters and uses only the digits. If you are
       outside of the United States or Canada, include ``011`` and the
       `country code <https://countrycode.org/>`__. 

       .. example::

          For New Zealand enter ``01164`` before the phone number. As
          an alternative, use a 
          `Google Voice number <https://voice.google.com>`__. |service|
          uses the U.S.-based `Twilio <https://www.twilio.com>`_ to
          send SMS messages.

   * - HipChat

     - Sends the alert to a HipChat room message stream. Enter the
       HipChat room name and API token.

   * - Slack

     - Sends the alert to a Slack channel. Enter the channel name and
       either an API token or a Bot token. To create an API token, see
       the `Slack Web API <https://api.slack.com/web>`__ page in the
       Slack documentation. To learn more about Bot users, see
       `Bot users <https://api.slack.com/bot-users>`__  in the Slack
       documentation.

   * - Flowdock

     - Sends the alert to a Flowdock account. Enter the following:

       .. list-table::
          :widths: 20 80

          * - :guilabel:`Org Name`
            - The Flowdock organization name in lower-case letters.
              This is the name that appears after
              ``www.flowdock.com/app/`` in the URL string.

          * - :guilabel:`Flow Name`
            - The flow name in lower-case letters. The flow name
              appears after the organization name in the URL string:
              ``www.flowdock.com/app/<organization-name>/<flow-name>``

          * - :guilabel:`User API Token`
            - Your Flowdock "personal API token" found on the
              `Flowdock Tokens <https://www.flowdock.com/account/tokens>`_ page of your Flowdock account.

   * - PagerDuty

     - Sends the alert to a 
       `PagerDuty <http://www.pagerduty.com/?utm_source=mongodb&utm_medium=docs&utm_campaign=partner>`__
       account. Enter only the PagerDuty service key. Define
       escalation rules and alert assignments directly in PagerDuty.

       This option is available only for alerts that require
       acknowledegment. Informational alerts, such as the alert that a
       |service| user has joined a project, cannot use this 
       notification method.

       |service| Users can acknowledge PagerDuty alerts only from the
       PagerDuty dashboard.

   * - DataDog

     - Sends the alert to a 
       `DataDog <https://www.datadoghq.com/alerts/>`_ account as a
       DataDog
       `event <https://docs.datadoghq.com/graphing/event_stream/>`_.

       When the alert is first opened, |service| sends the alert as an
       "error" event. Subsequent updates are sent as "info" events.
       When the alert is closed, |service| sends a "success" event.

       If prompted, enter your DataDog API key under
       :guilabel:`API Key` and click
       :guilabel:`Validate Datadog API Key`.

   * - VictorOps

     - Sends the alert to a `VictorOps <https://victorops.com/>`_ 
       account. Enter a VictorOps API key and an optional
       `routing key <https://help.victorops.com/knowledge-base/routing-keys/>`_
       for routing alerts to a specific VictorOps group. Define
       escalation and routing rules directly in VictorOps.

       This option is available only for alerts that require 
       acknowledgement. Informational alerts, such as the alert that a 
       |service| user has joined a project, cannot use this
       notification method.

       |service| Users can acknowledge VictorOps alerts only from the
       VictorOps dashboard.

   * - OpsGenie

     - Sends the alert to an `OpsGenie <https://www.opsgenie.com/>`_
       account. Enter only the OpsGenie API key. Define escalation
       rules and alert assignments directly in OpsGenie.

       This option is available only for alerts that require 
       acknowledgement. Informational alerts, such as the alert that a 
       user has joined a project, cannot use this notification method.

       |service| Users can acknowledge OpsGenie alerts only from the
       OpsGenie dashboard.

   * - Webhook

     - Sends an HTTP ``POST`` request to an endpoint for
       programmatic processing. The request body contains a JSON
       document that uses the same format as the |service| API
       ``Alerts`` resource. This option is available only if you have
       configured Webhook settings on the ``Project Settings`` page.
       
       Grant the following CIDR ranges access to the endpoint resource:
       
       - 4.71.186.128/25
       - 4.35.16.128/25
       
       .. important::
       
          MongoDB reserves the right to change these IP addresses at
          any time without user notice.
