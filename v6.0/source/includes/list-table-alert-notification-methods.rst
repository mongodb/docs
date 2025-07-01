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
     - .. include:: /includes/alert-notifications/team.rst

   * - |snmp| Host
     - :icon:`check`
     - :icon:`check`
     - :icon:`check`
     - Specify the hostname that will receive the v2c trap on
       standard port ``162``. The |snmp-mib| file for |snmp| is
       `available for download <http://downloads.mongodb.com/on-prem-monitoring/MMS-10GEN-MIB.txt>`_.

       .. include:: /includes/fact-snmp-alerts-deprecated.rst

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

       To use this method at the Global level:

       1. Navigate to the :guilabel:`Ops Manager Config`
          :guilabel:`Miscellaneous` tab of the
          :guilabel:`Administration console`.

       2. Update the :setting:`Webhook URL` and
          :setting:`Webhook Secret` settings.

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

