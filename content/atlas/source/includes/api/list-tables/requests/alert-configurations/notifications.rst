.. list-table::
   :widths: 20 20 20 55
   :stub-columns: 1

   * - | notifications.[n]
       | .apiToken
     - string
     - Conditional
     - Slack |api| token.

       .. include:: /includes/api/facts/invalid-integration-api-token.rst

       Set this value if you set ``notifications.[n].typeName`` to
       ``SLACK``.

   * - | notifications.[n]
       | .channelName
     - string
     - Conditional
     - Slack channel name.

       Set this value if you set ``notifications.[n].typeName`` to
       ``SLACK``.

   * - | notifications.[n]
       | .datadogApiKey
     - string
     - Conditional
     - Datadog |api| Key. Found in the Datadog dashboard.

       Set this value if you set ``notifications.[n].typeName`` to
       ``DATADOG``.

   * - | notifications.[n]
       | .datadogRegion
     - string
     - Conditional
     - Region that indicates the |api| |url| to use.

       .. include:: /includes/fact-datadog-supported-regions-api.rst

       Set this value if you set ``notifications.[n].typeName`` to
       ``DATADOG``.

   * - | notifications.[n]
       | .delayMin
     - integer
     - Conditional
     - Number of minutes to wait after an alert condition is detected
       before sending out the first notification.

   * - | notifications.[n]
       | .emailAddress
     - string
     - Conditional
     - Email address to which alert notifications are sent.

       Set this value if you set ``notifications.[n].typeName`` to
       ``EMAIL``.

       You don't need to set this value to send emails to specific
       users, users with specific project roles, users with specific
       organization roles, or teams. Use the
       ``notifications.[n].emailEnabled`` parameter for that purpose.

   * - | notifications.[n]
       | .emailEnabled
     - boolean
     - Conditional
     - Flag indicating if email notifications should be sent to this
       user's email address.

       Set this value if you set ``notifications.[n].typeName`` to
       ``GROUP``, ``ORG``, or ``USER``.

   * - | notifications.[n]
       | .intervalMin
     - integer
     - Required
     - Number of minutes to wait between successive notifications for
       unacknowledged alerts that are not resolved. The minimum value
       is ``5``.

       .. include:: /includes/fact-intervalMin-third-party-integrations.rst

   * - | notifications.[n]
       | .mobileNumber
     - string
     - Conditional
     - Mobile number to which alert notifications are sent.

       Set this value if you set ``notifications.[n].typeName`` to
       ``SMS``.

       You don't need to set this value to send emails to specific
       users, users with specific project roles, users with specific
       organization roles, or teams. Use the
       ``notifications.[n].smsEnabled`` parameter for that purpose.

   * - | notifications.[n]
       | .notificationToken
     - string
     - Conditional
     - HipChat |api| token.

       Set this value if you set ``notifications.[n].typeName`` to
       ``HIP_CHAT``.

       If the token later becomes invalid, |service| sends an email to
       the Project owner and eventually removes the token.

   * - | notifications.[n]
       | .opsGenieApiKey
     - string
     - Conditional
     - Opsgenie |api| Key.

       .. include:: /includes/api/facts/invalid-integration-api-key.rst

       Set this value if you set ``notifications.[n].typeName`` to
       ``OPS_GENIE``.

   * - | notifications.[n]
       | .opsGenieRegion
     - string
     - Conditional
     - Region that indicates the |api| |url| to use. |service|
       accepts the following values:

       - ``US``
       - ``EU``

       The default Opsgenie region is ``US``.

       Set this value if you set ``notifications.[n].typeName`` to
       ``OPS_GENIE``.

   * - | notifications.[n]
       | .roles
     - array of strings
     - Conditional
     - One or more roles that receive the configured alert. |service|
       accepts the following values:

       .. list-table::
          :widths: 50 50
          :header-rows: 1

          * - :ref:`Project roles <project-roles>`
            - :ref:`Organization roles <organization-roles>`

          * - .. include:: /includes/api/lists/project-roles.rst
            - .. include:: /includes/api/lists/org-roles.rst

       If you include this field, |service| sends alerts only to users
       assigned the roles you specify in the array. If you omit this
       field, |service| sends alerts to users assigned any role.

       Set this value if you set ``notifications.[n].typeName`` to
       ``GROUP`` or ``ORG``.

   * - | notifications.[n]
       | .roomName
     - string
     - Conditional
     - HipChat room name.

       Set this value if you set ``notifications.[n].typeName`` to
       ``HIP_CHAT``.

   * - | notifications.[n]
       | .serviceKey
     - string
     - Conditional
     - PagerDuty service key.

       .. include:: /includes/api/facts/invalid-integration-api-key.rst

       Set this value if you set ``notifications.[n].typeName`` to
       ``PAGER_DUTY``.

   * - | notifications.[n]
       | .smsEnabled
     - boolean
     - Conditional
     - Flag indicating if text message notifications should be
       sent to this user's mobile phone.

       Set this value if you set ``notifications.[n].typeName`` to
       ``ORG``, ``GROUP``, or ``USER``.

   * - | notifications.[n]
       | .teamId
     - string
     - Conditional
     - Unique identifier of a team.

       Set this value if you set ``notifications.[n].typeName`` to
       ``TEAM``.

   * - | notifications.[n]
       | .typeName
     - string
     - Required
     - Means by which you want |service| to send you notification of an
       alert. |service| accepts the following values:

       .. hlist::
          :columns: 3

          - ``EMAIL``
          - ``SMS``
          - ``PAGER_DUTY``
          - ``SLACK``
          - ``DATADOG``
          - ``OPS_GENIE``
          - ``VICTOR_OPS``
          - ``WEBHOOK``
          - ``USER``
          - ``TEAM``
          - ``GROUP`` (Project)
          - ``ORG``
          - ``MICROSOFT_TEAMS``

   * - | notifications.[n]
       | .username
     - string
     - Conditional
     - Name of the |service| user to which to send notifications. This
       user must belong in the project that owns the alert
       configuration.

       Set this value if you set ``notifications.[n].typeName`` to
       ``USER``.

   * - | notifications.[n]
       | .victorOpsApiKey
     - string
     - Conditional
     - VictorOps |api| key.

       .. include:: /includes/api/facts/invalid-integration-api-key.rst

       Set this value if you set ``notifications.[n].typeName`` to
       ``VICTOR_OPS``.

   * - | notifications.[n]
       | .victorOpsRoutingKey
     - string
     - Conditional
     - VictorOps routing key.

       .. include:: /includes/api/facts/invalid-integration-api-key.rst

       Set this value if you set ``notifications.[n].typeName`` to
       ``VICTOR_OPS``.

   * - | notifications.[n]
       | .webhookSecret
     - string
     - Conditional
     - Authentication secret for a webhook-based alert.

       |service| returns this value if you set
       ``notifications.[n].typeName`` to ``WEBHOOK`` and either:

       - You set ``notification.[n].webhookSecret`` to a non-empty 
         string
        
       - You set a default ``webhookSecret`` either on the 
         :ref:`Integrations <third-party-integrations>` page, or with
         the :ref:`Integrations API <third-party-integration-settings-create>`

   * - | notifications.[n]
       | .webhookUrl
     - string
     - Conditional
     - Target URL for a webhook-based alert.

       |service| returns this value if you set
       ``notifications.[n].typeName`` to ``WEBHOOK`` and either:

       - You set ``notification.[n].webhookURL`` to a non-empty string

       - You set a default ``webhookUrl`` either on the 
          :ref:`Integrations <third-party-integrations>` page, or with
          the :ref:`Integrations API <third-party-integration-settings-create>`

   * - | notifications.[n]
       | .microsoftTeamsWebhookUrl
     - string
     - Conditional
     - Microsoft Teams channel incoming webhook URL.

       Set this value if you set ``notifications.[n].typeName`` to
       ``MICROSOFT_TEAMS``.
