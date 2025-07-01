.. list-table:: 
   :stub-columns: 1

   * - INITATING 
     - Indicates that |service| is in the process of creating the
       private endpoint.

   * - PENDING_ACCEPTANCE
     - Indicates that the private endpoint hasn't yet been approved. You
       must accept the private endpoint to allow |service| to use it. 

   * - ACTIVE
     - Indicates that the private endpoint is approved and |service| can 
       or is using it. 

   * - PENDING_RECREATION
     - Indicates that the private endpoint was either rejected or removed
       and |service| is in the process of creating a new private
       endpoint in the same region. 

   * - FAILED
     - Indicates that the private endpoint creation failed. 

   * - DELETING 
     - Indicates that |service| is in the process of deleting the
       private endpoint.
