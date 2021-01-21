.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Setting

     - Description

   * - :guilabel:`PagerDuty Integration Key`

     - Default service key for alert notifications sent to a
       `PagerDuty <http://www.pagerduty.com/?utm_source=mongodb&utm_medium=docs&utm_campaign=partner>`__
       account. |mms| enters the key by default when you add a
       PagerDuty notification to an :doc:`alert configuration
       </tutorial/manage-alert-configurations>`. If you add PagerDuty
       notifications and if the key used to send the notifications
       becomes invalid, |mms| sends an email to the project owner and
       eventually removes the key.

       You can add PagerDuty notifications only for alerts that require
       user acknowledgement. Informational alerts, such as the alert
       that a replica set has elected a new primary, cannot use
       PagerDuty notification.

       Users can acknowledge PagerDuty alert notifications only from
       the PagerDuty dashboard.

       .. include:: /includes/admonitions/important/change-pagerduty-integration-key.rst

       .. include:: /includes/fact-pagerduty-decommission.rst

   * - :guilabel:`Flowdock Settings`

     - Default values for alert notifications sent to Flowdock.
       |mms| enters the values by default when you add a Flowdock
       notification to an :doc:`alert configuration
       </tutorial/manage-alert-configurations>`. If you add Flowdock
       notifications, and if credentials to send notifications become
       invalid, |mms| sends an email to the project owner and
       eventually removes the credentials.

       Set the following:

       - :guilabel:`Org Name`: The Flowdock organization name in
         lower-case letters. This is the name that appears after
         ``www.flowdock.com/app/`` in the URL string.

       - :guilabel:`Flow Name`: The flow name in lower-case letters.
         The flow name appears after the org name in the URL string:
         ``www.flowdock.com/app/<org-name>/<flow-name>``.

       - :guilabel:`API Token`: Your Flowdock "personal API token"
         found on the `<https://www.flowdock.com/account/tokens>`_ page
         of your Flowdock account.

   * - :guilabel:`HipChat Settings`

     - .. cond:: onprem

          Default room and API token for alert notifications
          sent to a HipChat account. |mms| enters the values by default
          when you add a HipChat notification to an :doc:`alert
          configuration </tutorial/manage-alert-configurations>`. If
          you add HipChat notifications and the token used to send
          notifications becomes invalid, |mms| sends an email to the
          project owner and eventually removes the token.

       .. cond:: cloud

          HipChat is not supported with |mms|.

   * - :guilabel:`Slack Settings`

     - Team name, API token and a channel name for
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
       the integration will display your team name and API token, and
       allow you to change your channel name.

       .. admonition:: Legacy Token Deprecation
          :class: important

          Legacy tokens are deprecated and will be removed in a future
          version of |mms|. You cannot edit a legacy token
          integration. Instead, you must reconfigure your Slack
          integration with OAuth2.

   * - :guilabel:`VictorOps Settings`

     - API key and Routing key for alert notifications sent
       to a VictorOps account. |mms| uses these values as the default
       VictorOps settings when configuring alerts.

       Enter the following information from your VictorOps account. If
       you do not have an existing VictorOps account, you can sign up
       using
       `<https://help.victorops.com/knowledge-base/new-user-sign/>`__.

       - VictorOps API Key
       - VictorOps Routing Key (optional)

   * - :guilabel:`Opsgenie API Key`

     - API key for alert notifications sent to an Opsgenie
       account. |mms| uses this value as the default Opsgenie API key 
       when configuring alerts.

       Enter the following information from your Opsgenie account. If
       you do not have an existing Opsgenie account, you can sign up
       using `<https://www.opsgenie.com/signup>`_ :

       - Opsgenie API Key
       - API Region (United States or Europe)

   * - :guilabel:`New Relic Settings`

     - Configuration |mms| uses to send metric data about your 
       deployment to `New Relic <http://newrelic.com/>`__ for viewing 
       through the New Relic MongoDB plugin. You can also use Insights 
       for New Relic to run analytics on the collected data.

       Enter the following information from your New Relic account. If
       you do not have an existing New Relic account, you can sign up
       using `<http://newrelic.com/mongodb>`_.

       - Account ID
       - License Key
       - Insights API Insert Key
       - Insights API Query Key

       If any of the keys later become invalid, |mms| sends an
       email to the project owner and eventually removes the invalid
       credentials.

   * - :guilabel:`Datadog Settings`

     - .. cond:: onprem

          Configuration |mms| uses to send metric data about your 
          deployment to Datadog. You can view these metrics in your 
          Datadog dashboards.

          Enter the following information from your Datadog account to
          have Datadog begin tracking your |mms| metric data. If you
          do not have an existing Datadog account, you can sign up at
          `<https://app.datadoghq.com/signup>`__.

          - Datadog API Key
          - API Region (United States or Europe)

       .. cond:: cloud

          Datadog is not supported with |mms|.

   * - :guilabel:`Webhook Settings`

     - :guilabel:`Webhook URL` endpoint to which |mms| can send
       alert notifications for programmatic processing. |mms| sends an
       alert notification as an |http| POST request in which the
       request body contains a |json| document that uses the same
       format as the |mms| |api| :doc:`Alerts resource </reference/api/alerts>`.

       .. include:: /includes/facts/alert-webhook-mms-event-header.rst

       To send alert notifications to a Webhook, select the Webhook
       notification option when creating or editing an
       :doc:`alert configuration </tutorial/manage-alert-configurations>`.
       If you add a Webhook notification and the URL or optional key
       becomes invalid, |mms| sends an email to the project owner and
       eventually removes the Webhook settings.
