.. list-table::
   :widths: 40 60
   :header-rows: 1

   * - Third-Party Service

     - Configuration Details

   * - :guilabel:`PagerDuty Service Key`

     - Sets a default service key for alert notifications sent to a
       `PagerDuty <http://www.pagerduty.com/?utm_source=mongodb&utm_medium=docs&utm_campaign=partner>`_
       account. |service| enters the key by default when you add a
       PagerDuty notification to an :doc:`alert configuration
       </monitoring-alerts>`. If you add PagerDuty notifications and if
       the key used to send the notifications becomes invalid,
       |service| sends an email to the project owner and eventually
       removes the key.

       You can add PagerDuty notifications only for alerts that require
       user acknowledgement. Informational alerts, such as the alert
       that a user has joined a project, cannot use this notification
       method.

       Users can acknowledge PagerDuty alerts only from the PagerDuty
       dashboard.

   * - :guilabel:`Flowdock Settings`

     - Sets default values for alert notifications sent to Flowdock.
       |service| enters the values by default when you add a Flowdock
       notification to an
       :doc:`alert configuration </monitoring-alerts>`. If you add
       Flowdock notifications, and if credentials to send notifications
       become invalid, |service| sends an email to the project owner
       and eventually removes the credentials.

       Set the following:

       .. list-table::
          :widths: 20 80

          * - :guilabel:`Org Name`

            - The Flowdock organization name in lower-case letters.
              This is the name that appears after
              ``www.flowdock.com/app/`` in the |url| string.

          * - :guilabel:`Flow Name`

            - The flow name in lower-case letters. The flow name
              appears after the organization name in the |url| string:

              ``www.flowdock.com/app/<organization-name>/<flow-name>``

          * - :guilabel:`API Token`

            - Your Flowdock "personal API token" found on the
              `<https://www.flowdock.com/account/tokens>`_ page of your
              Flowdock account.

   * - :guilabel:`Slack Settings`

     - Sets a team name, |api| token and a channel name for
       alert notifications sent to a Slack account. You can
       configure a Slack integration with OAuth2 by clicking
       :guilabel:`Configure` and then :guilabel:`Sign in with Slack`.

       When you sign in, you are taken to a Slack landing page where
       you may select a workspace and configure permissions. After
       configuring Slack to connect to |service|, your |api| token is
       automatically generated and maintained. You will be redirected
       back to the :guilabel:`Integrations page`.

       After initially configuring Slack with |service|, you can
       :guilabel:`Edit` or :guilabel:`Remove` the integration. Editing
       the integration will display your team name and |api| token, and
       allow you to change your channel name.

       .. admonition:: Legacy Token Deprecation
          :class: important

          Legacy tokens are deprecated and will be removed in a future
          version of |service|. You cannot edit a legacy token
          integration. Instead, you must reconfigure your Slack
          integration with OAuth2.

   * - :guilabel:`Webhook Settings`

     - Adds a :guilabel:`Webhook URL` endpoint to which |service| can
       send alert notifications for programmatic processing. |service|
       sends an alert notification as an |http| POST request. The
       request body contains a |json| document that uses the same
       format as the |service| |api| ``Alerts`` resource.

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
       header contains the base64-encoded |hmac|-SHA-1 signature of the
       request body. |service| creates the signature using the provided
       secret.

       To send alert notifications to a Webhook, select the Webhook
       notification option when creating or editing an
       :doc:`alert </monitoring-alerts>`. If you add a Webhook
       notification and the |url| or optional key becomes invalid,
       |service| sends an email to the project owner and eventually
       removes the Webhook settings.

   * - :guilabel:`VictorOps Settings`

     - Sets an API key and Routing key for alert notifications sent
       to a VictorOps account. This will be used as the default
       VictorOps settings when configuring alerts.

       Enter the following information from your VictorOps account. If
       you do not have an existing VictorOps account, you can sign up
       using
       `<https://help.victorops.com/knowledge-base/new-user-sign/>`_.

       - VictorOps API Key
       - VictorOps Routing Key (optional)


   * - :guilabel:`OpsGenie API Key`

     - Sets an API key for alert notifications sent to an OpsGenie
       account. This will be used as the default OpsGenie API key when
       configuring alerts.

       Enter the following information from your OpsGenie account. If
       you do not have an existing OpsGenie account, you can sign up
       using `<https://www.opsgenie.com/signup>`_ :

       - OpsGenie API Key
       - API Region (United States or Europe)

   * - :guilabel:`New Relic Settings`

     - Configures |service| to send metric data about your deployment
       to `New Relic <http://newrelic.com/>`_ for viewing through the
       New Relic MongoDB plugin. You can also use Insights for New
       Relic to run analytics on the collected data. |service| sends
       New Relic the same metric data as displayed in |service|
       :doc:`cluster metrics </monitor-cluster-metrics>`.

       Enter the following information from your New Relic account. If
       you do not have an existing New Relic account, you can sign up
       using `<http://newrelic.com/mongodb>`_.

       - Account ID
       - License Key
       - Insights API Insert Key
       - Insights API Query Key

       If any of the keys later become invalid, |service| sends an
       email to the project owner and eventually removes the invalid
       credentials.

   * - :guilabel:`Datadog Settings`

     - Configures |service| to send metric data about your deployment
       to |datadog|. You can view these metrics in your Datadog
       dashboards. For a detailed list of all |service| metrics
       that Datadog tracks, refer to the
       :ref:`Datadog Integration <datadog-integration>` page.

       Enter the following information from your Datadog account to
       have Datadog begin tracking your |service| metric data. If you
       do not have an existing Datadog account, you can sign up at
       `<https://app.datadoghq.com/signup>`__.

       - Datadog API Key
       - API Region (United States or Europe)

   * - :guilabel:`SumoLogic Settings`

     - Connects you to the relevant SumoLogic documentation for
       configuring SumoLogic with |service|. You don't need to
       configure any settings within |service| to set up a SumoLogic
       integration.
