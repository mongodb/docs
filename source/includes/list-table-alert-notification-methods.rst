.. cond:: onprem

   .. list-table::
      :widths: 15 5 5 5 70
      :header-rows: 1
      :stub-columns: 1

      * - Notification Method
        - Project
        - Global
        - System
        - Description

      * - |mms| Project
        - :icon:`check`
        - :icon:`check`
        -
        - .. include:: /includes/alert-notifications/project.rst

      * - |mms| Organization
        - :icon:`check`
        - :icon:`check`
        -
        - .. include:: /includes/alert-notifications/org.rst

      * - |mms| User
        - :icon:`check`
        -
        -
        - .. include:: /includes/alert-notifications/user.rst

      * - |mms| Team
        - :icon:`check`
        -
        -
        - .. include:: /includes/alert-notifications/user.rst

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
        - .. include:: /includes/alert-notifications/sms-onprem.rst

      * - `HipChat <https://www.atlassian.com/software/hipchat/enterprise/data-center>`_
        - :icon:`check`
        - :icon:`check`
        - :icon:`check`
        - Sends the alert to a HipChat room message stream. Enter the
          HipChat room name and |api| token.

      * - `Slack <https://slack.com/>`_
        - :icon:`check`
        - :icon:`check`
        - :icon:`check`
        - .. include:: /includes/alert-notifications/slack.rst

      * - `FlowDock <https://www.flowdock.com/>`_
        - :icon:`check`
        - :icon:`check`
        - :icon:`check`
        - .. include:: /includes/alert-notifications/flowdock.rst

      * - `PagerDuty <https://www.pagerduty.com/>`__
        - :icon:`check`
        - :icon:`check`
        - :icon:`check`
        - .. include:: /includes/alert-notifications/pagerduty.rst

      * - Webhook
        - :icon:`check`
        - :icon:`check`
        -
        - .. include:: /includes/alert-notifications/webhook.rst

          To use this method at the Global level, configure the
          :guilabel:`Webhook` settings on the Administration
          :ref:`Alerts tab <om-admin-alerts-tab>` for Global alerts.

          .. include:: /includes/facts/alert-webhook-mms-event-header.rst

      * - `Datadog <https://www.datadoghq.com/>`_
        - :icon:`check`
        - :icon:`check`
        - :icon:`check`
        - .. include:: /includes/alert-notifications/datadog.rst

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
      :stub-columns: 1

      * - Notification Option
        - Description

      * - |mms| Project
        - .. include:: /includes/alert-notifications/project.rst

      * - |mms| Organization
        - .. include:: /includes/alert-notifications/org.rst

      * - |mms| User
        - .. include:: /includes/alert-notifications/user.rst

      * - |mms| Team
        - .. include:: /includes/alert-notifications/user.rst

      * - Email
        - Sends the alert to a specified email address.

      * - |sms|
        - .. include:: /includes/alert-notifications/sms-cloud.rst

      * - `Slack <https://slack.com/>`_
        - .. include:: /includes/alert-notifications/slack.rst

      * - `FlowDock <https://www.flowdock.com/>`_
        - .. include:: /includes/alert-notifications/flowdock.rst

      * - `PagerDuty <https://www.pagerduty.com/>`__
        - .. include:: /includes/alert-notifications/pagerduty.rst

      * - Webhook
        - .. include:: /includes/alert-notifications/webhook.rst
