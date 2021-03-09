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

   * - groupId
     - string
     - Unique 24-hexadecimal digit string that identifies the
       :ref:`project <group-id>`.

   * - groupName
     - string
     - Name of the project.

   * - id
     - string
     - Unique 24-hexadecimal digit string that identifies the
       invitation.

   * - inviterUserName
     - string
     - |service| user who invited **username** to the project.

   * - roles
     - array of strings
     - |service| :ref:`roles <project-roles>` to assign to the 
       invited user.

       If the user accepts the invitation, |service| assigns these roles
       to them. 

   * - username
     - string
     - Email address to which |service| sent the invitation.

       If the user accepts the invitation, they use this email address as
       their |service| username.
