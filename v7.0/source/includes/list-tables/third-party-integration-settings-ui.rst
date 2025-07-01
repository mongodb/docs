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

       .. important::

          Before proceeding, you must complete the steps to 
          :ref:`integrate with Slack <integrate-with-slack>`.

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
       the integration will display your team name and |api| token, and
       allow you to change your channel name.

       .. important:: Legacy Token Deprecation

          Legacy tokens are deprecated and will be removed in a future
          version of |mms|. You cannot edit a legacy token
          integration. Instead, you must reconfigure your Slack
          integration with OAuth2.

   * - VictorOps Settings

     - Sets an API key and Routing key for alert notifications sent to
       a Splunk On-Call (formerly VictorOps) account. |mms| uses
       this information as the default settings when configuring
       alerts.

       - If you have a Splunk On-Call account, enter the following
         information:


         - `Splunk On-Call REST Endpoint Integration Routing API Key <https://help.victorops.com/knowledge-base/rest-endpoint-integration-guide/>`__
         - `Splunk On-Call Routing Key <https://help.victorops.com/knowledge-base/routing-keys/>`__ (optional)

       - If you don't have a Splunk On-Call account,
         `sign up for one <https://www.splunk.com/en_us/download/on-call.html>`__.

   * - Opsgenie API Key

     - |api| key for alert notifications sent to an Opsgenie
       account. |mms| uses this value as the default
       `OpsGenie Alert API <https://docs.opsgenie.com/docs/alert-api>`__ 
       key when configuring alerts.

       Enter the following information from your Opsgenie account. If
       you do not have an existing Opsgenie account, you can
       `sign up <https://www.opsgenie.com/signup>`__.

       - Opsgenie API Key
       - API Region (United States only)

   * - Datadog Settings

     - Configuration |mms| uses to send metric data about your
       deployment to Datadog. You can view these metrics in your
       Datadog dashboards.

       Enter the following information from your Datadog account to
       have Datadog begin tracking your |mms| metric data. If you
       do not have an existing Datadog account, you can sign up at
       `DataDog <https://app.datadoghq.com/signup>`__.

       - Datadog API Key

         You might see an inaccurate health status in the following 
         scenarios:

         - If you have a network partition and the {+mdbagent+} lives 
           on an isolated nde in a replica set, only pings from the 
           isolated node reach Datadog. The isolated node and 
           |onprem| UI report the other nodes as down.
         - If you have a network partition and the MongoDB Agent lives 
           outside the impacted nodes, pings from all the nodes reach 
           Datadog, but report different statuses.
         - If all nodes are unresponsive or their state is hanging, no 
           new pings come in. The |onprem| UI reports these nodes as 
           down, but Datadog reports them as healthy and the status 
           gets older.

         .. important::

            If the health status is ``1``, but no other metrics appear 
            in Datadog, the replica set might be down.

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

       If your webhook requires HTTPS, you must 
       :ref:`import your CA certificate into the Ops Manager trust store <add-ca-cert-to-om>`.

   * - CA Flowdock Settings
   
     - Sets default values for alert notifications sent to Flowdock.
       |mms| enters the values by default when you add a Flowdock
       notification to an :ref:`alert configuration <configure-alerts>`. If you add Flowdock
       notifications, and if credentials to send notifications become
       invalid, |service| sends an email to the project owner and
       eventually removes the credentials.

       Enter the following information from your CA Flowdock account. If
       you do not have an existing CA Flowdock account, you can
       `sign up <https://www.flowdock.com/signup>`__.

       - Org Name
       - Flow Name
       - API Token

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
       to your |prometheus| instance. To setup the integration, see
       :ref:`prometheus-integration-mms`.
