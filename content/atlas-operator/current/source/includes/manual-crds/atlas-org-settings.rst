.. _atlasorgsettings: 

AtlasOrgSettings
----------------

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
     - ``AtlasOrgSettings``
     - true

   * -  ``metadata``
     - object
     - Refer to the Kubernetes ``API`` documentation for the fields of the ``metadata`` field.
     - true

   * -  ``spec``
     - object
     - ``AtlasOrgSettingsSpec`` defines the desired state of ``AtlasOrgSettings``.
     - false

   * -  ``status``
     - object
     - ``AtlasOrgSettingsStatus`` defines the observed state of ``AtlasOrgSettings``.
     - false

.. _atlasorgsettings-spec: 

AtlasOrgSettings.spec
~~~~~~~~~~~~~~~~~~~~~

AtlasOrgSettingsSpec defines the desired state of AtlasOrgSettings.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``orgID``
     - string
     - ``OrgId`` Unique 24-hexadecimal digit string that identifies the organization that contains your projects.
     - true

   * -  ``apiAccessListRequired``
     - boolean
     - ``ApiAccessListRequired`` Flag that indicates whether to require ``API`` operations to originate from an ``IP`` Address added to the ``API`` access list for the specified organization.
     - false

   * -  ``connectionSecretRef``
     - object
     - ``ConnectionSecretRef`` is the name of the Kubernetes Secret which contains the information about the way to connect to Atlas (Public & Private ``API`` keys).
     - false

   * -  ``genAIFeaturesEnabled``
     - boolean
     - ``GenAIFeaturesEnabled`` Flag that indicates whether this organization has access to generative ``AI`` features. This setting only applies to Atlas Commercial and is enabled by default.
       Once this setting is turned on, Project Owners may be able to enable or disable individual ``AI`` features at the project level.
     - false

   * -  ``maxServiceAccountSecretValidityInHours``
     - integer
     - ``MaxServiceAccountSecretValidityInHours`` Number that represents the maximum period before expiry in hours for new Atlas Admin ``API`` Service Account secrets within the specified organization.
     - false

   * -  ``multiFactorAuthRequired``
     - boolean
     - ``MultiFactorAuthRequired`` Flag that indicates whether to require users to set up Multi-Factor Authentication (``MFA``) before accessing the specified organization.
       To learn more, see: https://www.mongodb.com/docs/atlas/security-multi-factor-authentication/.
     - false

   * -  ``restrictEmployeeAccess``
     - boolean
     - ``RestrictEmployeeAccess`` Flag that indicates whether to block ``MongoDB`` Support from accessing Atlas infrastructure and cluster logs for any deployment in the specified organization without explicit permission.
       Once this setting is turned on, you can grant ``MongoDB`` Support a 24-hour bypass access to the Atlas deployment to resolve support issues.
       To learn more, see: https://www.mongodb.com/docs/atlas/security-restrict-support-access/.
     - false

   * -  ``securityContact``
     - string
     - ``SecurityContact`` String that specifies a single email address for the specified organization to receive security-related notifications.
       Specifying a security contact does not grant them authorization or access to Atlas for security decisions or approvals.
       An empty string is valid and clears the existing security contact (if any).
     - false

   * -  ``streamsCrossGroupEnabled``
     - boolean
     - ``StreamsCrossGroupEnabled`` Flag that indicates whether a group's Atlas Stream Processing instances in this organization can create connections to other group's clusters in the same organization.
     - false

.. _atlasorgsettings-spec-connectionsecretref: 

AtlasOrgSettings.spec.connectionSecretRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ConnectionSecretRef is the name of the Kubernetes Secret which contains the information about the way to connect to Atlas (Public & Private API keys).

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

.. _atlasorgsettings-status: 

AtlasOrgSettings.status
~~~~~~~~~~~~~~~~~~~~~~~

AtlasOrgSettingsStatus defines the observed state of AtlasOrgSettings.

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

.. _atlasorgsettings-status-conditions: 

AtlasOrgSettings.status.conditions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
