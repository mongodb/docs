.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 20 14 66

   * - Name
     - Type
     - Description

   * - createdAt
     - string
     - |iso8601-time| when |service| sent the invitation.

   * - expiresAt
     - string
     - |iso8601-time| when the invitation expires. 

       .. tip::

          Users have 30 days to accept an invitation to an |service|
          project.

   * - id
     - string
     - Unique 24-hexadecimal digit string that identifies the
       invitation.

   * - inviterUserName
     - string
     - |service| user who invited **username** to the organization.

   * - orgId
     - string
     - Unique 24-hexadecimal digit string that identifies the
       organization.

   * - orgName
     - string
     - Name of the organization.

   * - roles
     - array of strings
     - |service| :ref:`roles <organization-roles>` to assign to the 
       invited user.

       If the user accepts the invitation, |service| assigns these roles
       to them.

   * - teamId
     - array of strings
     - Unique 24-hexadecimal digit strings that identify the teams
       that the user was invited to join.

   * - username
     - string
     - Email address to which |service| sent the invitation.

       If the user accepts the invitation, they use this email address as
       their |service| username.
