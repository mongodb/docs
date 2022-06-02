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

   * - Flowdock
     - - :setting:`spec.integrations.apiTokenRef.name`
       - :setting:`spec.integrations.apiTokenRef.namespace`
       - :setting:`spec.integrations.flowName`
       - :setting:`spec.integrations.orgName`

   * - Microsoft Teams
     - - :setting:`spec.integrations.microsoftTeamsWebhookURL`

   * - New Relic
     - - :setting:`spec.integrations.accountId`
       - :setting:`spec.integrations.apiKeyRef.namespace`
       - :setting:`spec.integrations.licenseKeyRef.name`
       - :setting:`spec.integrations.licenseKeyRef.namespace`
       - :setting:`spec.integrations.readTokenRef.name`
       - :setting:`spec.integrations.readTokenRef.namespace`
       - :setting:`spec.integrations.writeTokenRef.name`
       - :setting:`spec.integrations.writeTokenRef.namespace`

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