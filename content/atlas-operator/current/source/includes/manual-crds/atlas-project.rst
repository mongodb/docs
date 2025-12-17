.. _atlasproject: 

AtlasProject
------------

AtlasProject is the Schema for the atlasprojects API

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
     - ``AtlasProject``
     - true

   * -  ``metadata``
     - object
     - Refer to the Kubernetes ``API`` documentation for the fields of the ``metadata`` field.
     - true

   * -  ``spec``
     - object
     - ``AtlasProjectSpec`` defines the target state of Project in Atlas
     - false

   * -  ``status``
     - object
     - ``AtlasProjectStatus`` defines the observed state of ``AtlasProject``
     - false

.. _atlasproject-spec: 

AtlasProject.spec
~~~~~~~~~~~~~~~~~

AtlasProjectSpec defines the target state of Project in Atlas

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Name is the ``name`` of the Project that is created in Atlas by the Operator if it doesn't exist yet.
       The ``name`` length must not exceed 64 characters. The ``name`` must contain only letters, numbers, spaces, dashes, and underscores.
       *Validations*:

       - self == ``oldSelf``: Name cannot be modified after project creation
     - true

   * -  ``alertConfigurationSyncEnabled``
     - boolean
     - ``AlertConfigurationSyncEnabled`` is a flag that enables/disables Alert Configurations sync for the current Project.
       If true - project alert configurations will be synced according to ``AlertConfigurations``.
       If not - alert configurations will not be modified by the operator. They can be managed through the ``API``, ``CLI``, and ``UI``.
     - false

   * -  ``alertConfigurations``
     - []object
     - ``AlertConfiguration`` is a list of Alert Configurations configured for the current Project.
       If you use this setting, you must also set spec.``alertConfigurationSyncEnabled`` to true for Atlas Kubernetes
       Operator to modify project alert configurations.
       If you omit or leave this setting empty, Atlas Kubernetes Operator doesn't alter the project's alert
       configurations. If creating a project, Atlas applies the default project alert configurations.
     - false

   * -  ``auditing``
     - object
     - Auditing represents ``MongoDB`` Maintenance Windows.
     - false

   * -  ``backupCompliancePolicyRef``
     - object
     - ``BackupCompliancePolicyRef`` is a reference to the backup compliance custom resource.
     - false

   * -  ``cloudProviderAccessRoles``
     - []object
     - ``CloudProviderAccessRoles`` is a list of Cloud Provider Access Roles configured for the current Project.
       Deprecated: This configuration was deprecated in favor of ``CloudProviderIntegrations``
     - false

   * -  ``cloudProviderIntegrations``
     - []object
     - ``CloudProviderIntegrations`` is a list of Cloud Provider Integration configured for the current Project.
     - false

   * -  ``connectionSecretRef``
     - object
     - ``ConnectionSecret`` is the name of the Kubernetes Secret which contains the information about the way to connect to
       Atlas (organization ``ID``, ``API`` keys). The default Operator connection configuration will be used if not provided.
     - false

   * -  ``customRoles``
     - []object
     - ``CustomRoles`` lets you create and change custom roles in your cluster.
       Use custom roles to specify custom sets of actions that the Atlas built-in roles can't describe.
       Deprecated: Migrate to the ``AtlasCustomRoles`` custom resource in accordance with the migration guide
       at https://www.mongodb.com/docs/atlas/operator/current/migrate-parameter-to-resource/#std-label-ak8so-migrate-ptr
     - false

   * -  ``encryptionAtRest``
     - object
     - ``EncryptionAtRest`` allows to set encryption for ``AWS``, Azure and ``GCP`` providers.
     - false

   * -  ``integrations``
     - []object
     - Integrations is a list of ``MongoDB`` Atlas ``integrations`` for the project.
       Deprecated: Migrate to the ``AtlasThirdPartyIntegration`` custom resource in accordance with the migration guide
       at https://www.mongodb.com/docs/atlas/operator/current/migrate-parameter-to-resource/#std-label-ak8so-migrate-ptr
     - false

   * -  ``maintenanceWindow``
     - object
     - ``MaintenanceWindow`` allows to specify a preferred time in the week to run maintenance operations. See more
       information at https://www.mongodb.com/docs/atlas/reference/api/maintenance-windows/
     - false

   * -  ``networkPeers``
     - []object
     - ``NetworkPeers`` is a list of Network Peers configured for the current Project.
       Deprecated: Migrate to the ``AtlasNetworkPeering`` and ``AtlasNetworkContainer`` custom resources in accordance with
       the migration guide at https://www.mongodb.com/docs/atlas/operator/current/migrate-parameter-to-resource/#std-label-ak8so-migrate-ptr
     - false

   * -  ``privateEndpoints``
     - []object
     - ``PrivateEndpoints`` is a list of Private Endpoints configured for the current Project.
       Deprecated: Migrate to the ``AtlasPrivateEndpoint`` Custom Resource in accordance with the migration guide
       at https://www.mongodb.com/docs/atlas/operator/current/migrate-parameter-to-resource/#std-label-ak8so-migrate-ptr
     - false

   * -  ``projectIpAccessList``
     - []object
     - ``ProjectIPAccessList`` allows the use of the ``IP`` Access List for a Project. See more information at
       https://docs.atlas.mongodb.com/reference/api/ip-access-list/add-entries-to-access-list/
       Deprecated: Migrate to the ``AtlasIPAccessList`` Custom Resource in accordance with the migration guide
       at https://www.mongodb.com/docs/atlas/operator/current/migrate-parameter-to-resource/#std-label-ak8so-migrate-ptr
     - false

   * -  ``regionUsageRestrictions``
     - enum
     - ``RegionUsageRestrictions`` designate the project's ``AWS`` region when using Atlas for Government.
       This parameter should not be used with commercial Atlas.
       In Atlas for Government, not setting this field (defaulting to ``NONE``) means the project is restricted to ``COMMERCIAL_FEDRAMP_REGIONS_ONLY``.
       *Enum*: ``NONE``, ``GOV_REGIONS_ONLY``, ``COMMERCIAL_FEDRAMP_REGIONS_ONLY``
       *Default*: ``NONE``
     - false

   * -  ``settings``
     - object
     - Settings allows the configuration of the Project Settings.
     - false

   * -  ``teams``
     - []object
     - Teams enable you to grant project access roles to multiple users.
     - false

   * -  ``withDefaultAlertsSettings``
     - boolean
     - Flag that indicates whether Atlas Kubernetes Operator creates a project with the default alert configurations.
       If you use this setting, you must also set spec.``alertConfigurationSyncEnabled`` to true for Atlas Kubernetes
       Operator to modify project alert configurations.
       If you set this parameter to false when you create a project, Atlas doesn't add the default alert configurations
       to your project.
       This setting has no effect on existing projects.
       *Default*: true
     - false

   * -  ``x509CertRef``
     - object
     - X509CertRef is a reference to the Kubernetes Secret which contains ``PEM``-encoded ``CA`` certificate.
       Atlas Kubernetes Operator watches secrets only with the label atlas.mongodb.com/type=credentials to avoid
       watching unnecessary secrets.
     - false

.. _atlasproject-spec-alertconfigurations: 

AtlasProject.spec.alertConfigurations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``enabled``
     - boolean
     - If omitted, the configuration is disabled.
     - false

   * -  ``eventTypeName``
     - string
     - The type of event that will trigger an alert.
     - false

   * -  ``matchers``
     - []object
     - You can filter using the ``matchers`` array only when the ``EventTypeName`` specifies an event for a host, replica set, or sharded cluster.
     - false

   * -  ``metricThreshold``
     - object
     - ``MetricThreshold`` causes an alert to be triggered.
     - false

   * -  ``notifications``
     - []object
     - Notifications are sending when an alert condition is detected.
     - false

   * -  ``severityOverride``
     - enum
     - ``SeverityOverride`` optionally overrides the default severity level for an alert.
       *Enum*: ``INFO``, ``WARNING``, ``ERROR``, ``CRITICAL``
     - false

   * -  ``threshold``
     - object
     - Threshold causes an alert to be triggered.
     - false

.. _atlasproject-spec-alertconfigurations-matchers: 

AtlasProject.spec.alertConfigurations.matchers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``fieldName``
     - string
     - Name of the field in the target object to match on.
     - false

   * -  ``operator``
     - string
     - The ``operator`` to test the field’s value.
     - false

   * -  ``value``
     - string
     - Value to test with the specified operator.
     - false

.. _atlasproject-spec-alertconfigurations-metricthreshold: 

AtlasProject.spec.alertConfigurations.metricThreshold
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

MetricThreshold  causes an alert to be triggered.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``threshold``
     - string
     - Threshold value outside which an alert will be triggered.
     - true

   * -  ``metricName``
     - string
     - Name of the metric to check.
     - false

   * -  ``mode``
     - string
     - This must be set to ``AVERAGE``. Atlas computes the current metric value as an average.
     - false

   * -  ``operator``
     - string
     - Operator to apply when checking the current metric value against the threshold value.
     - false

   * -  ``units``
     - string
     - The ``units`` for the threshold value.
     - false

.. _atlasproject-spec-alertconfigurations-notifications: 

AtlasProject.spec.alertConfigurations.notifications
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``apiTokenRef``
     - object
     - Secret containing a Slack ``API`` token or Bot token. Populated for the ``SLACK`` notifications type. If the token later becomes invalid, Atlas sends an email to the project owner and eventually removes the token.
     - false

   * -  ``channelName``
     - string
     - Slack channel name. Populated for the ``SLACK`` notifications type.
     - false

   * -  ``datadogAPIKeyRef``
     - object
     - Secret containing a Datadog ``API`` Key. Found in the Datadog dashboard. Populated for the ``DATADOG`` notifications type.
     - false

   * -  ``datadogRegion``
     - string
     - Region that indicates which ``API`` ``URL`` to use.
     - false

   * -  ``delayMin``
     - integer
     - Number of minutes to wait after an alert condition is detected before sending out the first notification.
     - false

   * -  ``emailAddress``
     - string
     - Email address to which alert notifications are sent. Populated for the ``EMAIL`` notifications type.
     - false

   * -  ``emailEnabled``
     - boolean
     - Flag indicating if email notifications should be sent. Populated for ``ORG``, ``GROUP``, and ``USER`` notifications types.
     - false

   * -  ``flowName``
     - string
     - Flowdock flow name in lower-case letters.
     - false

   * -  ``flowdockApiTokenRef``
     - object
     - The Flowdock personal ``API`` token. Populated for the ``FLOWDOCK`` notifications type. If the token later becomes invalid, Atlas sends an email to the project owner and eventually removes the token.
     - false

   * -  ``intervalMin``
     - integer
     - Number of minutes to wait between successive notifications for unacknowledged alerts that are not resolved.
     - false

   * -  ``mobileNumber``
     - string
     - Mobile number to which alert notifications are sent. Populated for the ``SMS`` notifications type.
     - false

   * -  ``opsGenieApiKeyRef``
     - object
     - ``OpsGenie`` ``API`` Key. Populated for the ``OPS_GENIE`` notifications type. If the key later becomes invalid, Atlas sends an email to the project owner and eventually removes the token.
     - false

   * -  ``opsGenieRegion``
     - string
     - Region that indicates which ``API`` ``URL`` to use.
     - false

   * -  ``orgName``
     - string
     - Flowdock organization name in lower-case letters. This is the name that appears after www.flowdock.com/app/ in the ``URL`` string. Populated for the ``FLOWDOCK`` notifications type.
     - false

   * -  ``roles``
     - []string
     - The following ``roles`` grant privileges within a project.
     - false

   * -  ``serviceKeyRef``
     - object
     - ``PagerDuty`` service key. Populated for the ``PAGER_DUTY`` notifications type. If the key later becomes invalid, Atlas sends an email to the project owner and eventually removes the key.
     - false

   * -  ``smsEnabled``
     - boolean
     - Flag indicating if text message notifications should be sent. Populated for ``ORG``, ``GROUP``, and ``USER`` notifications types.
     - false

   * -  ``teamId``
     - string
     - Unique identifier of a team.
     - false

   * -  ``teamName``
     - string
     - Label for the team that receives this notification.
     - false

   * -  ``typeName``
     - string
     - Type of alert notification.
     - false

   * -  ``username``
     - string
     - Name of the Atlas user to which to send notifications. Only a user in the project that owns the alert configuration is allowed here. Populated for the ``USER`` notifications type.
     - false

   * -  ``victorOpsSecretRef``
     - object
     - Secret containing a ``VictorOps`` ``API`` key and Routing key. Populated for the ``VICTOR_OPS`` notifications type. If the key later becomes invalid, Atlas sends an email to the project owner and eventually removes the key.
     - false

.. _atlasproject-spec-alertconfigurations-notifications-apitokenref: 

AtlasProject.spec.alertConfigurations.notifications.apiTokenRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Secret containing a Slack API token or Bot token. Populated for the SLACK notifications type. If the token later becomes invalid, Atlas sends an email to the project owner and eventually removes the token.

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

.. _atlasproject-spec-alertconfigurations-notifications-datadogapikeyref: 

AtlasProject.spec.alertConfigurations.notifications.datadogAPIKeyRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Secret containing a Datadog API Key. Found in the Datadog dashboard. Populated for the DATADOG notifications type.

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

.. _atlasproject-spec-alertconfigurations-notifications-flowdockapitokenref: 

AtlasProject.spec.alertConfigurations.notifications.flowdockApiTokenRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Flowdock personal API token. Populated for the FLOWDOCK notifications type. If the token later becomes invalid, Atlas sends an email to the project owner and eventually removes the token.

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

.. _atlasproject-spec-alertconfigurations-notifications-opsgenieapikeyref: 

AtlasProject.spec.alertConfigurations.notifications.opsGenieApiKeyRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

OpsGenie API Key. Populated for the OPS_GENIE notifications type. If the key later becomes invalid, Atlas sends an email to the project owner and eventually removes the token.

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

.. _atlasproject-spec-alertconfigurations-notifications-servicekeyref: 

AtlasProject.spec.alertConfigurations.notifications.serviceKeyRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

PagerDuty service key. Populated for the PAGER_DUTY notifications type. If the key later becomes invalid, Atlas sends an email to the project owner and eventually removes the key.

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

.. _atlasproject-spec-alertconfigurations-notifications-victoropssecretref: 

AtlasProject.spec.alertConfigurations.notifications.victorOpsSecretRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Secret containing a VictorOps API key and Routing key. Populated for the VICTOR_OPS notifications type. If the key later becomes invalid, Atlas sends an email to the project owner and eventually removes the key.

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

.. _atlasproject-spec-alertconfigurations-threshold: 

AtlasProject.spec.alertConfigurations.threshold
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Threshold  causes an alert to be triggered.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``operator``
     - string
     - Operator to apply when checking the current metric value against the threshold value.
       It accepts the following values: ``GREATER_THAN``, ``LESS_THAN``.
     - false

   * -  ``threshold``
     - string
     - Threshold value outside which an alert will be triggered.
     - false

   * -  ``units``
     - string
     - The ``units`` for the threshold value.
     - false

.. _atlasproject-spec-auditing: 

AtlasProject.spec.auditing
~~~~~~~~~~~~~~~~~~~~~~~~~~

Auditing represents MongoDB Maintenance Windows.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``auditAuthorizationSuccess``
     - boolean
     - Indicates whether the auditing system captures successful authentication attempts for audit filters using the "atype" : "``authCheck``" auditing event.
       For more information, see ``auditAuthorizationSuccess``.
     - false

   * -  ``auditFilter``
     - string
     - ``JSON``-formatted audit filter used by the project.
     - false

   * -  ``enabled``
     - boolean
     - Denotes whether the project associated with the {``GROUP``-``ID``} has database auditing enabled.
     - false

.. _atlasproject-spec-backupcompliancepolicyref: 

AtlasProject.spec.backupCompliancePolicyRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

BackupCompliancePolicyRef is a reference to the backup compliance custom resource.

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

.. _atlasproject-spec-cloudprovideraccessroles: 

AtlasProject.spec.cloudProviderAccessRoles
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

CloudProviderAccessRole define an integration to a cloud provider
DEPRECATED: This type is deprecated in favor of CloudProviderIntegration

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``providerName``
     - string
     - ``ProviderName`` is the name of the cloud provider. Currently only ``AWS`` is supported.
     - true

   * -  ``iamAssumedRoleArn``
     - string
     - ``IamAssumedRoleArn`` is the ``ARN`` of the ``IAM`` role that is assumed by the Atlas cluster.
     - false

.. _atlasproject-spec-cloudproviderintegrations: 

AtlasProject.spec.cloudProviderIntegrations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

CloudProviderIntegration define an integration to a cloud provider

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``providerName``
     - string
     - ``ProviderName`` is the name of the cloud provider. Currently only ``AWS`` is supported.
     - true

   * -  ``iamAssumedRoleArn``
     - string
     - ``IamAssumedRoleArn`` is the ``ARN`` of the ``IAM`` role that is assumed by the Atlas cluster.
     - false

.. _atlasproject-spec-connectionsecretref: 

AtlasProject.spec.connectionSecretRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ConnectionSecret is the name of the Kubernetes Secret which contains the information about the way to connect to
Atlas (organization ID, API keys). The default Operator connection configuration will be used if not provided.

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

.. _atlasproject-spec-customroles: 

AtlasProject.spec.customRoles
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

CustomRole lets you create and change a custom role in your cluster.
Use custom roles to specify custom sets of actions that the Atlas built-in roles can't describe.
Deprecated: Migrate to the AtlasCustomRoles custom resource in accordance with the migration guide
at https://www.mongodb.com/docs/atlas/operator/current/migrate-parameter-to-resource/#std-label-ak8so-migrate-ptr

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Human-readable label that identifies the role. This ``name`` must be unique for this custom role in this project.
     - true

   * -  ``actions``
     - []object
     - List of the individual privilege ``actions`` that the role grants.
     - false

   * -  ``inheritedRoles``
     - []object
     - List of the built-in roles that this custom role inherits.
     - false

.. _atlasproject-spec-customroles-actions: 

AtlasProject.spec.customRoles.actions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Human-readable label that identifies the privilege action.
     - true

   * -  ``resources``
     - []object
     - List of ``resources`` on which you grant the action.
     - true

.. _atlasproject-spec-customroles-actions-resources: 

AtlasProject.spec.customRoles.actions.resources
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``cluster``
     - boolean
     - Flag that indicates whether to grant the action on the ``cluster`` resource. If true, ``MongoDB`` Cloud ignores Database and Collection parameters.
     - false

   * -  ``collection``
     - string
     - Human-readable label that identifies the ``collection`` on which you grant the action to one ``MongoDB`` user.
     - false

   * -  ``database``
     - string
     - Human-readable label that identifies the ``database`` on which you grant the action to one ``MongoDB`` user.
     - false

.. _atlasproject-spec-customroles-inheritedroles: 

AtlasProject.spec.customRoles.inheritedRoles
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``database``
     - string
     - Human-readable label that identifies the ``database`` on which someone grants the action to one ``MongoDB`` user.
     - true

   * -  ``name``
     - string
     - Human-readable label that identifies the role inherited.
     - true

.. _atlasproject-spec-encryptionatrest: 

AtlasProject.spec.encryptionAtRest
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

EncryptionAtRest allows to set encryption for AWS, Azure and GCP providers.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``awsKms``
     - object
     - ``AwsKms`` specifies ``AWS`` ``KMS`` configuration details and whether Encryption at Rest is enabled for an Atlas project.
     - false

   * -  ``azureKeyVault``
     - object
     - ``AzureKeyVault`` specifies Azure Key Vault configuration details and whether Encryption at Rest is enabled for an Atlas project.
     - false

   * -  ``googleCloudKms``
     - object
     - ``GoogleCloudKms`` specifies ``GCP`` ``KMS`` configuration details and whether Encryption at Rest is enabled for an Atlas project.
     - false

.. _atlasproject-spec-encryptionatrest-awskms: 

AtlasProject.spec.encryptionAtRest.awsKms
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

AwsKms specifies AWS KMS configuration details and whether Encryption at Rest is enabled for an Atlas project.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``enabled``
     - boolean
     - Specifies whether Encryption at Rest is ``enabled`` for an Atlas project.
       To disable Encryption at Rest, pass only this parameter with a value of false. When you disable Encryption at Rest, Atlas also removes the configuration details.
     - false

   * -  ``region``
     - string
     - The ``AWS`` ``region`` in which the ``AWS`` customer master key exists.
     - false

   * -  ``secretRef``
     - object
     - A reference to as Secret containing the ``AccessKeyID``, ``SecretAccessKey``, ``CustomerMasterKeyID`` and ``RoleID`` fields
     - false

   * -  ``valid``
     - boolean
     - Specifies whether the encryption key set for the provider is ``valid`` and may be used to encrypt and decrypt data.
     - false

.. _atlasproject-spec-encryptionatrest-awskms-secretref: 

AtlasProject.spec.encryptionAtRest.awsKms.secretRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A reference to as Secret containing the AccessKeyID, SecretAccessKey, CustomerMasterKeyID and RoleID fields

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

.. _atlasproject-spec-encryptionatrest-azurekeyvault: 

AtlasProject.spec.encryptionAtRest.azureKeyVault
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

AzureKeyVault specifies Azure Key Vault configuration details and whether Encryption at Rest is enabled for an Atlas project.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``azureEnvironment``
     - string
     - The Azure environment where the Azure account credentials reside. Valid values are the following: ``AZURE``, ``AZURE_CHINA``, ``AZURE_GERMANY``
     - false

   * -  ``clientID``
     - string
     - The Client ``ID``, also known as the application ``ID``, for an Azure application associated with the Azure ``AD`` tenant.
     - false

   * -  ``enabled``
     - boolean
     - Specifies whether Encryption at Rest is ``enabled`` for an Atlas project.
       To disable Encryption at Rest, pass only this parameter with a value of false. When you disable Encryption at Rest, Atlas also removes the configuration details.
     - false

   * -  ``resourceGroupName``
     - string
     - The name of the Azure Resource group that contains an Azure Key Vault.
     - false

   * -  ``secretRef``
     - object
     - A reference to as Secret containing the ``SubscriptionID``, ``KeyVaultName``, ``KeyIdentifier``, Secret fields
     - false

   * -  ``tenantID``
     - string
     - The unique identifier for an Azure ``AD`` tenant within an Azure subscription.
     - false

.. _atlasproject-spec-encryptionatrest-azurekeyvault-secretref: 

AtlasProject.spec.encryptionAtRest.azureKeyVault.secretRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A reference to as Secret containing the SubscriptionID, KeyVaultName, KeyIdentifier, Secret fields

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

.. _atlasproject-spec-encryptionatrest-googlecloudkms: 

AtlasProject.spec.encryptionAtRest.googleCloudKms
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

GoogleCloudKms specifies GCP KMS configuration details and whether Encryption at Rest is enabled for an Atlas project.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``enabled``
     - boolean
     - Specifies whether Encryption at Rest is ``enabled`` for an Atlas project.
       To disable Encryption at Rest, pass only this parameter with a value of false. When you disable Encryption at Rest, Atlas also removes the configuration details.
     - false

   * -  ``secretRef``
     - object
     - A reference to as Secret containing the ``ServiceAccountKey``, ``KeyVersionResourceID`` fields
     - false

.. _atlasproject-spec-encryptionatrest-googlecloudkms-secretref: 

AtlasProject.spec.encryptionAtRest.googleCloudKms.secretRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A reference to as Secret containing the ServiceAccountKey, KeyVersionResourceID fields

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

.. _atlasproject-spec-integrations: 

AtlasProject.spec.integrations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Integration for the project between Atlas and a third party service.
Deprecated: Migrate to the AtlasThirdPartyIntegration custom resource in accordance with the migration guide
at https://www.mongodb.com/docs/atlas/operator/current/migrate-parameter-to-resource/#std-label-ak8so-migrate-ptr

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``accountId``
     - string
     - Unique 40-hexadecimal digit string that identifies your New Relic account.
     - false

   * -  ``apiKeyRef``
     - object
     - Reference to a Kubernetes Secret containing your ``API`` Key for Datadog, ``OpsGenie`` or Victor Ops.
     - false

   * -  ``apiTokenRef``
     - object
     - Reference to a Kubernetes Secret containing the Key that allows Atlas to access your Slack account.
     - false

   * -  ``channelName``
     - string
     - Name of the Slack channel to which Atlas sends alert notifications.
     - false

   * -  ``enabled``
     - boolean
     - Flag that indicates whether someone has activated the Prometheus integration.
     - false

   * -  ``flowName``
     - string
     - ``DEPRECATED``: Flowdock flow name.
       This field has been removed from Atlas, and has no effect.
     - false

   * -  ``licenseKeyRef``
     - object
     - Reference to a Kubernetes Secret containing your Unique 40-hexadecimal digit string that identifies your New Relic license.
     - false

   * -  ``microsoftTeamsWebhookUrl``
     - string
     - Endpoint web address of the Microsoft Teams webhook to which Atlas sends notifications.
     - false

   * -  ``name``
     - string
     -  
     - false

   * -  ``orgName``
     - string
     - ``DEPRECATED``: Flowdock organization name.
       This field has been removed from Atlas, and has no effect.
     - false

   * -  ``passwordRef``
     - object
     - Reference to a Kubernetes Secret containing the password to allow Atlas to access your Prometheus account.
     - false

   * -  ``readTokenRef``
     - object
     - Reference to a Kubernetes Secret containing the query key associated with your New Relic account.
     - false

   * -  ``region``
     - string
     - Region code indicating which regional ``API`` Atlas uses to access ``PagerDuty``, Datadog, or ``OpsGenie``.
     - false

   * -  ``routingKeyRef``
     - object
     - Reference to a Kubernetes Secret containing the Routing key associated with your Splunk On-Call account.
       Used for Victor Ops.
     - false

   * -  ``scheme``
     - string
     -  
     - false

   * -  ``secretRef``
     - object
     - Reference to a Kubernetes Secret containing the secret for your Webhook.
     - false

   * -  ``serviceDiscovery``
     - string
     - Desired method to discover the Prometheus service.
     - false

   * -  ``serviceKeyRef``
     - object
     - Reference to a Kubernetes Secret containing the service key associated with your ``PagerDuty`` account.
     - false

   * -  ``teamName``
     - string
     - Human-readable label that identifies your Slack team.
     - false

   * -  ``type``
     - enum
     - Third Party Integration ``type`` such as Slack, New Relic, etc.
       Each integration ``type`` requires a distinct set of configuration fields.
       For example, if you set ``type`` to ``DATADOG``, you must configure only datadog subfields.
       *Enum*: ``PAGER_DUTY``, ``SLACK``, ``DATADOG``, ``NEW_RELIC``, ``OPS_GENIE``, ``VICTOR_OPS``, ``FLOWDOCK``, ``WEBHOOK``, ``MICROSOFT_TEAMS``, ``PROMETHEUS``
     - false

   * -  ``url``
     - string
     - Endpoint web address to which Atlas sends notifications.
       Used for Webhooks.
     - false

   * -  ``username``
     - string
     - Human-readable label that identifies your Prometheus incoming webhook.
     - false

   * -  ``writeTokenRef``
     - object
     - Reference to a Kubernetes Secret containing the insert key associated with your New Relic account.
     - false

.. _atlasproject-spec-integrations-apikeyref: 

AtlasProject.spec.integrations.apiKeyRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Reference to a Kubernetes Secret containing your API Key for Datadog, OpsGenie or Victor Ops.

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

.. _atlasproject-spec-integrations-apitokenref: 

AtlasProject.spec.integrations.apiTokenRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Reference to a Kubernetes Secret containing the Key that allows Atlas to access your Slack account.

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

.. _atlasproject-spec-integrations-licensekeyref: 

AtlasProject.spec.integrations.licenseKeyRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Reference to a Kubernetes Secret containing your Unique 40-hexadecimal digit string that identifies your New Relic license.

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

.. _atlasproject-spec-integrations-passwordref: 

AtlasProject.spec.integrations.passwordRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Reference to a Kubernetes Secret containing the password to allow Atlas to access your Prometheus account.

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

.. _atlasproject-spec-integrations-readtokenref: 

AtlasProject.spec.integrations.readTokenRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Reference to a Kubernetes Secret containing the query key associated with your New Relic account.

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

.. _atlasproject-spec-integrations-routingkeyref: 

AtlasProject.spec.integrations.routingKeyRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Reference to a Kubernetes Secret containing the Routing key associated with your Splunk On-Call account.
Used for Victor Ops.

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

.. _atlasproject-spec-integrations-secretref: 

AtlasProject.spec.integrations.secretRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Reference to a Kubernetes Secret containing the secret for your Webhook.

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

.. _atlasproject-spec-integrations-servicekeyref: 

AtlasProject.spec.integrations.serviceKeyRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Reference to a Kubernetes Secret containing the service key associated with your PagerDuty account.

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

.. _atlasproject-spec-integrations-writetokenref: 

AtlasProject.spec.integrations.writeTokenRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Reference to a Kubernetes Secret containing the insert key associated with your New Relic account.

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

.. _atlasproject-spec-maintenancewindow: 

AtlasProject.spec.maintenanceWindow
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

MaintenanceWindow allows to specify a preferred time in the week to run maintenance operations. See more
information at https://www.mongodb.com/docs/atlas/reference/api/maintenance-windows/

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``autoDefer``
     - boolean
     - Flag indicating whether any scheduled project maintenance should be deferred automatically for one week.
     - false

   * -  ``dayOfWeek``
     - integer
     - Day of the week when you would like the maintenance window to start as a 1-based integer.
       Sunday 1, Monday 2, Tuesday 3, Wednesday 4, Thursday 5, Friday 6, Saturday 7.
       *Minimum*: 1
       *Maximum*: 7
     - false

   * -  ``defer``
     - boolean
     - Flag indicating whether the next scheduled project maintenance should be deferred for one week.
       Cannot be specified if ``startASAP`` is true
     - false

   * -  ``hourOfDay``
     - integer
     - Hour of the day when you would like the maintenance window to start.
       This parameter uses the 24-hour clock, where midnight is 0, noon is 12.
       *Minimum*: 0
       *Maximum*: 23
     - false

   * -  ``startASAP``
     - boolean
     - Flag indicating whether project maintenance has been directed to start immediately.
       Cannot be specified if defer is true
     - false

.. _atlasproject-spec-networkpeers: 

AtlasProject.spec.networkPeers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

NetworkPeer configured for the current Project.
Deprecated: Migrate to the AtlasNetworkPeering and AtlasNetworkContainer custom resources in accordance with
the migration guide at https://www.mongodb.com/docs/atlas/operator/current/migrate-parameter-to-resource/#std-label-ak8so-migrate-ptr

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``accepterRegionName``
     - string
     - ``AccepterRegionName`` is the provider region name of user's ``VPC``.
     - false

   * -  ``atlasCidrBlock``
     - string
     - Atlas ``CIDR``. It needs to be set if ``ContainerID`` is not set.
     - false

   * -  ``awsAccountId``
     - string
     - ``AccountID`` of the user's ``VPC``.
     - false

   * -  ``azureDirectoryId``
     - string
     - ``AzureDirectoryID`` is the unique identifier for an Azure ``AD`` directory.
     - false

   * -  ``azureSubscriptionId``
     - string
     - ``AzureSubscriptionID`` is the unique identifier of the Azure subscription in which the VNet resides.
     - false

   * -  ``containerId``
     - string
     - ``ID`` of the network peer container. If not set, operator will create a new container with ``ContainerRegion`` and ``AtlasCIDRBlock`` input.
     - false

   * -  ``containerRegion``
     - string
     - ``ContainerRegion`` is the provider region name of Atlas network peer container. If not set, ``AccepterRegionName`` is used.
     - false

   * -  ``gcpProjectId``
     - string
     - User ``GCP`` Project ``ID``. Its applicable only for ``GCP``.
     - false

   * -  ``networkName``
     - string
     - ``GCP`` Network Peer Name. Its applicable only for ``GCP``.
     - false

   * -  ``providerName``
     - string
     - ``ProviderName`` is the name of the provider. If not set, it will be set to "``AWS``".
     - false

   * -  ``resourceGroupName``
     - string
     - ``ResourceGroupName`` is the name of your Azure resource group.
     - false

   * -  ``routeTableCidrBlock``
     - string
     - User ``VPC`` ``CIDR``.
     - false

   * -  ``vnetName``
     - string
     - VNetName is name of your Azure VNet. Its applicable only for Azure.
     - false

   * -  ``vpcId``
     - string
     - ``AWS`` ``VPC`` ``ID``.
     - false

.. _atlasproject-spec-privateendpoints: 

AtlasProject.spec.privateEndpoints
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

PrivateEndpoint is a list of Private Endpoints configured for the current Project.
Deprecated: Migrate to the AtlasPrivateEndpoint Custom Resource in accordance with the migration guide
at https://www.mongodb.com/docs/atlas/operator/current/migrate-parameter-to-resource/#std-label-ak8so-migrate-ptr

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``provider``
     - enum
     - Cloud ``provider`` for which you want to retrieve a private endpoint service. Atlas accepts ``AWS``, ``GCP``, or ``AZURE``.
       *Enum*: ``AWS``, ``GCP``, ``AZURE``, ``TENANT``
     - true

   * -  ``region``
     - string
     - Cloud provider ``region`` for which you want to create the private endpoint service.
     - true

   * -  ``endpointGroupName``
     - string
     - Unique identifier of the endpoint group. The endpoint group encompasses all the endpoints that you created in Google Cloud.
     - false

   * -  ``endpoints``
     - []object
     - Collection of individual private ``endpoints`` that comprise your endpoint group.
     - false

   * -  ``gcpProjectId``
     - string
     - Unique identifier of the Google Cloud project in which you created your endpoints.
     - false

   * -  ``id``
     - string
     - Unique identifier of the private endpoint you created in your ``AWS`` ``VPC`` or Azure VNet.
     - false

   * -  ``ip``
     - string
     - Private ``IP`` address of the private endpoint network interface you created in your Azure VNet.
     - false

.. _atlasproject-spec-privateendpoints-endpoints: 

AtlasProject.spec.privateEndpoints.endpoints
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``endpointName``
     - string
     - Forwarding rule that corresponds to the endpoint you created in Google Cloud.
     - false

   * -  ``ipAddress``
     - string
     - Private ``IP`` address of the endpoint you created in Google Cloud.
     - false

.. _atlasproject-spec-projectipaccesslist: 

AtlasProject.spec.projectIpAccessList
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

IPAccessList allows the use of the IP Access List for a Project. See more information at
https://docs.atlas.mongodb.com/reference/api/ip-access-list/add-entries-to-access-list/
Deprecated: Migrate to the AtlasIPAccessList Custom Resource in accordance with the migration guide
at https://www.mongodb.com/docs/atlas/operator/current/migrate-parameter-to-resource/#std-label-ak8so-migrate-ptr

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``awsSecurityGroup``
     - string
     - Unique identifier of ``AWS`` security group in this access list entry.
     - false

   * -  ``cidrBlock``
     - string
     - Range of ``IP`` addresses in ``CIDR`` notation in this access list entry.
     - false

   * -  ``comment``
     - string
     - Comment associated with this access list entry.
     - false

   * -  ``deleteAfterDate``
     - string
     - Timestamp in ``ISO`` 8601 date and time format in ``UTC`` after which Atlas deletes the temporary access list entry.
     - false

   * -  ``ipAddress``
     - string
     - Entry using an ``IP`` address in this access list entry.
     - false

.. _atlasproject-spec-settings: 

AtlasProject.spec.settings
~~~~~~~~~~~~~~~~~~~~~~~~~~

Settings allows the configuration of the Project Settings.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``isCollectDatabaseSpecificsStatisticsEnabled``
     - boolean
     - Flag that indicates whether to collect database-specific metrics for the specified project.
     - false

   * -  ``isDataExplorerEnabled``
     - boolean
     - Flag that indicates whether to enable the Data Explorer for the specified project.
     - false

   * -  ``isExtendedStorageSizesEnabled``
     - boolean
     - Flag that indicates whether to enable extended storage sizes for the specified project.
     - false

   * -  ``isPerformanceAdvisorEnabled``
     - boolean
     - Flag that indicates whether to enable the Performance Advisor and Profiler for the specified project.
     - false

   * -  ``isRealtimePerformancePanelEnabled``
     - boolean
     - Flag that indicates whether to enable the Real Time Performance Panel for the specified project.
     - false

   * -  ``isSchemaAdvisorEnabled``
     - boolean
     - Flag that indicates whether to enable the Schema Advisor for the specified project.
     - false

.. _atlasproject-spec-teams: 

AtlasProject.spec.teams
~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``roles``
     - []enum
     - Roles the users in the team has within the project.
       *Enum*: ``GROUP_OWNER``, ``GROUP_CLUSTER_MANAGER``, ``GROUP_DATA_ACCESS_ADMIN``, ``GROUP_DATA_ACCESS_READ_WRITE``, ``GROUP_DATA_ACCESS_READ_ONLY``, ``GROUP_READ_ONLY``
     - true

   * -  ``teamRef``
     - object
     - Reference to the ``AtlasTeam`` custom resource which will be assigned to the project.
     - true

.. _atlasproject-spec-teams-teamref: 

AtlasProject.spec.teams.teamRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Reference to the AtlasTeam custom resource which will be assigned to the project.

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

.. _atlasproject-spec-x509certref: 

AtlasProject.spec.x509CertRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

X509CertRef is a reference to the Kubernetes Secret which contains PEM-encoded CA certificate.
Atlas Kubernetes Operator watches secrets only with the label atlas.mongodb.com/type=credentials to avoid
watching unnecessary secrets.

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

.. _atlasproject-status: 

AtlasProject.status
~~~~~~~~~~~~~~~~~~~

AtlasProjectStatus defines the observed state of AtlasProject

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``conditions``
     - []object
     - Conditions is the list of statuses showing the current state of the Atlas Custom Resource
     - true

   * -  ``alertConfigurations``
     - []object
     - ``AlertConfigurations`` contains a list of alert configuration statuses
     - false

   * -  ``authModes``
     - []string
     - ``AuthModes`` contains a list of configured authentication modes
       "``SCRAM``" is default authentication method and requires a password for each user
       "``X509``" signifies that self-managed X.509 authentication is configured
     - false

   * -  ``cloudProviderIntegrations``
     - []object
     - ``CloudProviderIntegrations`` contains a list of configured cloud provider access roles. ``AWS`` support only
     - false

   * -  ``customRoles``
     - []object
     - ``CustomRoles`` contains a list of custom roles statuses
     - false

   * -  ``expiredIpAccessList``
     - []object
     - The list of ``IP`` Access List entries that are expired due to '``deleteAfterDate``' being less than the current date.
       Note, that this field is updated by the Atlas Operator only after specification changes
     - false

   * -  ``id``
     - string
     - The ``ID`` of the Atlas Project
     - false

   * -  ``networkPeers``
     - []object
     - The list of network peers that are configured for current project
     - false

   * -  ``observedGeneration``
     - integer
     - ``ObservedGeneration`` indicates the generation of the resource specification of which the Atlas Operator is aware.
       The Atlas Operator updates this field to the value of 'metadata.generation' as soon as it starts reconciliation of the resource.
       *Format*: int64
     - false

   * -  ``privateEndpoints``
     - []object
     - The list of private endpoints configured for current project
     - false

   * -  ``prometheus``
     - object
     - Prometheus contains the status for Prometheus integration
       including the ``prometheusDiscoveryURL``
     - false

   * -  ``teams``
     - []object
     - Teams contains a list of ``teams`` assignment statuses
     - false

.. _atlasproject-status-conditions: 

AtlasProject.status.conditions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Condition describes the state of an Atlas Custom Resource at a certain point.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``status``
     - string
     - Status of the condition; one of True, False, Unknown.
     - true

   * -  ``type``
     - string
     - Type of Atlas Custom Resource condition.
     - true

   * -  ``lastTransitionTime``
     - string
     - Last time the condition transitioned from one status to another.
       Represented in ``ISO`` 8601 format.
       *Format*: date-time
     - false

   * -  ``message``
     - string
     - A ``message`` providing details about the transition.
     - false

   * -  ``reason``
     - string
     - The ``reason`` for the condition's last transition.
     - false

.. _atlasproject-status-alertconfigurations: 

AtlasProject.status.alertConfigurations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``acknowledgedUntil``
     - string
     - The date through which the alert has been acknowledged. Will not be present if the alert has never been acknowledged.
     - false

   * -  ``acknowledgementComment``
     - string
     - The comment left by the user who acknowledged the alert. Will not be present if the alert has never been acknowledged.
     - false

   * -  ``acknowledgingUsername``
     - string
     - The username of the user who acknowledged the alert. Will not be present if the alert has never been acknowledged.
     - false

   * -  ``alertConfigId``
     - string
     - ``ID`` of the alert configuration that triggered this alert.
     - false

   * -  ``clusterId``
     - string
     - The ``ID`` of the cluster to which this alert applies. Only present for alerts of type ``BACKUP``, ``REPLICA_SET``, and ``CLUSTER``.
     - false

   * -  ``clusterName``
     - string
     - The name the cluster to which this alert applies. Only present for alerts of type ``BACKUP``, ``REPLICA_SET``, and ``CLUSTER``.
     - false

   * -  ``created``
     - string
     - Timestamp in ``ISO`` 8601 date and time format in ``UTC`` when this alert configuration was created.
     - false

   * -  ``currentValue``
     - object
     - ``CurrentValue`` represents current value of the metric that triggered the alert. Only present for alerts of type ``HOST_METRIC``.
     - false

   * -  ``enabled``
     - boolean
     - If omitted, the configuration is disabled.
     - false

   * -  ``errorMessage``
     - string
     - ``ErrorMessage`` is massage if the alert configuration is in an incorrect state.
     - false

   * -  ``eventTypeName``
     - string
     - The type of event that will trigger an alert.
     - false

   * -  ``groupId``
     - string
     - Unique identifier of the project that owns this alert configuration.
     - false

   * -  ``hostId``
     - string
     - ``ID`` of the host to which the metric pertains. Only present for alerts of type ``HOST``, ``HOST_METRIC``, and ``REPLICA_SET``.
     - false

   * -  ``hostnameAndPort``
     - string
     - The hostname and port of each host to which the alert applies. Only present for alerts of type ``HOST``, ``HOST_METRIC``, and ``REPLICA_SET``.
     - false

   * -  ``id``
     - string
     - Unique identifier.
     - false

   * -  ``lastNotified``
     - string
     - When the last notification was sent for this alert. Only present if notifications have been sent.
     - false

   * -  ``matchers``
     - []object
     - You can filter using the ``matchers`` array only when the ``EventTypeName`` specifies an event for a host, replica set, or sharded cluster.
     - false

   * -  ``metricName``
     - string
     - The name of the measurement whose value went outside the threshold. Only present if ``eventTypeName`` is set to ``OUTSIDE_METRIC_THRESHOLD``.
     - false

   * -  ``metricThreshold``
     - object
     - ``MetricThreshold`` causes an alert to be triggered.
     - false

   * -  ``notifications``
     - []object
     - Notifications are sending when an alert condition is detected.
     - false

   * -  ``replicaSetName``
     - string
     - Name of the replica set. Only present for alerts of type ``HOST``, ``HOST_METRIC``, ``BACKUP``, and ``REPLICA_SET``.
     - false

   * -  ``resolved``
     - string
     - When the alert was closed. Only present if the status is ``CLOSED``.
     - false

   * -  ``severityOverride``
     - string
     - Severity of the alert.
     - false

   * -  ``sourceTypeName``
     - string
     - For alerts of the type ``BACKUP``, the type of server being backed up.
     - false

   * -  ``status``
     - string
     - The current state of the alert. Possible values are: ``TRACKING``, ``OPEN``, ``CLOSED``, ``CANCELED``
     - false

   * -  ``threshold``
     - object
     - Threshold causes an alert to be triggered.
     - false

   * -  ``updated``
     - string
     - Timestamp in ``ISO`` 8601 date and time format in ``UTC`` when this alert configuration was last updated.
     - false

.. _atlasproject-status-alertconfigurations-currentvalue: 

AtlasProject.status.alertConfigurations.currentValue
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

CurrentValue represents current value of the metric that triggered the alert. Only present for alerts of type HOST_METRIC.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``number``
     - string
     - The value of the metric.
     - false

   * -  ``units``
     - string
     - The ``units`` for the value. Depends on the type of metric.
     - false

.. _atlasproject-status-alertconfigurations-matchers: 

AtlasProject.status.alertConfigurations.matchers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``fieldName``
     - string
     - Name of the field in the target object to match on.
     - false

   * -  ``operator``
     - string
     - The ``operator`` to test the field’s value.
     - false

   * -  ``value``
     - string
     - Value to test with the specified operator.
     - false

.. _atlasproject-status-alertconfigurations-metricthreshold: 

AtlasProject.status.alertConfigurations.metricThreshold
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

MetricThreshold  causes an alert to be triggered.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``threshold``
     - string
     - Threshold value outside which an alert will be triggered.
     - true

   * -  ``metricName``
     - string
     - Name of the metric to check.
     - false

   * -  ``mode``
     - string
     - This must be set to ``AVERAGE``. Atlas computes the current metric value as an average.
     - false

   * -  ``operator``
     - string
     - Operator to apply when checking the current metric value against the threshold value.
     - false

   * -  ``units``
     - string
     - The ``units`` for the threshold value.
     - false

.. _atlasproject-status-alertconfigurations-notifications: 

AtlasProject.status.alertConfigurations.notifications
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``apiToken``
     - string
     - Slack ``API`` token or Bot token. Populated for the ``SLACK`` notifications type. If the token later becomes invalid, Atlas sends an email to the project owner and eventually removes the token.
     - false

   * -  ``channelName``
     - string
     - Slack channel name. Populated for the ``SLACK`` notifications type.
     - false

   * -  ``datadogApiKey``
     - string
     - Datadog ``API`` Key. Found in the Datadog dashboard. Populated for the ``DATADOG`` notifications type.
     - false

   * -  ``datadogRegion``
     - string
     - Region that indicates which ``API`` ``URL`` to use
     - false

   * -  ``delayMin``
     - integer
     - Number of minutes to wait after an alert condition is detected before sending out the first notification.
     - false

   * -  ``emailAddress``
     - string
     - Email address to which alert notifications are sent. Populated for the ``EMAIL`` notifications type.
     - false

   * -  ``emailEnabled``
     - boolean
     - Flag indicating if email notifications should be sent. Populated for ``ORG``, ``GROUP``, and ``USER`` notifications types.
     - false

   * -  ``flowName``
     - string
     - Flowdock flow namse in lower-case letters.
     - false

   * -  ``flowdockApiToken``
     - string
     - The Flowdock personal ``API`` token. Populated for the ``FLOWDOCK`` notifications type. If the token later becomes invalid, Atlas sends an email to the project owner and eventually removes the token.
     - false

   * -  ``intervalMin``
     - integer
     - Number of minutes to wait between successive notifications for unacknowledged alerts that are not resolved.
     - false

   * -  ``mobileNumber``
     - string
     - Mobile number to which alert notifications are sent. Populated for the ``SMS`` notifications type.
     - false

   * -  ``opsGenieApiKey``
     - string
     - Opsgenie ``API`` Key. Populated for the ``OPS_GENIE`` notifications type. If the key later becomes invalid, Atlas sends an email to the project owner and eventually removes the token.
     - false

   * -  ``opsGenieRegion``
     - string
     - Region that indicates which ``API`` ``URL`` to use.
     - false

   * -  ``orgName``
     - string
     - Flowdock organization name in lower-case letters. This is the name that appears after www.flowdock.com/app/ in the ``URL`` string. Populated for the ``FLOWDOCK`` notifications type.
     - false

   * -  ``roles``
     - []string
     - The following ``roles`` grant privileges within a project.
     - false

   * -  ``serviceKey``
     - string
     - ``PagerDuty`` service key. Populated for the ``PAGER_DUTY`` notifications type. If the key later becomes invalid, Atlas sends an email to the project owner and eventually removes the key.
     - false

   * -  ``smsEnabled``
     - boolean
     - Flag indicating if text message notifications should be sent. Populated for ``ORG``, ``GROUP``, and ``USER`` notifications types.
     - false

   * -  ``teamId``
     - string
     - Unique identifier of a team.
     - false

   * -  ``teamName``
     - string
     - Label for the team that receives this notification.
     - false

   * -  ``typeName``
     - string
     - Type of alert notification.
     - false

   * -  ``username``
     - string
     - Name of the Atlas user to which to send notifications. Only a user in the project that owns the alert configuration is allowed here. Populated for the ``USER`` notifications type.
     - false

   * -  ``victorOpsApiKey``
     - string
     - ``VictorOps`` ``API`` key. Populated for the ``VICTOR_OPS`` notifications type. If the key later becomes invalid, Atlas sends an email to the project owner and eventually removes the key.
     - false

   * -  ``victorOpsRoutingKey``
     - string
     - ``VictorOps`` routing key. Populated for the ``VICTOR_OPS`` notifications type. If the key later becomes invalid, Atlas sends an email to the project owner and eventually removes the key.
     - false

.. _atlasproject-status-alertconfigurations-threshold: 

AtlasProject.status.alertConfigurations.threshold
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Threshold  causes an alert to be triggered.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``operator``
     - string
     - Operator to apply when checking the current metric value against the threshold value. it accepts the following values: ``GREATER_THAN``, ``LESS_THAN``
     - false

   * -  ``threshold``
     - string
     - Threshold value outside which an alert will be triggered.
     - false

   * -  ``units``
     - string
     - The ``units`` for the threshold value
     - false

.. _atlasproject-status-cloudproviderintegrations: 

AtlasProject.status.cloudProviderIntegrations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``atlasAssumedRoleExternalId``
     - string
     - Unique external ``ID`` that ``MongoDB`` Atlas uses when it assumes the ``IAM`` role in your Amazon Web Services account.
     - true

   * -  ``providerName``
     - string
     - Human-readable label that identifies the cloud provider of the role.
     - true

   * -  ``atlasAWSAccountArn``
     - string
     - Amazon Resource Name that identifies the Amazon Web Services user account that ``MongoDB`` Atlas uses when it assumes the Identity and Access Management role.
     - false

   * -  ``authorizedDate``
     - string
     - Date and time when someone authorized this role for the specified cloud service provider. This parameter expresses its value in the ``ISO`` 8601 timestamp format in ``UTC``.
     - false

   * -  ``createdDate``
     - string
     - Date and time when someone created this role for the specified cloud service provider. This parameter expresses its value in the ``ISO`` 8601 timestamp format in ``UTC``.
     - false

   * -  ``errorMessage``
     - string
     - Application error message returned.
     - false

   * -  ``featureUsages``
     - []object
     - List that contains application features associated with this Amazon Web Services Identity and Access Management role.
     - false

   * -  ``iamAssumedRoleArn``
     - string
     - Amazon Resource Name that identifies the Amazon Web Services Identity and Access Management role that ``MongoDB`` Cloud assumes when it accesses resources in your ``AWS`` account.
     - false

   * -  ``roleId``
     - string
     - Unique 24-hexadecimal digit string that identifies the role.
     - false

   * -  ``status``
     - string
     - Provision ``status`` of the service account.
       Values are ``IN_PROGRESS``, ``COMPLETE``, ``FAILED``, or ``NOT_INITIATED``.
     - false

.. _atlasproject-status-cloudproviderintegrations-featureusages: 

AtlasProject.status.cloudProviderIntegrations.featureUsages
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``featureId``
     - string
     - Identifying characteristics about the data lake linked to this Amazon Web Services Identity and Access Management role.
     - false

   * -  ``featureType``
     - string
     - Human-readable label that describes one ``MongoDB`` Cloud feature linked to this Amazon Web Services Identity and Access Management role.
     - false

.. _atlasproject-status-customroles: 

AtlasProject.status.customRoles
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Role ``name`` which is unique
     - true

   * -  ``status``
     - string
     - The ``status`` of the given custom role (``OK`` or ``FAILED``)
     - true

   * -  ``error``
     - string
     - The message when the custom role is in the ``FAILED`` status
     - false

.. _atlasproject-status-expiredipaccesslist: 

AtlasProject.status.expiredIpAccessList
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

IPAccessList allows the use of the IP Access List for a Project. See more information at
https://docs.atlas.mongodb.com/reference/api/ip-access-list/add-entries-to-access-list/
Deprecated: Migrate to the AtlasIPAccessList Custom Resource in accordance with the migration guide
at https://www.mongodb.com/docs/atlas/operator/current/migrate-parameter-to-resource/#std-label-ak8so-migrate-ptr

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``awsSecurityGroup``
     - string
     - Unique identifier of ``AWS`` security group in this access list entry.
     - false

   * -  ``cidrBlock``
     - string
     - Range of ``IP`` addresses in ``CIDR`` notation in this access list entry.
     - false

   * -  ``comment``
     - string
     - Comment associated with this access list entry.
     - false

   * -  ``deleteAfterDate``
     - string
     - Timestamp in ``ISO`` 8601 date and time format in ``UTC`` after which Atlas deletes the temporary access list entry.
     - false

   * -  ``ipAddress``
     - string
     - Entry using an ``IP`` address in this access list entry.
     - false

.. _atlasproject-status-networkpeers: 

AtlasProject.status.networkPeers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``id``
     - string
     - Unique identifier for ``NetworkPeer``.
     - true

   * -  ``providerName``
     - string
     - Cloud provider for which you want to retrieve a network peer.
     - true

   * -  ``region``
     - string
     - Region for which you want to create the network peer. It isn't needed for ``GCP``
     - true

   * -  ``atlasGcpProjectId``
     - string
     - ``ProjectID`` of Atlas container. Applicable only for ``GCP``. It's needed to add network peer connection.
     - false

   * -  ``atlasNetworkName``
     - string
     - Atlas Network Name. Applicable only for ``GCP``. It's needed to add network peer connection.
     - false

   * -  ``connectionId``
     - string
     - Unique identifier of the network peer connection. Applicable only for ``AWS``.
     - false

   * -  ``containerId``
     - string
     - ``ContainerID`` of Atlas network peer container.
     - false

   * -  ``errorMessage``
     - string
     - Error state of the network peer. Applicable only for ``GCP``.
     - false

   * -  ``errorState``
     - string
     - Error state of the network peer. Applicable only for Azure.
     - false

   * -  ``errorStateName``
     - string
     - Error state of the network peer. Applicable only for ``AWS``.
     - false

   * -  ``gcpProjectId``
     - string
     - ``ProjectID`` of the user's vpc. Applicable only for ``GCP``.
     - false

   * -  ``status``
     - string
     - Status of the network peer. Applicable only for ``GCP`` and Azure.
     - false

   * -  ``statusName``
     - string
     - Status of the network peer. Applicable only for ``AWS``.
     - false

   * -  ``vpc``
     - string
     - ``VPC`` is general purpose field for storing the name of the ``VPC``.
       ``VPC`` is ``vpcID`` for ``AWS``, user ``networkName`` for ``GCP``, and ``vnetName`` for Azure.
     - false

.. _atlasproject-status-privateendpoints: 

AtlasProject.status.privateEndpoints
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``provider``
     - string
     - Cloud ``provider`` for which you want to retrieve a private endpoint service. Atlas accepts ``AWS`` or ``AZURE``.
     - true

   * -  ``region``
     - string
     - Cloud provider ``region`` for which you want to create the private endpoint service.
     - true

   * -  ``endpoints``
     - []object
     - Collection of individual ``GCP`` private ``endpoints`` that comprise your network endpoint group.
     - false

   * -  ``id``
     - string
     - Unique identifier for ``AWS`` or ``AZURE`` Private Link Connection.
     - false

   * -  ``interfaceEndpointId``
     - string
     - Unique identifier of the ``AWS`` or Azure Private Link Interface Endpoint.
     - false

   * -  ``serviceAttachmentNames``
     - []string
     - Unique alphanumeric and special character strings that identify the service attachments associated with the ``GCP`` Private Service Connect endpoint service.
     - false

   * -  ``serviceName``
     - string
     - Name of the ``AWS`` or Azure Private Link Service that Atlas manages.
     - false

   * -  ``serviceResourceId``
     - string
     - Unique identifier of the Azure Private Link Service (for ``AWS`` the same as ``ID``).
     - false

.. _atlasproject-status-privateendpoints-endpoints: 

AtlasProject.status.privateEndpoints.endpoints
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``endpointName``
     - string
     - Human-readable label that identifies the Google Cloud consumer forwarding rule that you created.
     - true

   * -  ``ipAddress``
     - string
     - One Private Internet Protocol version 4 (IPv4) address to which this Google Cloud consumer forwarding rule resolves.
     - true

   * -  ``status``
     - string
     - State of the ``MongoDB`` Atlas endpoint group when ``MongoDB`` Cloud received this request.
     - true

.. _atlasproject-status-prometheus: 

AtlasProject.status.prometheus
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Prometheus contains the status for Prometheus integration
including the prometheusDiscoveryURL

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``prometheusDiscoveryURL``
     - string
     - ``URL`` from which Prometheus fetches the targets.
     - false

   * -  ``scheme``
     - string
     - Protocol ``scheme`` used for Prometheus requests.
     - false

.. _atlasproject-status-teams: 

AtlasProject.status.teams
~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``teamRef``
     - object
     - ``ResourceRefNamespaced`` is a reference to a Kubernetes Resource that allows to configure the namespace
     - true

   * -  ``id``
     - string
     -  
     - false

.. _atlasproject-status-teams-teamref: 

AtlasProject.status.teams.teamRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ResourceRefNamespaced is a reference to a Kubernetes Resource that allows to configure the namespace

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
