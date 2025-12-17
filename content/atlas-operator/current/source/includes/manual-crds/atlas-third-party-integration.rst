.. _atlasthirdpartyintegration: 

AtlasThirdPartyIntegration
--------------------------

AtlasThirdPartyIntegration is the Schema for the atlas 3rd party integrations API.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``apiVersion``
     - string
     - atlas.mongodb.com/v1
     - true

   * -  ``kind``
     - string
     - ``AtlasThirdPartyIntegration``
     - true

   * -  ``metadata``
     - object
     - Refer to the Kubernetes ``API`` documentation for the fields of the ``metadata`` field.
     - true

   * -  ``spec``
     - object
     - ``AtlasThirdPartyIntegrationSpec`` contains the expected configuration for an integration
       *Validations*:

       - (has(self.``externalProjectRef``) && !has(self.``projectRef``)) || (!has(self.``externalProjectRef``) && has(self.``projectRef``)): must define only one project reference through ``externalProjectRef`` or ``projectRef``

       - (has(self.``externalProjectRef``) && has(self.``connectionSecret``)) || !has(self.``externalProjectRef``): must define a local connection secret when referencing an external project

       - has(self.type) && self.type.size() != 0: must define a type of integration

       - !has(self.datadog) || (self.type == '``DATADOG``' && has(self.datadog)): only ``DATADOG`` type may set datadog fields

       - !has(self.``microsoftTeams``) || (self.type == '``MICROSOFT_TEAMS``' && has(self.``microsoftTeams``)): only ``MICROSOFT_TEAMS`` type may set ``microsoftTeams`` fields

       - !has(self.``newRelic``) || (self.type == '``NEW_RELIC``' && has(self.``newRelic``)): only ``NEW_RELIC`` type may set ``newRelic`` fields

       - !has(self.``opsGenie``) || (self.type == '``OPS_GENIE``' && has(self.``opsGenie``)): only ``OPS_GENIE`` type may set ``opsGenie`` fields

       - !has(self.prometheus) || (self.type == '``PROMETHEUS``' && has(self.prometheus)): only ``PROMETHEUS`` type may set prometheus fields

       - !has(self.``pagerDuty``) || (self.type == '``PAGER_DUTY``' && has(self.``pagerDuty``)): only ``PAGER_DUTY`` type may set ``pagerDuty`` fields

       - !has(self.slack) || (self.type == '``SLACK``' && has(self.slack)): only ``SLACK`` type may set slack fields

       - !has(self.``victorOps``) || (self.type == '``VICTOR_OPS``' && has(self.``victorOps``)): only ``VICTOR_OPS`` type may set ``victorOps`` fields

       - !has(self.webhook) || (self.type == '``WEBHOOK``' && has(self.webhook)): only ``WEBHOOK`` type may set webhook fields
     - false

   * -  ``status``
     - object
     - ``AtlasThirdPartyIntegrationStatus`` holds the ``status`` of an integration
     - false

.. _atlasthirdpartyintegration-spec: 

AtlasThirdPartyIntegration.spec
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

AtlasThirdPartyIntegrationSpec contains the expected configuration for an integration

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``type``
     - enum
     - Type of the integration.
       *Enum*: ``DATADOG``, ``MICROSOFT_TEAMS``, ``NEW_RELIC``, ``OPS_GENIE``, ``PAGER_DUTY``, ``PROMETHEUS``, ``SLACK``, ``VICTOR_OPS``, ``WEBHOOK``
     - true

   * -  ``connectionSecret``
     - object
     - Name of the secret containing Atlas ``API`` private and public keys.
     - false

   * -  ``datadog``
     - object
     - Datadog contains the config fields for Datadog's Integration.
     - false

   * -  ``externalProjectRef``
     - object
     - ``externalProjectRef`` holds the parent Atlas project ``ID``.
       Mutually exclusive with the "``projectRef``" field.
     - false

   * -  ``microsoftTeams``
     - object
     - ``MicrosoftTeams`` contains the config fields for Microsoft Teams's Integration.
     - false

   * -  ``newRelic``
     - object
     - ``NewRelic`` contains the config fields for New Relic's Integration.
     - false

   * -  ``opsGenie``
     - object
     - ``OpsGenie`` contains the config fields for Ops Genie's Integration.
     - false

   * -  ``pagerDuty``
     - object
     - ``PagerDuty`` contains the config fields for ``PagerDuty``'s Integration.
     - false

   * -  ``projectRef``
     - object
     - ``projectRef`` is a reference to the parent ``AtlasProject`` resource.
       Mutually exclusive with the "``externalProjectRef``" field.
     - false

   * -  ``prometheus``
     - object
     - Prometheus contains the config fields for Prometheus's Integration.
     - false

   * -  ``slack``
     - object
     - Slack contains the config fields for Slack's Integration.
     - false

   * -  ``victorOps``
     - object
     - ``VictorOps`` contains the config fields for ``VictorOps``'s Integration.
     - false

   * -  ``webhook``
     - object
     - Webhook contains the config fields for Webhook's Integration.
     - false

.. _atlasthirdpartyintegration-spec-connectionsecret: 

AtlasThirdPartyIntegration.spec.connectionSecret
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Name of the secret containing Atlas API private and public keys.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Name of the resource being referred to
       More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     - true

.. _atlasthirdpartyintegration-spec-datadog: 

AtlasThirdPartyIntegration.spec.datadog
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Datadog contains the config fields for Datadog's Integration.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``apiKeySecretRef``
     - object
     - APIKeySecretRef holds the name of a secret containing the Datadog ``API`` key.
     - true

   * -  ``region``
     - string
     - Region is the Datadog region
     - true

   * -  ``sendCollectionLatencyMetrics``
     - enum
     - ``SendCollectionLatencyMetrics`` toggles sending collection latency metrics.
       *Enum*: enabled, disabled
       *Default*: disabled
     - false

   * -  ``sendDatabaseMetrics``
     - enum
     - ``SendDatabaseMetrics`` toggles sending database metrics,
       including database and collection names
       *Enum*: enabled, disabled
       *Default*: disabled
     - false

.. _atlasthirdpartyintegration-spec-datadog-apikeysecretref: 

AtlasThirdPartyIntegration.spec.datadog.apiKeySecretRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

APIKeySecretRef holds the name of a secret containing the Datadog API key.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Name of the resource being referred to
       More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     - true

.. _atlasthirdpartyintegration-spec-externalprojectref: 

AtlasThirdPartyIntegration.spec.externalProjectRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

externalProjectRef holds the parent Atlas project ID.
Mutually exclusive with the "projectRef" field.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``id``
     - string
     - ``ID`` is the Atlas project ``ID``.
     - true

.. _atlasthirdpartyintegration-spec-microsoftteams: 

AtlasThirdPartyIntegration.spec.microsoftTeams
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

MicrosoftTeams contains the config fields for Microsoft Teams's Integration.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``urlSecretRef``
     - object
     - URLSecretRef holds the name of a secret containing the Microsoft Teams secret ``URL``.
     - true

.. _atlasthirdpartyintegration-spec-microsoftteams-urlsecretref: 

AtlasThirdPartyIntegration.spec.microsoftTeams.urlSecretRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

URLSecretRef holds the name of a secret containing the Microsoft Teams secret URL.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Name of the resource being referred to
       More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     - true

.. _atlasthirdpartyintegration-spec-newrelic: 

AtlasThirdPartyIntegration.spec.newRelic
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

NewRelic contains the config fields for New Relic's Integration.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``credentialsSecretRef``
     - object
     - ``CredentialsSecretRef`` holds the name of a secret containing new relic's credentials:
       account id, license key, read and write tokens.
     - true

.. _atlasthirdpartyintegration-spec-newrelic-credentialssecretref: 

AtlasThirdPartyIntegration.spec.newRelic.credentialsSecretRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

CredentialsSecretRef holds the name of a secret containing new relic's credentials:
account id, license key, read and write tokens.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Name of the resource being referred to
       More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     - true

.. _atlasthirdpartyintegration-spec-opsgenie: 

AtlasThirdPartyIntegration.spec.opsGenie
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

OpsGenie contains the config fields for Ops Genie's Integration.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``apiKeySecretRef``
     - object
     - APIKeySecretRef holds the name of a secret containing Ops Genie's ``API`` key.
     - true

   * -  ``region``
     - string
     - Region is the Ops Genie region.
     - true

.. _atlasthirdpartyintegration-spec-opsgenie-apikeysecretref: 

AtlasThirdPartyIntegration.spec.opsGenie.apiKeySecretRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

APIKeySecretRef holds the name of a secret containing Ops Genie's API key.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Name of the resource being referred to
       More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     - true

.. _atlasthirdpartyintegration-spec-pagerduty: 

AtlasThirdPartyIntegration.spec.pagerDuty
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

PagerDuty contains the config fields for PagerDuty's Integration.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``region``
     - string
     - Region is the Pager Duty region.
     - true

   * -  ``serviceKeySecretRef``
     - object
     - ``ServiceKeySecretRef`` holds the name of a secret containing Pager Duty service key.
     - true

.. _atlasthirdpartyintegration-spec-pagerduty-servicekeysecretref: 

AtlasThirdPartyIntegration.spec.pagerDuty.serviceKeySecretRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ServiceKeySecretRef holds the name of a secret containing Pager Duty service key.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Name of the resource being referred to
       More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     - true

.. _atlasthirdpartyintegration-spec-projectref: 

AtlasThirdPartyIntegration.spec.projectRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

projectRef is a reference to the parent AtlasProject resource.
Mutually exclusive with the "externalProjectRef" field.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Name of the Kubernetes Resource
     - true

   * -  ``namespace``
     - string
     - Namespace of the Kubernetes Resource
     - false

.. _atlasthirdpartyintegration-spec-prometheus: 

AtlasThirdPartyIntegration.spec.prometheus
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Prometheus contains the config fields for Prometheus's Integration.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``enabled``
     - string
     - Enabled is true when Prometheus integration is enabled.
     - true

   * -  ``prometheusCredentialsSecretRef``
     - object
     - ``PrometheusCredentialsSecretRef`` holds the name of a secret containing the Prometheus.
       username & password
     - true

   * -  ``serviceDiscovery``
     - enum
     - ``ServiceDiscovery`` to be used by Prometheus.
       *Enum*: file, http
     - true

.. _atlasthirdpartyintegration-spec-prometheus-prometheuscredentialssecretref: 

AtlasThirdPartyIntegration.spec.prometheus.prometheusCredentialsSecretRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

PrometheusCredentialsSecretRef holds the name of a secret containing the Prometheus.
username & password

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Name of the resource being referred to
       More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     - true

.. _atlasthirdpartyintegration-spec-slack: 

AtlasThirdPartyIntegration.spec.slack
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Slack contains the config fields for Slack's Integration.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``apiTokenSecretRef``
     - object
     - APITokenSecretRef holds the name of a secret containing the Slack ``API`` token.
     - true

   * -  ``channelName``
     - string
     - ``ChannelName`` to be used by Prometheus.
     - true

   * -  ``teamName``
     - string
     - ``TeamName`` flags whether Prometheus integration is enabled.
     - true

.. _atlasthirdpartyintegration-spec-slack-apitokensecretref: 

AtlasThirdPartyIntegration.spec.slack.apiTokenSecretRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

APITokenSecretRef holds the name of a secret containing the Slack API token.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Name of the resource being referred to
       More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     - true

.. _atlasthirdpartyintegration-spec-victorops: 

AtlasThirdPartyIntegration.spec.victorOps
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

VictorOps contains the config fields for VictorOps's Integration.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``apiKeySecretRef``
     - object
     - APIKeySecretRef is the name of a secret containing Victor Ops ``API`` key.
     - true

   * -  ``routingKey``
     - string
     - ``RoutingKey`` holds ``VictorOps`` routing key.
     - true

.. _atlasthirdpartyintegration-spec-victorops-apikeysecretref: 

AtlasThirdPartyIntegration.spec.victorOps.apiKeySecretRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

APIKeySecretRef is the name of a secret containing Victor Ops API key.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Name of the resource being referred to
       More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     - true

.. _atlasthirdpartyintegration-spec-webhook: 

AtlasThirdPartyIntegration.spec.webhook
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Webhook contains the config fields for Webhook's Integration.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``urlSecretRef``
     - object
     - URLSecretRef holds the name of a secret containing Webhook ``URL`` and secret.
     - true

.. _atlasthirdpartyintegration-spec-webhook-urlsecretref: 

AtlasThirdPartyIntegration.spec.webhook.urlSecretRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

URLSecretRef holds the name of a secret containing Webhook URL and secret.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Name of the resource being referred to
       More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     - true

.. _atlasthirdpartyintegration-status: 

AtlasThirdPartyIntegration.status
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

AtlasThirdPartyIntegrationStatus holds the status of an integration

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``conditions``
     - []object
     - Conditions holding the status details
     - false

   * -  ``id``
     - string
     - ``ID`` of the third party integration resource in Atlas
     - false

.. _atlasthirdpartyintegration-status-conditions: 

AtlasThirdPartyIntegration.status.conditions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Condition contains details for one aspect of the current state of this API Resource.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``lastTransitionTime``
     - string
     - ``lastTransitionTime`` is the last time the condition transitioned from one status to another.
       This should be when the underlying condition changed. If that is not known, then using the time when the ``API`` field changed is acceptable.
       *Format*: date-time
     - true

   * -  ``message``
     - string
     - message is a human readable ``message`` indicating details about the transition.
       This may be an empty string.
     - true

   * -  ``reason``
     - string
     - reason contains a programmatic identifier indicating the ``reason`` for the condition's last transition.
       Producers of specific condition types may define expected values and meanings for this field,
       and whether the values are considered a guaranteed ``API``.
       The value should be a ``CamelCase`` string.
       This field may not be empty.
     - true

   * -  ``status``
     - enum
     - status of the condition, one of True, False, Unknown.
       *Enum*: True, False, Unknown
     - true

   * -  ``type``
     - string
     - type of condition in ``CamelCase`` or in foo.example.com/``CamelCase``.
     - true

   * -  ``observedGeneration``
     - integer
     - ``observedGeneration`` represents the .metadata.generation that the condition was set based upon.
       For instance, if .metadata.generation is currently 12, but the .status.conditions[x].``observedGeneration`` is 9, the condition is out of date
       with respect to the current state of the instance.
       *Format*: int64
       *Minimum*: 0
     - false