.. list-table::
   :widths: 35 65
   :header-rows: 1

   * - Notification Option

     - Description

   * - Group

     - Sends the alert to a group, either by email or SMS. :guilabel:`SMS`
       uses the number configured for each user's account. To send to specific
       roles, deselect :guilabel:`All Roles` and select the roles.

   * - |service| User

     - Sends the alert to a user, either by email or SMS. :guilabel:`SMS` uses
       the number configured for the user's account.

   * - Email

     - Sends the alert to an email address.

   * - SMS

     - Sends the alert to a mobile number. |service| removes all punctuation
       and letters and uses only the digits. If you are outside of the United
       States or Canada, include '011' and the country code. For example, for
       New Zealand enter '01164' before the phone number. As an alternative,
       use a Google Voice number. |service| uses the U.S.-based `Twilio
       <https://www.twilio.com>`_ to send SMS messages.

   * - HipChat

     - Sends the alert to a HipChat room message stream. Enter the HipChat
       room name and API token.

   * - Slack

     - Sends the alert to a Slack channel. Enter the channel name and either
       an API token or a Bot token. To create an API token, see the
       `<https://api.slack.com/web>`_ page in your Slack account. For
       information on Bot users in Slack, see
       `<https://api.slack.com/bot-users>`_.

   * - Flowdock

     - Sends the alert to a Flowdock account. Enter the following:

       :guilabel:`Org Name`: The Flowdock organization name in lower-case
       letters. This is the name that appears after ``www.flowdock.com/app/``
       in the URL string.

       :guilabel:`Flow Name`: The flow name in lower-case letters. The flow
       name appears after the organization name in the URL string:

       ``www.flowdock.com/app/<organization-name>/<flow-name>``

       :guilabel:`User API Token`: Your Flowdock "personal API token" found on
       the `<https://www.flowdock.com/account/tokens>`_ page of your Flowdock
       account.

   * - PagerDuty

     - Sends the alert to a `PagerDuty
       <http://www.pagerduty.com/?utm_source=mongodb&utm_medium=docs&utm_campaign=partner>`_
       account. Enter only the PagerDuty service key. Define escalation rules
       and alert assignments directly in PagerDuty.

       This option is available only for alerts that require acknowledgement.
       Informational alerts, such as the alert that a user has joined a group,
       cannot use this notification method.

       Users can acknowledge PagerDuty alerts only from the PagerDuty
       dashboard.

   * - Webhook

     - Sends an HTTP POST request to an endpoint for programmatic processing.
       The request body contains a JSON document that uses the same format as
       the |service| API's ``Alerts`` resource. This option is available only if
       you have configured Webhook settings on the ``Group Settings`` page.
