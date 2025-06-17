.. _atlas-alerts-settings-update:

============================
atlas alerts settings update
============================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Modify the details of the specified alert configuration for your project.

To use this command, you must authenticate with a user account or an API key with the Project Owner role.

Syntax
------

.. code-block::
   :caption: Command Syntax

   atlas alerts settings update <alertConfigId> [options]

.. Code end marker, please don't delete this comment

Arguments
---------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - alertConfigId
     - string
     - true
     - Unique identifier of the alert configuration you want to update.

Options
-------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - --apiKey
     - string
     - false
     - Datadog API Key, Opsgenie API Key, or VictorOps API key. Required if the notificationType is DATADOG, OPS_GENIE, or VICTOR_OPS, respectively.
   * - --enabled
     - 
     - false
     - Flag that indicates whether to enable the alert configuration.
   * - --event
     - string
     - false
     - Type of event that triggered the alert. To learn which values the CLI accepts, see the Enum for eventTypeName in the Atlas Admin API spec: https://dochub.mongodb.org/core/atlas-event-names.
   * - -f, --file
     - string
     - false
     - Path to the JSON configuration file that defines alert configuration settings. Note: Unsupported fields in the JSON file are ignored. To learn more about alert configuration files for the Atlas CLI, see https://dochub.mongodb.org/core/alert-config-atlas-cli.
   * - -h, --help
     - 
     - false
     - help for update
   * - --matcherFieldName
     - string
     - false
     - Name of the field in the target object to match on. To learn the valid values, run atlas alerts settings fields type.
   * - --matcherOperator
     - string
     - false
     - Comparison operator to apply when checking the current metric against matcherValue. Valid values are CONTAINS, ENDS_WITH, EQUALS, NOT_CONTAINS, NOT_EQUALS, REGEX, STARTS_WITH.
   * - --matcherValue
     - string
     - false
     - Value to test with the specified operator. If matcherFieldName is set to TYPE_NAME, you can match on the following values: CONFIG, MONGOS, PRIMARY, SECONDARY, STANDALONE.
   * - --metricMode
     - string
     - false
     - Option that indicates whether Atlas computes the current metric value as an average. Valid value is AVERAGE.
   * - --metricName
     - string
     - false
     - Name of the metric against which this command checks the configured alert. To learn the valid values, see https://dochub.mongodb.org/core/alert-host-metrics-atlas. This option applies only if the event is set to OUTSIDE_METRIC_THRESHOLD.
   * - --metricOperator
     - string
     - false
     - Comparison operator to apply when checking the current metric value. Valid values are LESS_THAN and GREATER_THAN.
   * - --metricThreshold
     - float
     - false
     - Threshold value outside of which an alert will be triggered.
   * - --metricUnits
     - string
     - false
     - Units for the threshold value. Valid values are BITS, BYTES, DAYS, GIGABITS, GIGABYTES, HOURS, KILOBITS, KILOBYTES, MEGABITS, MEGABYTES, MILLISECONDS, MINUTES, PETABYTES, RAW, SECONDS, TERABYTES.
   * - --notificationChannelName
     - string
     - false
     - Slack channel name. Required for the SLACK notifications type.
   * - --notificationDelayMin
     - int
     - false
     - Number of minutes to wait after an alert condition is detected before sending out the first notification.
   * - --notificationEmailAddress
     - string
     - false
     - Email address to which alert notifications are sent.
   * - --notificationEmailEnabled
     - 
     - false
     - Flag that enables email notifications. Configurable for GROUP and USER notification types.
   * - --notificationIntervalMin
     - int
     - false
     - Number of minutes to wait between successive notifications for unacknowledged alerts that are not resolved.
   * - --notificationMobileNumber
     - string
     - false
     - Mobile number to which alert notifications are sent.
   * - --notificationRegion
     - string
     - false
     - Region that indicates which API URL to use.
   * - --notificationRole
     - strings
     - false
     - List that contains the one or more organization or project roles that receive the configured alert.
   * - --notificationServiceKey
     - string
     - false
     - PagerDuty service key.
   * - --notificationSmsEnabled
     - 
     - false
     - Flag that enables text message notifications.
   * - --notificationTeamId
     - string
     - false
     - Unique identifier of a team.
   * - --notificationToken
     - string
     - false
     - Slack API token, or Bot token.
   * - --notificationType
     - string
     - false
     - Type of alert notification. Valid values are DATADOG, EMAIL, GROUP (Project), MICROSOFT_TEAMS, ORG, OPS_GENIE, PAGER_DUTY, SLACK, SMS, TEAM, USER, VICTOR_OPS, or WEBHOOK.
   * - --notificationUsername
     - string
     - false
     - Name of the Atlas user to which to send notifications.
   * - --notificationVictorOpsRoutingKey
     - string
     - false
     - Routing key associated with your Splunk On-Call account.
   * - --notificationWebhookSecret
     - string
     - false
     - Authentication secret for a webhook-based alert.
   * - --notificationWebhookUrl
     - string
     - false
     - Target URL for a webhook-based alert or Microsoft Teams alert.
   * - --notifierId
     - string
     - false
     - System-generated unique identifier assigned to each notification method. This identifier is needed when updating third-party notifications without requiring explicit authentication credentials.
   * - -o, --output
     - string
     - false
     - Output format. Valid values are json, json-path, go-template, or go-template-file. To see the full output, use the -o json option.
   * - --projectId
     - string
     - false
     - Hexadecimal string that identifies the project to use. This option overrides the settings in the configuration file or environment variable.

Inherited Options
-----------------

.. list-table::
   :header-rows: 1
   :widths: 20 10 10 60

   * - Name
     - Type
     - Required
     - Description
   * - -P, --profile
     - string
     - false
     - Name of the profile to use from your configuration file. To learn about profiles for the Atlas CLI, see https://dochub.mongodb.org/core/atlas-cli-save-connection-settings.

Output
------

If the command succeeds, the CLI returns output similar to the following sample. Values in brackets represent your values.

.. code-block::

   Alert configuration '<Id>' updated.
   

Examples
--------

.. code-block::
   :copyable: false

   # Modify the alert configuration with the ID 5d1113b25a115342acc2d1aa so that it notifies a user when they join a group for the project with the ID 5df90590f10fab5e33de2305:
   atlas alerts settings update 5d1113b25a115342acc2d1aa --event JOINED_GROUP --enabled \
 		--notificationType USER --notificationEmailEnabled \
 		--notificationIntervalMin 60 --notificationUsername john@example.com \
 		--output json --projectId 5df90590f10fab5e33de2305
   
.. code-block::
   :copyable: false

   # Update alert using json file input containing alert configuration
   atlas alerts settings update 5d1113b25a115342acc2d1aa --file alerts.json
