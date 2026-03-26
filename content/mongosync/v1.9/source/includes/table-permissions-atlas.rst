..
   Comment: The nested lists need blank lines before and after each list
            plus extra indents 

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 15 20 20

   * - Sync Type
     - Required Source Permissions
     - Required Destination Permissions

   * - Default
     - - atlasAdmin
     - - atlasAdmin
       - :authaction:`bypassWriteBlockingMode`
       
   * - Write-blocking or reversing
     - - atlasAdmin
       - :authaction:`bypassWriteBlockingMode`
     - - atlasAdmin
       - :authaction:`bypassWriteBlockingMode`

For details on Atlas roles, see :ref:`Atlas User Roles
<user-roles>`.

To update Atlas user permissions, see:
:atlas:`Manage Access to a Project </access/manage-project-access/>`.
