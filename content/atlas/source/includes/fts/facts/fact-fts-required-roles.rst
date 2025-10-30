The following table shows the modes of access that the following :ref:`Project User Roles <project-roles>` support for the specified {+fts+} actions:

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 25 30 10 10 15

   * - Project User Role
     - {+fts+} Action
     - |service| UI 
     - {+atlas-cli+}
     - |service| API [*]_ 

   * - :authrole:`Project Data Access Read Only` or higher 
     - To view {+fts+} indexes and analyzers.
     - ✓
     - 
     - ✓

   * - :authrole:`Project Data Access Admin` or higher
     - To create, view, update, and delete {+fts+} indexes and analyzers.
     - ✓
     - ✓
     - ✓

   * - :authrole:`Project Search Index Editor` 
     - To create, view, update, and delete {+fts+} indexes.
     - ✓
     - ✓
     - ✓

.. [*] Each role grants permission to call either a subset or the full set
       of :oas-bump-atlas-tag:`{+fts+} API endpoints <atlas-search>` in the {+atlas-admin-api+}.
       See the {+fts+} Action column for descriptions of the API endpoints
       that each role grants access to. 