..
   Comment: The nested lists need blank lines before and after each list
            plus extra indents 

.. list-table::
   :header-rows: 1
   :widths: 15 20

   * - Sync Type
     - Required Destination Permissions

   * - Default
     - - atlasAdmin
       - :authaction:`bypassWriteBlockingMode`
       
   * - Dual write-blocking, reversing, or multiple reversals
     - - atlasAdmin
       - :authaction:`bypassWriteBlockingMode`

For details on Atlas roles,  see :ref:`Atlas User Roles
<user-roles>`.

To update Atlas user permissions, see:
:atlas:`Manage Access to a Project </access/manage-project-access/>`.