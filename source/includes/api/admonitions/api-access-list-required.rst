.. note:: Requires Access List

   To make this |api| request:

   1. Configure an :ref:`IP access list <add-to-access-list>`.
   2. Add the IP addresses or |cidr| blocks of your client applications
      to the access list using the
      :ref:`console <add-to-ip-access-list-ui>` or
      :ref:`API <edit-project-api-key-access-list>`. If you host
      your application on |aws|, you can use an |aws| security group ID
      as well.

   Changing an |api| key's access list might impact multiple organizations, projects, or both.
