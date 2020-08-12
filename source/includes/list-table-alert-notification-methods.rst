.. cond:: onprem

   .. list-table::
      :widths: 15 5 5 5 70
      :header-rows: 1

      * - Notification Method
        - Project
        - Global
        - System
        - Description

      * - |mms| Project
        - :icon:`check`
        - :icon:`check`
        -
        - Sends the alert by email or text message to users with
          specific roles in the Project.

          1. Select the Project roles that should receive the alerts
             from the :guilabel:`Select Role(s)` check boxes or select
             :guilabel:`All Roles` for all users in the Project to
             receive the alert.

          2. Select :guilabel:`SMS` to send these alerts to the mobile
             number configured for each |mms| Project user in their
             :ref:`Account page <profile-page>`.

          3. Select :guilabel:`Email` to send these alerts to the email
             address configured for each |mms| Project user in their
             :ref:`Account page <profile-page>`.
             :guilabel:`Email` is checked by default.

      * - |mms| Organization
        - :icon:`check`
        - :icon:`check`
        -
        - Sends the alert by email or text message to users with
          specific roles in the Organization.

          1. Select the Organization roles that should receive the
             alerts from the :guilabel:`Select Role(s)` check boxes or
             select :guilabel:`All Roles` for all users in the
             Organization to receive the alert.

          2. Select :guilabel:`SMS` to send these alerts to the mobile
             number configured for each |mms| Organization user in
             their :ref:`Account page <profile-page>`.

          3. Select :guilabel:`Email` to send these alerts to the email
             address configured for each |mms| Organization user in
             their :ref:`Account page <profile-page>`.
             :guilabel:`Email` is checked by default.

      * - |mms| User
        - :icon:`check`
        -
        -
        - Sends the alert by email or text message to a specified |mms|
          user.

          1. Select :guilabel:`SMS` to send these alerts to the mobile
             number configured for the |mms| user in their
             :ref:`Account page <profile-page>`.

          2. Select :guilabel:`Email` to send these alerts to the email
             address configured for the |mms| user in their
             :ref:`Account page <profile-page>`.
             :guilabel:`Email` is checked by default.

      * - |mms| Team
        - :icon:`check`
        -
        -
        - Sends the alert by email or text message to a specified |mms|
          team.

          .. note::
             This option appears only after at least
             :ref:`one team has been created <create-team>`.

          1. Select :guilabel:`SMS` to send these alerts to the mobile
             number configured for each |mms| Team user in their
             :ref:`Account page <profile-page>`.

          2. Select :guilabel:`Email` to send these alerts to the email
             address configured for each |mms| Team user in their
             :ref:`Account page <profile-page>`.
             :guilabel:`Email` is checked by default.

      * - |snmp| Host
        - :icon:`check`
        - :icon:`check`
        - :icon:`check`
        - Specify the hostname that will receive the v2c trap on
          standard port ``162``. The |snmp-mib| file for |snmp| is
          `available for download <http://downloads.mongodb.com/on-prem-monitoring/MMS-10GEN-MIB.txt>`_.

      * - Email
        - :icon:`check`
        - :icon:`check`
        - :icon:`check`
        - Sends the alert to a specified email address.

      * - :abbr:`SMS (Short Message Service)`
        - :icon:`check`
        - :icon:`check`
        - :icon:`check`
        - Sends the alert to a specified mobile number.

          Available only if |onprem| is configured for
          :ref:`Twilio <twilio-sms-alert-settings>` integration.

      * - `HipChat <https://www.atlassian.com/software/hipchat/enterprise/data-center>`_
        - :icon:`check`
        - :icon:`check`
        - :icon:`check`
        - Sends the alert to a HipChat room message stream. Enter the
          HipChat room name and
          |api| token.

      * - `Slack <https://slack.com/>`_
        - :icon:`check`
        - :icon:`check`
        - :icon:`check`
        - Sends the alert to a Slack channel. Enter the channel name
          and either an |api|
          token or a Bot token. To create an
          |api| token, see
          the `API <https://api.slack.com/web>`_ page in your Slack
          account. For information on Bot users in Slack, see
          `Bot Users <https://api.slack.com/bot-users>`_.

      * - `FlowDock <https://www.flowdock.com/>`_
        - :icon:`check`
        - :icon:`check`
        - :icon:`check`
        - Sends the alert to a Flowdock account. Enter the following:

          - :guilabel:`Organization Name`: The Flowdock organization
            name in lowercase letters. This is the name that appears
            after ``www.flowdock.com/app/`` in the URL string.

          - :guilabel:`Flow Name`: The flow name in lowercase letters.
            The flow name appears after the organization name in the
            URL ``www.flowdock.com/app/orgname/flowname``.

          - :guilabel:`User API Token`: Your Flowdock "personal API
            token" found on the
            `Tokens <https://www.flowdock.com/account/tokens>`_ page
            of your Flowdock account.

      * - `PagerDuty <https://www.pagerduty.com/>`__
        - :icon:`check`
        - :icon:`check`
        - :icon:`check`
        - Sends the alert to a
          `PagerDuty <http://www.pagerduty.com/?utm_source=mongodb&utm_medium=docs&utm_campaign=partner>`__
          account. Enter only the PagerDuty integration key. Define
          escalation rules and alert assignments directly in PagerDuty.

          This option is available only for alerts that require
          acknowledgement. Informational alerts, such as the alert that
          a replica set has elected a new primary, cannot use this
          notification method.

          Users can acknowledge PagerDuty alerts only from the
          PagerDuty dashboard.

      * - Webhook
        - :icon:`check`
        - :icon:`check`
        -
        - Sends an |http| POST
          request to an endpoint for programmatic processing. The
          request body contains a |json| document that uses the same
          format as the |mms| |api|
          :doc:`Alerts resource </reference/api/alerts>`.

          To use this method:

          - At the Project level, configure the :guilabel:`Webhook`
            settings for your :ref:`Project <group-settings-page>`

          - At the Global level, configure the :guilabel:`Webhook`
            settings on the Administration
            :ref:`Alerts tab <om-admin-alerts-tab>` for Global alerts.

          .. include:: /includes/facts/alert-webhook-mms-event-header.rst

      * - `Datadog <https://www.datadoghq.com/>`_
        - :icon:`check`
        - :icon:`check`
        - :icon:`check`
        - Sends the alert to a DataDog account. Enter the following:

          - :guilabel:`datadogApiKey`: The DataDog
            `API Key <https://docs.datadoghq.com/api/?lang=python#authentication>`_.
            This key can be found in
            `your Datadog account <https://app.datadoghq.com/account/settings#api>`_.

      * - Administrators
        -
        - :icon:`check`
        - :icon:`check`
        - Sends the alert to the email address specified in the
          :guilabel:`Admin Email Address` field in the |onprem|
          configuration options.

      * - Global Alerts Summary Email
        -
        - :icon:`check`
        -
        - Sends a summary email of all global alerts to the specified
          email address.

.. cond:: cloud

   .. list-table::
      :widths: 20 80
      :header-rows: 1

      * - Notification Option
        - Description

      * - |mms| Project

        - Sends the alert to users with specific roles in the
          project, either by email or text message.

          - Select the Project roles that should receive the alerts
            from the :guilabel:`Select Role(s)` check boxes or select
            :guilabel:`All Roles` for all users in the Project to
            receive the alert.

          - Select :guilabel:`SMS` to send these alerts to the mobile
            number configured for each |mms| user's account.

          - Select :guilabel:`Email` to send these alerts to the email
            address configured for each |mms| user's account.
            :guilabel:`Email` is checked by default.

      * - |mms| Organization

        - Sends the alert to users with specific roles in the
          organization, either by email or text message.

          - Select the Organization roles that should receive the
            alerts from the :guilabel:`Select Role(s)` check boxes or
            select :guilabel:`All Roles` for all users in the
            Organization to receive the alert.

          - Select :guilabel:`SMS` to send these alerts to the mobile
            number configured for each |mms| user's account.

          - Select :guilabel:`Email` to send these alerts to the email
            address configured for each |mms| user's account.
            :guilabel:`Email` is checked by default.

      * - |mms| User

        - Sends the alert to a |mms| user, either by email or text
          message.

          - Select :guilabel:`SMS` to send these alerts to the mobile
            number configured for the |mms| user's account.

          - Select :guilabel:`Email` to send these alerts to the email
            address configured for the |mms| user's account.
            :guilabel:`Email` is checked by default.

      * - |mms| Team

        - Sends the alert to a specified |mms|
          team, either by email or text
          message.

          - Select :guilabel:`SMS` to send these alerts to the mobile
            number configured for the |mms| user's account.

          - Select :guilabel:`Email` to send these alerts to the email
            address configured for the |mms| user's account.
            :guilabel:`Email` is checked by default.

          .. note::
             This option appears only after at least
             :ref:`one team has been created <create-team>`.

      * - Email

        - Sends the alert to a specified email address.

      * - :abbr:`SMS (Short Message Service)`

        - Sends the alert to a mobile number. |mms| removes all
          punctuation and letters and uses only the digits. If you are
          outside of the United States or Canada, include ``011`` and
          the `country code <https://countrycode.org/>`__  because
          |mms| uses the U.S.-based
          `Twilio <https://www.twilio.com>`_ to send text messages. As
          an alternative to your non-U.S. telephone number, use a
          `Google Voice <https://voice.google.com>`__ telephone number.

          .. example::

             For New Zealand enter ``01164`` before the phone number.

      * - `Slack <https://slack.com/>`_

        - Sends the alert to a Slack channel. Enter the channel name
          and either an |api| token or a Bot token.

          To create an |api| token, see the
          `API <https://api.slack.com/web>`_ page in your Slack
          account. To learn more about Bot users in Slack, see
          `Bot Users <https://api.slack.com/bot-users>`_.

      * - `FlowDock <https://www.flowdock.com/>`_

        - Sends the alert to a Flowdock account. Enter the following:

          - :guilabel:`Organization Name`: The Flowdock organization
            :name in lowercase letters. This is the name that appears
            :after ``www.flowdock.com/app/`` in the URL string.

          - :guilabel:`Flow Name`: The flow name in lowercase letters.
            The flow name appears after the org name in the URL:
            ``www.flowdock.com/app/orgname/flowname``.

          - :guilabel:`User API Token`: Your Flowdock "personal API
            token" found on the
            `Tokens <https://www.flowdock.com/account/tokens>`_ page
            of your Flowdock account.

      * - `PagerDuty <https://www.pagerduty.com/>`__

        - Sends the alert to a `PagerDuty <http://www.pagerduty.com/?utm_source=mongodb&utm_medium=docs&utm_campaign=partner>`__
          account. Enter only the PagerDuty integration key. Define
          escalation rules and alert assignments directly in PagerDuty.

          This option is available only for alerts that require
          acknowledgement. Informational alerts, such as the alert that
          a replica set has elected a new primary, cannot use this
          notification method.

          Users can acknowledge PagerDuty alerts only from the
          PagerDuty dashboard.

      * - Webhook

        - Sends an |http| POST request to an endpoint for programmatic
          processing. The request body contains a |json| document that
          uses the same format as the |mms| |api|
          :doc:`Alerts resource </reference/api/alerts>`. This option
          is available only if you have configured Webhook settings on
          the :ref:`Project Settings <group-settings-page>` page.

          .. include:: /includes/facts/alert-webhook-mms-event-header.rst
