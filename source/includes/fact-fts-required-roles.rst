The following table shows the modes of access each role supports.

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 25 35 10 10 10 10

   * - Role
     - Action
     - |service| UI
     - |service| API
     - |fts| API 
     - {+atlas-cli+}

   * - :authrole:`Project Data Access Read Only` or higher role 
     - To view |fts| analyzers and indexes.
     - ✓
     - ✓
     - 
     - 


   * - :authrole:`Project Data Access Admin` or higher role
     - To create and manage |fts| analyzers and indexes, and 
       :doc:`assign the role to your API Key </reference/api/projectApiKeys/create-one-apiKey-in-one-project/>`. 
     - ✓
     - ✓
     - ✓
     - ✓

   * - :authrole:`Project Owner` role
     - To :doc:`create and assign project access to API Keys </reference/api/projectApiKeys/create-one-apiKey-in-one-project/>`.
     - 
     - 
     - ✓ 
     - ✓

   * - :authrole:`Organization Owner` role 
     - To :doc:`create access list entries
       </reference/api/api-access-list/create-api-access-entries/>` for
       your API Key and send the request from a client that appears in the
       access list for your API Key.
     - 
     - 
     - ✓
     - ✓

   * - :authrole:`Project Search Index Editor` 
     - To create, view, edit, and delete |fts| indexes using the 
       {+atlas-ui+} or API.
     - ✓
     - ✓
     - ✓
     - 
