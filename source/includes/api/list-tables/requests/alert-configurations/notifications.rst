.. list-table::
   :widths: 20 14 11 55
   :stub-columns: 1

   * - | notifications.[n]
       | .apiToken
     - string
     - Conditional
     - Slack |api| token.

       .. include:: /includes/api/facts/invalid-integration-api-token.rst

       Set this value if you set **notifications.[n].typeName** to
       **SLACK**.

   * - | notifications.[n]
       | .channelName
     - string
     - Conditional
     - Slack channel name.

       Set this value if you set **notifications.[n].typeName** to
       **SLACK**.

   * - | notifications.[n]
       | .datadogApiKey
     - string
     - Conditional
     - Datadog |api| Key. Found in the Datadog dashboard.

       Set this value if you set **notifications.[n].typeName** to
       **DATADOG**.

   * - | notifications.[n]
       | .datadogRegion
     - string
     - Conditional
     - Region that indicates which |api| |url| to use. |service|
       accepts the following values:

       - ``US``
       - ``EU``

       The default Datadog region is ``US``.

       Set this value if you set **notifications.[n].typeName** to
       **DATADOG**.

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

       Set this value if you set **notifications.[n].typeName** to
       **EMAIL**.

       You don't need to set this value to send emails to specific
       users, users with specific project roles, users with specific
       organization roles, or teams. Use the
       **notifications.[n].emailEnabled** parameter for that purpose.

   * - | notifications.[n]
       | .emailEnabled
     - boolean
     - Conditional
     - Flag indicating if email notifications should be sent to this
       user's email address.

       Set this value if you set **notifications.[n].typeName** to
       **GROUP**, **ORG**, or **USER**.

   * - | notifications.[n]
       | .flowdockApiToken
     - string
     - Conditional
     - Flowdock personal |api| token.

       .. include:: /includes/api/facts/invalid-integration-api-token.rst

       Set this value if you set **notifications.[n].typeName** to
       **FLOWDOCK**.

   * - | notifications.[n]
       | .flowName
     - string
     - Conditional
     - Flowdock flow name in lower-case letters. The flow name appears
       after the organization name in the |url| string:

       ``www.flowdock.com/app/<organization-name>/<flow-name>``.

       Set this value if you set **notifications.[n].typeName** to
       **FLOWDOCK**.

   * - | notifications.[n]
       | .intervalMin
     - integer
     - Required
     - Number of minutes to wait between successive notifications for
       unacknowledged alerts that are not resolved. The minimum value
       is ``5``.

   * - | notifications.[n]
       | .mobileNumber
     - string
     - Conditional
     - Mobile number to which alert notifications are sent.

       Set this value if you set **notifications.[n].typeName** to
       **SMS**.

       You don't need to set this value to send emails to specific
       users, users with specific project roles, users with specific
       organization roles, or teams. Use the
       **notifications.[n].smsEnabled** parameter for that purpose.

   * - | notifications.[n]
       | .notificationToken
     - string
     - Conditional
     - HipChat |api| token.

       Set this value if you set **notifications.[n].typeName** to
       **HIP_CHAT**.

       If the token later becomes invalid, |service| sends an email to
       the Project owner and eventually removes the token.

   * - | notifications.[n]
       | .opsGenieApiKey
     - string
     - Conditional
     - Opsgenie |api| Key.

       .. include:: /includes/api/facts/invalid-integration-api-key.rst

       Set this value if you set **notifications.[n].typeName** to
       **OPS_GENIE**.

   * - | notifications.[n]
       | .opsGenieRegion
     - string
     - Conditional
     - Region that indicates which |api| |url| to use. |service|
       accepts the following values:

       - ``US``
       - ``EU``

       The default Opsgenie region is ``US``.

       Set this value if you set **notifications.[n].typeName** to
       **OPS_GENIE**.

   * - | notifications.[n]
       | .orgName
     - string
     - Conditional
     - Flowdock organization name in lower-case letters. This is
       the name that appears after ``www.flowdock.com/app/`` in
       the |url| string.

       Set this value if you set **notifications.[n].typeName** to
       **FLOWDOCK**.

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

       Set this value if you set **notifications.[n].typeName** to
       **GROUP** or **ORG**.

   * - | notifications.[n]
       | .roomName
     - string
     - Conditional
     - HipChat room name.

       Set this value if you set **notifications.[n].typeName** to
       **HIP_CHAT**.

   * - | notifications.[n]
       | .serviceKey
     - string
     - Conditional
     - PagerDuty service key.

       .. include:: /includes/api/facts/invalid-integration-api-key.rst

       Set this value if you set **notifications.[n].typeName** to
       **PAGER_DUTY**.

   * - | notifications.[n]
       | .severity
     - string
     - Optional
     - Degree of seriousness of this notification.

       |service| accepts the following values:

       - ``CRITICAL``
       - ``ERROR``
       - ``WARNING``

   * - | notifications.[n]
       | .smsEnabled
     - boolean
     - Conditional
     - Flag indicating if text message notifications should be
       sent to this user's mobile phone.

       Set this value if you set **notifications.[n].typeName** to
       **ORG**, **GROUP**, or **USER**.

   * - | notifications.[n]
       | .teamId
     - string
     - Conditional
     - Unique identifier of a team.

       Set this value if you set **notifications.[n].typeName** to
       **TEAM**.

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
          - ``FLOWDOCK``
          - ``DATADOG``
          - ``OPS_GENIE``
          - ``VICTOR_OPS``
          - ``WEBHOOK``
          - ``USER``
          - ``TEAM``
          - ``GROUP`` (Project)
          - ``ORG``

   * - | notifications.[n]
       | .username
     - string
     - Conditional
     - Name of the |service| user to which to send notifications. This
       user must belong in the project that owns the alert
       configuration.

       Set this value if you set **notifications.[n].typeName** to
       **USER**.

   * - | notifications.[n]
       | .victorOpsApiKey
     - string
     - Conditional
     - VictorOps |api| key.

       .. include:: /includes/api/facts/invalid-integration-api-key.rst

       Set this value if you set **notifications.[n].typeName** to
       **VICTOR_OPS**.

   * - | notifications.[n]
       | .victorOpsRoutingKey
     - string
     - Conditional
     - VictorOps routing key.

       .. include:: /includes/api/facts/invalid-integration-api-key.rst

       Set this value if you set **notifications.[n].typeName** to
       **VICTOR_OPS**.

