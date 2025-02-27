.. list-table::
   :widths: 40 60
   :header-rows: 1

   * - Third-Party Service

     - Configuration Details

   * - :guilabel:`Datadog Settings`

     - Configures |service| to send metric data about your deployment
       to |datadog|. You can view these metrics in your Datadog
       dashboards. To discover the detailed list of all |service|
       metrics that Datadog tracks, refer to the
       :ref:`Datadog Integration <datadog-integration>` page.

       - If you have a Datadog account, use Datadog to begin tracking your
         |service| metric data.

       - If you do not have an existing Datadog account,
         `sign up for one <https://app.datadoghq.com/signup>`__.

       - Datadog API Key
       - API Region

         .. include:: /includes/fact-datadog-supported-regions.rst

   * - :guilabel:`Microsoft Teams Settings`

     - Configures |service| to send alerts about your project to 
       your `Microsoft Teams <https://www.microsoft.com/en-us/microsoft-teams/group-chat-software/>`_  
       channel. You can view these alerts in the 
       `Adaptive Card <https://docs.microsoft.com/en-us/microsoftteams/platform/task-modules-and-cards/cards/cards-reference#adaptive-card/>`_ 
       displayed in your channel.

       To send alert notifications to a Microsoft Teams channel,
       you must create a Microsoft Teams incoming webhook. 
       After creating the webhook, you can use the automatically
       generated URL to configure your Microsoft Teams integration
       in |service|.

       To setup the integration, see 
       :ref:`Integrate with Microsoft Teams <integrate-with-microsoft-teams>`.

   * - :guilabel:`New Relic Settings`

     - .. include:: /includes/fact-new-relic-deprecated-nested.rst
      
       Configures |service| to send metric data about your deployment
       to `New Relic <http://newrelic.com/>`_ for viewing through the
       New Relic MongoDB plugin. You can also use Insights for New
       Relic to run analytics on the collected data. |service| sends
       New Relic the same metric data as displayed in |service|
       :doc:`cluster metrics </monitor-cluster-metrics>`.

       - If you have a New Relic account, enter the following
         information:

         - Account ID
         - License Key
         - Insights API Insert Key
         - Insights API Query Key

       - If you don't have a New Relic account,
         `sign up for one <https://newrelic.com/signup?via=login>`__.

       If any of the keys later become invalid, |service| sends an
       email to the project owner and eventually removes the invalid
       credentials.

   * - :guilabel:`OpsGenie API Key`

     - Sets an API key for the `OpsGenie Alert API <https://docs.opsgenie.com/docs/alert-api>`__. 
       This will be used as the default OpsGenie API key when 
       configuring alerts.
       (Note that this integration will send the alert to the configured *account*, not the team.)

       - If you have an OpsGenie account, enter the following
         information:

         - OpsGenie integration API Key, which OpsGenie provides after you
           `create an API integration 
           <https://support.atlassian.com/opsgenie/docs/create-a-default-api-integration>`__
           under an OpsGenie team. You cannot use general OpsGenie account API
           keys for |service| integration.
         - API Region (United States or Europe)

       - If you don't have an OpsGenie account,
         `sign up for one <https://www.opsgenie.com/signup>`__.

   * - :guilabel:`PagerDuty Service Key`

     - Sets a default service key for alert notifications sent to a
       `PagerDuty <http://www.pagerduty.com/?utm_source=mongodb&utm_medium=docs&utm_campaign=partner>`_
       account. |service| enters the key by default when you add a
       PagerDuty notification to an :doc:`alert configuration
       </monitoring-alerts>`. If you add PagerDuty notifications and if
       the key used to send the notifications becomes invalid,
       |service| sends an email to the project owner and eventually
       removes the key.

       Users can acknowledge PagerDuty alerts only from the PagerDuty
       dashboard.

       .. include:: /includes/fact-pagerduty-api-key-decommission.rst

   * - :guilabel:`Slack Settings`

     - Sets a team name, |api| token and a channel name for
       alert notifications sent to a Slack account. To
       configure a Slack integration with OAuth2, click
       :guilabel:`Configure` and then :guilabel:`Sign in with Slack`.

       When you sign in, you are taken to a Slack landing page where
       you may select a workspace and configure permissions. After
       configuring Slack to connect to |service|, your |api| token is
       automatically generated and maintained. |service| redirects you
       back to the :guilabel:`Integrations page`.

       After initially configuring Slack with |service|, you can
       :guilabel:`Edit` or :guilabel:`Remove` the integration. When you
       edit the integration, |service| displays your team name and
       |api| token, and allow you to change your channel name.

       :gold:`IMPORTANT:` |service| deprecated legacy tokens. You can't configure a new Slack
       integration with legacy tokens or edit any existing legacy tokens. You can continue to use legacy tokens if you 
       used them to configure a Slack integration prior to deprecation. However,
       you must reconfigure your Slack integration with OAuth2 if you need to edit your token configuration.

   * - :guilabel:`SumoLogic Settings`

     - Connects you to the relevant SumoLogic documentation for
       configuring SumoLogic with |service|. You don't need to
       configure any settings within |service| to set up a SumoLogic
       integration.

   * - :guilabel:`VictorOps Settings`

     - Sets an API key and Routing key for alert notifications sent to
       a Splunk On-Call (formerly VictorOps) account. |service| uses
       this information as the default settings when configuring
       alerts.

       - If you have a Splunk On-Call account, enter the following
         information:

         - `Splunk On-Call REST Endpoint Integration Routing API Key <https://help.victorops.com/knowledge-base/rest-endpoint-integration-guide/>`__
         - `Splunk On-Call Routing Key <https://help.victorops.com/knowledge-base/routing-keys/>`__ (optional)

       - If you don't have a Splunk On-Call account,
         `sign up for one <https://www.splunk.com/en_us/download/on-call.html>`__.

   * - :guilabel:`Webhook Settings`

     - Adds a :guilabel:`Webhook URL` endpoint to which |service| can
       send alert notifications for programmatic processing. |service|
       sends an alert notification as an |http| POST request. The
       request body contains a |json| document that uses the same
       format as the {+atlas-admin-api+} ``Alerts`` resource.

       |service| adds a request header called ``X-MMS-Event`` to
       distinguish between various alert states. The possible values
       for this header are:

       .. list-table::
          :widths: 30 70

          * - ``alert.open``

            - The alert was just opened.

          * - ``alert.close``

            - The alert was resolved.

          * - ``alert.update``

            - A previously opened alert is still open.

          * - ``alert.acknowledge``

            - The alert was acknowledged.

          * - ``alert.cancel``

            - The alert became invalid and was canceled.

          * - ``alert.inform``

            - Represents an informational alert, which is a
              {+PIT-Restore+} event, such as "Primary Elected."

       If you specify a key in the :guilabel:`Webhook Secret` field,
       |service| adds the ``X-MMS-Signature`` request header. This
       header contains the Base64-encoded |hmac|-SHA-1 signature of the
       request body. |service| creates the signature using the provided
       secret.

       To send alert notifications to a Webhook, select the Webhook
       notification option when creating or editing an
       :doc:`alert </monitoring-alerts>`. If you add a Webhook
       notification and the |url| or optional key becomes invalid,
       |service| sends an email to the project owner and eventually
       removes the Webhook settings.

       :gold:`IMPORTANT:` If your firewall configuration requires it, allow access from
       :ref:`Atlas IP addresses <atlas-add-inbound-ips>` so that
       |service| can communicate with your webhook.

   * - :guilabel:`Prometheus Settings`

     - Configures |service| to send metric data about your deployment
       to your |prometheus| instance. To learn more, see :ref:`prometheus-integration`.
