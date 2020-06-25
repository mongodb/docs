.. list-table::
   :widths: 20 14 11 55
   :stub-columns: 1

   * - | ``notifications``
       | ``.apiToken``
     - string
     - Conditional
     - Slack |api| token.

       .. include:: /includes/api/facts/invalid-integration-api-token.rst

       Set this value if ``"notifications.typeName" : "SLACK"``.

   * - | ``notifications``
       | ``.channelName``
     - string
     - Conditional
     - Slack channel name.

       Set this value if ``"notifications.typeName" : "SLACK"``.

   * - | ``notifications``
       | ``.datadogApiKey``
     - string
     - Conditional
     - Datadog |api| Key. Found in the Datadog dashboard.

       Set this value if ``"notifications.typeName" : "DATADOG"``.

   * - | ``notifications``
       | ``.datadogRegion``
     - string
     - Conditional
     - Region that indicates which |api| |url| to use. |service|
       accepts the following values:

       - ``US``
       - ``EU``

       The default Datadog region is ``US``.

       Set this value if ``"notifications.typeName" : "DATADOG"``.

   * - | ``notifications``
       | ``.delayMin``
     - integer
     - Conditional
     - Number of minutes to wait after an alert condition is detected
       before sending out the first notification.

   * - | ``notifications``
       | ``.emailAddress``
     - string
     - Conditional
     - Email address to which alert notifications are sent.

       Set this value if ``"notifications.typeName" : "EMAIL"``.

       You don't need to set this value to send emails to specific
       users, users with specific project roles, users with specific
       organization roles, or teams. Use the
       ``notifications.emailEnabled`` parameter for that purpose.

   * - | ``notifications``
       | ``.emailEnabled``
     - boolean
     - Conditional
     - Flag indicating if email notifications should be sent to this
       user's email address.

       Set this value if:

       - ``"notifications.typeName" : "GROUP"``
       - ``"notifications.typeName" : "ORG"``
       - ``"notifications.typeName" : "USER"``

   * - | ``notifications``
       | ``.flowdockApiToken``
     - string
     - Conditional
     - Flowdock personal |api| token.

       .. include:: /includes/api/facts/invalid-integration-api-token.rst

       Set this value if ``"notifications.typeName" : "FLOWDOCK"``.

   * - | ``notifications``
       | ``.flowName``
     - string
     - Conditional
     - Flowdock flow name in lower-case letters. The flow name appears
       after the organization name in the |url| string:

       ``www.flowdock.com/app/<organization-name>/<flow-name>``.

       Set this value if ``"notifications.typeName" : "FLOWDOCK"``.

   * - | ``notifications``
       | ``.intervalMin``
     - integer
     - Required
     - Number of minutes to wait between successive notifications for
       unacknowledged alerts that are not resolved. The minimum value
       is ``5``.

   * - | ``notifications``
       | ``.mobileNumber``
     - string
     - Conditional
     - Mobile number to which alert notifications are sent.

       Set this value if ``"notifications.typeName" : "SMS"``.

       You don't need to set this value to send emails to specific
       users, users with specific project roles, users with specific
       organization roles, or teams. Use the
       ``notifications.smsEnabled`` parameter for that purpose.

   * - | ``notifications``
       | ``.opsGenieApiKey``
     - string
     - Conditional
     - Opsgenie |api| Key.

       .. include:: /includes/api/facts/invalid-integration-api-key.rst

       Set this value if ``"notifications.typeName" : "OPS_GENIE"``.

   * - | ``notifications``
       | ``.opsGenieRegion``
     - string
     - Conditional
     - Region that indicates which |api| |url| to use. |service|
       accepts the following values:

       - ``US``
       - ``EU``

       The default Opsgenie region is ``US``.

       Set this value if ``"notifications.typeName" : "OPS_GENIE"``.

   * - | ``notifications``
       | ``.orgName``
     - string
     - Conditional
     - Flowdock organization name in lower-case letters. This is
       the name that appears after ``www.flowdock.com/app/`` in
       the |url| string.

       Set this value if ``"notifications.typeName" : "FLOWDOCK"``.

   * - | ``notifications``
       | ``.roles``
     - array of strings
     - Conditional
     - One or more roles that receive
       the configured alert. |service| accepts the following values:

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

       Set this value if:

       - ``"notifications.typeName" : "GROUP"``
       - ``"notifications.typeName" : "ORG"``

   * - | ``notifications``
       | ``.serviceKey``
     - string
     - Conditional
     - PagerDuty service key.

       .. include:: /includes/api/facts/invalid-integration-api-key.rst

       Set this value if ``"notifications.typeName" : "PAGER_DUTY"``.

   * - | ``notifications``
       | ``.smsEnabled``
     - boolean
     - Conditional
     - Flag indicating if text message notifications should be
       sent to this user's mobile phone.

       Set this value if:

       - ``"notifications.typeName" : "GROUP"``
       - ``"notifications.typeName" : "ORG"``
       - ``"notifications.typeName" : "USER"``

   * - | ``notifications``
       | ``.teamId``
     - string
     - Conditional
     - Unique identifier of a team.

       Set this value if ``"notifications.typeName" : "TEAM"``.

   * - | ``notifications``
       | ``.typeName``
     - string
     - Required
     - Type of alert notification. |service| accepts the following
       values:

       .. hlist::
          :columns: 3

          - ``EMAIL``
          - ``SMS``
          - ``PAGER_DUTY``
          - ``SLACK``
          - ``FLOWDOCK``
          - ``DATADOG``
          - ``OPS_GENIE``
          - ``VICTOR_OPS``
          - ``WEBHOOK``
          - ``USER``
          - ``TEAM``
          - ``GROUP`` (Project)
          - ``ORG``

   * - | ``notifications``
       | ``.username``
     - string
     - Conditional
     - Name of the |service| user to which to send notifications. This
       user must belong in the project that owns the alert
       configuration.

       Set this value if ``"notifications.typeName" : "USER"``.

   * - | ``notifications``
       | ``.victorOpsApiKey``
     - string
     - Conditional
     - VictorOps |api| key.

       .. include:: /includes/api/facts/invalid-integration-api-key.rst

       Set this value if ``"notifications.typeName" : "VICTOR_OPS"``.

   * - | ``notifications``
       | ``.victorOpsRoutingKey``
     - string
     - Conditional
     - VictorOps routing key.

       .. include:: /includes/api/facts/invalid-integration-api-key.rst

       Set this value if ``"notifications.typeName" : "VICTOR_OPS"``.

