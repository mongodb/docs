.. only:: onprem

   .. list-table::
      :widths: 15 10 10 65
      :header-rows: 1

      * - Notification Option
        - User Alerts
        - Billing Alerts
        - Description

      * - |mms| Organization

        - :icon:`check`

        - :icon:`check`

        - Sends the alert by email or text message to users with
          specific roles in the Organization.

          1. Select the Organization roles that should receive the
              alerts from the :guilabel:`Select Role(s)` check boxes or
              select :guilabel:`All Roles` for all users in the
              Organization to receive the alert.

          2. Select :guilabel:`SMS` to send these alerts to the mobile
              number configured for each |mms| Organization user in
              their Account page.

          3. Select :guilabel:`Email` to send these alerts to the email
              address configured for each |mms| Organization user in
              their Account page.
              :guilabel:`Email` is checked by default.

      * - |mms| User

        - :icon:`check`

        - :icon:`check`

        - Sends the alert by email or text message to a specified
          |mms| user.

          1. Select :guilabel:`SMS` to send these alerts to the mobile
              number configured for the |mms| user in their
              Account page.

          2. Select :guilabel:`Email` to send these alerts to the email
              address configured for the |mms| user in their
              Account page.
              :guilabel:`Email` is checked by default.

      * - Email

        - :icon:`check`

        - :icon:`check`

        - Sends the alert to any email address you provide.

      * - Mobile Number

        - :icon:`check`

        - :icon:`check`

        - Sends the alert to a mobile number. |mms| removes all
          punctuation and letters and uses only the digits. If you are
          outside of the United States or Canada, include ``011`` and the
          `country code <https://countrycode.org/>`__  because |mms|
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
          workplace for the Organization. Enter the channel name.

      * - Flowdock

        - :icon:`check`

        - :icon:`check`

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
              `<https://www.flowdock.com/account/tokens>`_ page of your
              Flowdock account.

      * - PagerDuty

        - 

        - :icon:`check`

        - Sends the alert to a 
          `PagerDuty <http://www.pagerduty.com/?utm_source=mongodb&utm_medium=docs&utm_campaign=partner>`_
          account. Enter only the PagerDuty integration key. Define
          escalation rules and alert assignments directly in PagerDuty.

          This option is available only for alerts that require an 
          acknowledgement. Information alerts, such as 
          :alert-type:`User joined the organization <JOINED_ORG>`,
          can't use this notification method.

          Acknowledge PagerDuty alerts from the PagerDuty dashboard.

      * - Datadog

        - :icon:`check`

        - :icon:`check`

        - Sends the alert to a `Datadog <https://www.datadoghq.com/alerts/>`__
          account as a Datadog
          `event <https://docs.datadoghq.com/graphing/event_stream/>`_. 

          When the alert is first opened, |mms| sends the alert as an
          "error" event. Subsequent updates are sent as "info" events.
          When the alert is closed, |mms| sends a "success" event.

          If prompted, enter your DataDog |api| key under 
          :guilabel:`API Key` and click
          :guilabel:`Validate Datadog API Key`.

      * - VictorOps

        - 

        - :icon:`check`

        - Sends the alert to a `VictorOps <https://victorops.com/>`_ 
          account. 
          
          Enter a VictorOps
          `API key <https://help.victorops.com/knowledge-base/rest-endpoint-integration-guide/>`__
          to integrate the VictorOps endpoint for alerts and an optional 
          `routing key <https://help.victorops.com/knowledge-base/routing-keys/>`_
          to route alerts to a specific VictorOps group. Click 
          :guilabel:`Post Test Alert` to test VictorOps configuration. 
          Define escalation and routing rules directly in VictorOps.

          This option is available only for alerts that require an 
          acknowledgement. Information alerts, such as 
          :alert-type:`User joined the organization <JOINED_ORG>`,
          can't use this notification method.

          Acknowledge VictorOps alerts from the VictorOps dashboard.

      * - Opsgenie

        - 

        - :icon:`check`

        - Sends the alert to an `Opsgenie <https://www.opsgenie.com/>`_
          account. Enter only the Opsgenie API key. Define escalation
          rules and alert assignments in Opsgenie.

          This option is available only for alerts that require an 
          acknowledgement. Information alerts, such as 
          :alert-type:`User joined the organization <JOINED_ORG>`,
          can't use this notification method.

          `Acknowledge Opsgenie 
          alerts <https://docs.opsgenie.com/docs/acknowledge-and-unacknowledge>`_ 
          from the Opsgenie dashboard.

.. only:: cloud

   .. list-table::
      :widths: 15 10 10 65
      :header-rows: 1

      * - Notification Option
        - User Alerts
        - Billing Alerts
        - Description

      * - |mms| Organization

        - :icon:`check`

        - :icon:`check`

        - Sends the alert by email or text message to users with
          specific roles in the Organization.

          1. Select the Organization roles that should receive the
              alerts from the :guilabel:`Select Role(s)` check boxes or
              select :guilabel:`All Roles` for all users in the
              Organization to receive the alert.

          2. Select :guilabel:`SMS` to send these alerts to the mobile
              number configured for each |mms| Organization user in
              their Account page.

          3. Select :guilabel:`Email` to send these alerts to the email
              address configured for each |mms| Organization user in
              their Account page.
              :guilabel:`Email` is checked by default.

      * - |mms| User

        - :icon:`check`

        - :icon:`check`

        - Sends the alert by email or text message to a specified
          |mms| user.

          1. Select :guilabel:`SMS` to send these alerts to the mobile
              number configured for the |mms| user in their
              Account page.

          2. Select :guilabel:`Email` to send these alerts to the email
              address configured for the |mms| user in their
              Account page.
              :guilabel:`Email` is checked by default.

      * - Email

        - :icon:`check`

        - :icon:`check`

        - Sends the alert to any email address you provide.

      * - Mobile Number

        - :icon:`check`

        - :icon:`check`

        - Sends the alert to a mobile number. |mms| removes all
          punctuation and letters and uses only the digits. If you are
          outside of the United States or Canada, include ``011`` and the
          `country code <https://countrycode.org/>`__  because |mms|
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
          workplace for the Organization. Enter the channel name.

      * - Flowdock

        - :icon:`check`

        - :icon:`check`

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
              `<https://www.flowdock.com/account/tokens>`_ page of your
              Flowdock account.

      * - PagerDuty

        - 

        - :icon:`check`

        - Sends the alert to a 
          `PagerDuty <http://www.pagerduty.com/?utm_source=mongodb&utm_medium=docs&utm_campaign=partner>`_
          account. Enter only the PagerDuty integration key. Define
          escalation rules and alert assignments directly in PagerDuty.

          This option is available only for alerts that require an 
          acknowledgement. Information alerts, such as 
          :alert-type:`User joined the organization <JOINED_ORG>`,
          can't use this notification method.

          Acknowledge PagerDuty alerts from the PagerDuty dashboard.

      * - VictorOps

        - 

        - :icon:`check`

        - Sends the alert to a `VictorOps <https://victorops.com/>`_ 
          account. 
          
          Enter a VictorOps
          `API key <https://help.victorops.com/knowledge-base/rest-endpoint-integration-guide/>`__
          to integrate the VictorOps endpoint for alerts and an optional 
          `routing key <https://help.victorops.com/knowledge-base/routing-keys/>`_
          to route alerts to a specific VictorOps group. Click 
          :guilabel:`Post Test Alert` to test VictorOps configuration. 
          Define escalation and routing rules directly in VictorOps.

          This option is available only for alerts that require an 
          acknowledgement. Information alerts, such as 
          :alert-type:`User joined the organization <JOINED_ORG>`,
          can't use this notification method.

          Acknowledge VictorOps alerts from the VictorOps dashboard.

      * - Opsgenie

        - 

        - :icon:`check`

        - Sends the alert to an `Opsgenie <https://www.opsgenie.com/>`_
          account. Enter only the Opsgenie API key. Define escalation
          rules and alert assignments in Opsgenie.

          This option is available only for alerts that require an 
          acknowledgement. Information alerts, such as 
          :alert-type:`User joined the organization <JOINED_ORG>`,
          can't use this notification method.

          `Acknowledge Opsgenie 
          alerts <https://docs.opsgenie.com/docs/acknowledge-and-unacknowledge>`_ 
          from the Opsgenie dashboard.
