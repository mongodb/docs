The following table shows the modes of access that each user role supports for the specified {+fts+} actions:

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 25 35 10 10 10

   * - Role
     - {+fts+} Action
     - |service| UI 
     - {+atlas-cli+}
     - |service| API [*]_ 

   * - :authrole:`Project Data Access Read Only` or higher 
     - To view {+fts+} analyzers and indexes.
     - ✓
     - 
     - ✓

   * - :authrole:`Project Data Access Admin` or higher
     - To create and manage {+fts+} analyzers and indexes.
     - ✓
     - ✓
     - ✓

   * - :authrole:`Project Search Index Editor` 
     - To create, view, update, and delete {+fts+} indexes.
     - ✓
     - ✓
     - ✓

.. [*] Each role grants permission to call either a subset or the full set
       of :oas-atlas-tag:`{+fts+} API endpoints </Atlas-Search>` in the {+atlas-admin-api+}.
       See the {+fts+} Action column for descriptions of the API endpoints
       that each role grants access to. 