.. cond:: onprem

   .. list-table::
      :widths: 20 80
      :header-rows: 1
      :stub-columns: 1

      * - Notification Method
        - Description

      * - |mms| Project
        - .. include:: /includes/alert-notifications/project.rst

      * - |mms| Organization
        - .. include:: /includes/alert-notifications/org.rst

      * - |mms| User
        - .. include:: /includes/alert-notifications/user.rst

      * - |mms| Team
        - .. include:: /includes/alert-notifications/team.rst

      * - |snmp| Host
        - Specify the hostname that will receive the v2c trap on
          standard port ``162``. The |snmp-mib| file for |snmp| is
          `available for download <http://downloads.mongodb.com/on-prem-monitoring/MMS-10GEN-MIB.txt>`__.

      * - Email
        - Sends the alert to a specified email address.

      * - |sms|
        - .. include:: /includes/alert-notifications/sms-onprem.rst

      * - `HipChat <https://www.atlassian.com/software/hipchat/enterprise/data-center>`_
        - Sends the alert to a HipChat room message stream. Enter the
          HipChat room name and |api| token.

      * - `Slack <https://slack.com/>`_
        - .. include:: /includes/alert-notifications/slack.rst

      * - `FlowDock <https://www.flowdock.com/>`_
        - .. include:: /includes/alert-notifications/flowdock.rst

      * - `PagerDuty <https://www.pagerduty.com/>`__
        - .. include:: /includes/alert-notifications/pagerduty.rst

      * - Webhook
        - .. include:: /includes/alert-notifications/webhook.rst

      * - `Datadog <https://www.datadoghq.com/>`_
        - .. include:: /includes/alert-notifications/datadog.rst

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

