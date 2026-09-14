.. important::

   In the updated :guilabel:`Data Explorer` interface, the
   :guilabel:`Project Activity Feed` no longer generates
   individual entries for CRUD operations or regular index
   builds. When you access a collection through
   :guilabel:`Data Explorer`, the
   :guilabel:`Project Activity Feed` records only the
   following entries, which include the |service| username:

   - ``user connections`` when you open
     :guilabel:`Data Explorer`
   - A single ``listIndexStats`` entry when you access
     a collection, regardless of how many read or write
     operations you perform within that collection

   To track additional user activity, use
   :ref:`database audit logs <set-up-database-auditing>`
   and create custom audit filters that isolate user
   activity associated with the following
   system-generated Administrator roles unique to
   :guilabel:`Data Explorer`:

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
