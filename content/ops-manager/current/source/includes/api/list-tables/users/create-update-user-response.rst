.. list-table::
   :widths: 15 10 75
   :header-rows: 1
   :stub-columns: 1

   * - ``Name``
     - Type
     - Description

   * - ``emailAddress``
     - string
     - Email address of the |mms| user.

   * - ``firstName``
     - string
     - First name of the |mms| user.

   * - ``id``
     - string
     - Unique identifier of the |mms| user.

   * - ``lastName``
     - string
     - Last name of the |mms| user.

   * - ``links``
     - object array
     - Links to related sub-resources. All ``links`` arrays in
       responses include at least one link called self. The
       relationship between URLs are explained in the
       :rfc:`Web Linking Specification <5988>`.

   * - ``mobileNumber``
     - string
     - Mobile number of the |mms| user.

   * - ``roles``
     - empty array
     - Role assigned to the |mms| user.

   * - | ``roles``
       | ``.groupId``
     - string
     - Unique identifier for the project in which the user has the
       specified role.

       Roles that start with ``GLOBAL_`` don't require a
       ``groupId``. These roles aren't tied to a project.

   * - | ``roles``
       | ``.orgId``
     - string
     - Unique identifier for the organization in which the user has
       the specified role.

   * - | ``roles``
       | ``.roleName``
     - string
     - Name of the role. Accepted values are:

       - ``ORG_MEMBER``: :authrole:`Organization Member`

       - ``ORG_READ_ONLY``: :authrole:`Organization Read Only`

       - ``ORG_GROUP_CREATOR``: :authrole:`Organization Project
         Creator`

       - ``ORG_OWNER``: :authrole:`Organization Owner`

       - ``GROUP_AUTOMATION_ADMIN``: :authrole:`Project Automation
         Admin`

       - ``GROUP_BACKUP_ADMIN``: :authrole:`Project Backup Admin`

       - ``GROUP_MONITORING_ADMIN``: :authrole:`Project Monitoring
         Admin`

       - ``GROUP_OWNER``: :authrole:`Project Owner`

       - ``GROUP_READ_ONLY``: :authrole:`Project Read Only`

       - ``GROUP_USER_ADMIN``: :authrole:`Project User Admin`

       - ``GROUP_DATA_ACCESS_ADMIN``: :authrole:`Project Data Access
         Admin`

       - ``GROUP_DATA_ACCESS_READ_ONLY``: :authrole:`Project Data
         Access Read Only`

       - ``GROUP_DATA_ACCESS_READ_WRITE``: :authrole:`Project Data
         Access Read/Write`

       - ``GLOBAL_AUTOMATION_ADMIN``: :authrole:`Global Automation
         Admin`

       - ``GLOBAL_BACKUP_ADMIN``: :authrole:`Global Backup Admin`

       - ``GLOBAL_MONITORING_ADMIN``: :authrole:`Global Monitoring
         Admin`

       - ``GLOBAL_OWNER``: :authrole:`Global Owner`

       - ``GLOBAL_READ_ONLY``: :authrole:`Global Read Only`

       - ``GLOBAL_USER_ADMIN``: :authrole:`Global User Admin`

   * - ``username``
     - string
     - Username of the |mms| user.
