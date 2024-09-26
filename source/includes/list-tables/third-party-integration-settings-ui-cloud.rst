.. list-table::
   :widths: 30 70
   :header-rows: 1
   :stub-columns: 1

   * - Setting

     - Description

   * - PagerDuty Integration Key

     - Default service key for alert notifications sent to a
       `PagerDuty <http://www.pagerduty.com/?utm_source=mongodb&utm_medium=docs&utm_campaign=partner>`__
       account. |mms| enters the key by default when you add a
       PagerDuty notification to an :ref:`alert configuration <configure-alerts>`. If you add 
       PagerDuty notifications and if the key used to send the
       notifications becomes invalid, |mms| sends an email to the
       project owner and eventually removes the key.

       You can add PagerDuty notifications only for alerts that require
       user acknowledgement. Informational alerts, such as the alert
       that a replica set has elected a new primary, cannot use
       PagerDuty notification.

       Users can acknowledge PagerDuty alert notifications only from
       the PagerDuty dashboard.

       .. include:: /includes/admonitions/important/change-pagerduty-integration-key.rst

       .. include:: /includes/fact-pagerduty-decommission.rst

   * - HipChat Settings

     - Default room and |api| token for alert notifications sent to
       a HipChat account. |mms| enters the values by default when
       you add a HipChat notification to an :ref:`alert configuration <configure-alerts>`.
       If you add HipChat notifications and the token used to send
       notifications becomes invalid, |mms| sends an email to the
       :authrole:`Project Owner` and eventually removes the token.

   * - Slack Settings

     - 
       .. warning::

          Before proceeding, you must:
   
          - Have a `Slack workspace <https://slack.com/help/articles/206845317-Create-a-Slack-workspace/>`__.
          - Have `sufficient permissions to install a Slack app in your workspace <https://slack.com/help/articles/222386767-Manage-app-approval-for-your-workspace/>`__.

       Team name, API token and a channel name for
       alert notifications sent to a Slack account. You can
       configure a Slack integration with OAuth2 by clicking
       :guilabel:`Configure` and then :guilabel:`Sign in with Slack`.

       When you sign in, you are taken to a Slack landing
       page where you may select a workspace and configure permissions.
       After configuring Slack to connect to |mms|, your API token
       is automatically generated and maintained. You will be
       redirected back to the :guilabel:`Integrations page`.

       After initially configuring Slack with |mms|, you can
       :guilabel:`Edit` or :guilabel:`Remove` the integration. Editing
       the integration will display your team name and |api| token, and
       allow you to change your channel name.

       .. important:: Legacy Token Deprecation

          Legacy tokens are deprecated and will be removed in a future
          version of |mms|. You cannot edit a legacy token
          integration. Instead, you must reconfigure your Slack
          integration with OAuth2.

   * - VictorOps Settings

     - |api| key and Routing key for alert notifications sent
       to a VictorOps account. |mms| uses these values as the default
       VictorOps settings when configuring alerts.

       Enter the following information from your VictorOps account. If
       you do not have an existing VictorOps account, you can
       `sign up <https://portal.victorops.com/membership/#/onboarding/create-org>`__.

       - VictorOps API Key
       - VictorOps Routing Key (optional)

   * - Opsgenie API Key

     - |api| key for alert notifications sent to an Opsgenie
       account. |mms| uses this value as the default 
       `OpsGenie Alert API <https://docs.opsgenie.com/docs/alert-api>`__ 
       key when configuring alerts.

       Enter the following information from your Opsgenie account. If
       you do not have an existing Opsgenie account, you can
       `sign up <https://www.opsgenie.com/signup>`__:

       - Opsgenie API Key
       - API Region (United States only)

   * - Datadog Settings

     - Datadog is not supported with |mms|.

   * - Webhook Settings

     - :guilabel:`Webhook URL` endpoint to which |mms| can send alerts
       for programmatic processing. |mms| sends an alert as an |http|
       POST request in which the request body contains a |json|
       document that uses the same format as the |mms| |api|
       :doc:`Alerts resource </reference/api/alerts>`.

       .. include:: /includes/facts/alert-webhook-mms-event-header.rst

       To send alert notifications to a Webhook, select the Webhook
       notification option when creating or editing an
       :ref:`alert configuration <configure-alerts>`. If you add a Webhook notification and
       the |url| or optional key becomes invalid, |mms| sends an email
       to the :authrole:`Project Owner` and eventually removes the
       Webhook settings.

   * - Microsoft Teams Webhook URL

     - Configures |mms| to send alerts about your project to 
       your `Microsoft Teams <https://www.microsoft.com/en-us/microsoft-teams/group-chat-software/>`_  
       channel. You can view these alerts in the 
       `Adaptive Card <https://docs.microsoft.com/en-us/microsoftteams/platform/task-modules-and-cards/cards/cards-reference#adaptive-card/>`_ 
       displayed in your channel.

       To send alert notifications to a Microsoft Teams channel,
       you must create a Microsoft Teams incoming webhook. 
       After creating the webhook, you can use the automatically
       generated URL to configure your Microsoft Teams integration
       in |mms|.

       To setup the integration, see 
       :ref:`Integrate with Microsoft Teams <mms-integrate-with-microsoft-teams>`.

   * - Prometheus Settings
   
     - Configures |mms| to send metric data about your deployment
       to your |prometheus| instance. To learn more, see
       :ref:`prometheus-integration-mms`.
  