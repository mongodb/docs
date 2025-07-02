.. list-table::
   :widths: 20 80
   :header-rows: 1

   * - Service
     - Settings

   * - All
     - - :setting:`spec.integrations.type`

   * - Datadog
     - - :setting:`spec.integrations.apiKeyRef.name`
       - :setting:`spec.integrations.apiKeyRef.namespace`
       - :setting:`spec.integrations.region`

   * - Microsoft Teams
     - - :setting:`spec.integrations.microsoftTeamsWebhookURL`

   * - Opsgenie
     - - :setting:`spec.integrations.apiKeyRef.name`
       - :setting:`spec.integrations.apiKeyRef.namespace`
       - :setting:`spec.integrations.region`
        
   * - PagerDuty
     - - :setting:`spec.integrations.serviceKeyRef.name`
       - :setting:`spec.integrations.serviceKeyRef.namespace`

   * - Prometheus
     - - :setting:`spec.integrations.enabled`
       - :setting:`spec.integrations.passwordRef.name`
       - :setting:`spec.integrations.passwordRef.namespace`
       - :setting:`spec.integrations.scheme`
       - :setting:`spec.integrations.serviceDiscovery`
       - :setting:`spec.integrations.username`

   * - Slack
     - - :setting:`spec.integrations.apiTokenRef.name`
       - :setting:`spec.integrations.apiTokenRef.namespace`

   * - VictorOps
     - - :setting:`spec.integrations.apiKeyRef.name`
       - :setting:`spec.integrations.routingKeyRef.name`
       - :setting:`spec.integrations.routingKeyRef.namespace`

   * - Webhook Settings
     - - :setting:`spec.integrations.secretRef.name`
       - :setting:`spec.integrations.secretRef.namespace`
       - :setting:`spec.integrations.url`
