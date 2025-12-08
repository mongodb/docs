.. important::

   In the updated :guilabel:`Data Explorer` interface, the 
   :guilabel:`Project Activity Feed` no longer logs the usernames of |service| 
   users when they read or modify data. Although the 
   :guilabel:`Project Activity Feed` no longer logs usernames, it continues to 
   log user connections from the {+atlas-ui+} to a {+cluster+}.

   To track user activity, you can use :ref:`database audit logs <set-up-database-auditing>`
   and create custom audit filters that isolate user activity associated with
   the following system-generated Administrator roles unique to :guilabel:`Data Explorer`:

   .. code-block::

      { role: "atlasDataAccessReadWrite", db: "admin" }
      { role: "atlasDataAccessReadOnly", db: "admin" }
      { role: "atlasDataAccessAdmin", db: "admin" }

   For example, you could create a custom audit filter similar to the following:

   .. code-block::

      {
        "roles": {
          "$elemMatch": {
            "$or": [
              {
                "role": "atlasDataAccessReadWrite",
                "db": "admin"
              },
              {
                "role": "atlasDataAccessReadOnly",
                "db": "admin"
              },
              {
                "role": "atlasDataAccessAdmin",
                "db": "admin"
              }
             ]
            }
           }
          }

   To learn more about audit logs and review specific examples of role filters,
   see :manual:`Configure Audit Filter </tutorial/configure-audit-filters>`.
