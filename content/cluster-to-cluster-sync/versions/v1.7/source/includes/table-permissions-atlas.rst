..
   Comment: The nested lists need blank lines before and after each list
            plus extra indents 

.. list-table::
   :header-rows: 1

   * - Sync Type
     - Target
     - Required Permissions

   * - default
     - source cluster
     -

         - atlasAdmin
         - backup

   * - default
     - destination cluster
     -

         - atlasAdmin

   * - write-blocking or reversing
     - source cluster
     -

         - atlasAdmin
         - backup
         - bypassWriteBlockMode privilege

   * - write-blocking or reversing
     - destination cluster
     -

         - atlasAdmin
         - backup
         - bypassWriteBlockMode privilege

For details on Atlas roles, see: :atlas:`Atlas User Roles
</reference/user-roles/>`.

To update Atlas user permissions, see:
:atlas:`Manage Access to a Project </access/manage-project-access/>`.


